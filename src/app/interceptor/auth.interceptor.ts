// src/app/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../servicios/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del StorageService
    const token = this.storageService.getToken();

    // Clonar la solicitud y agregar el token de autorización si está presente
    const authReq = token ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }) : req;

    // Manejo de errores
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Manejar error de no autorizado (token inválido o expirado)
          console.error('Token no válido o expirado. Redirigiendo a inicio de sesión...');
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        } else if (error.status === 403) {
          // Manejar error de prohibido (usuario no tiene permiso)
          console.error('Acceso prohibido. No tienes permiso para acceder a este recurso.');
        }
        return throwError(error);
      })
    );
  }
}
