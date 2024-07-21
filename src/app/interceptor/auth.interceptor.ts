import { HttpInterceptorFn } from '@angular/common/http';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 // Obtener el token del almacenamiento
 const token = localStorage.getItem('token'); // O usa StorageService si lo prefieres
 const router = inject(Router);
 // Clonar la solicitud y agregar el token de autorización si está presente
 const authReq = token ? req.clone({
   setHeaders: {
     Authorization: `Bearer ${token}`
   }
 }) : req;

 // Manejo de errores
 return next(authReq).pipe(
   catchError((error: HttpErrorResponse) => {
     if (error.status === 401) {
       // Manejar error de no autorizado (token inválido o expirado)
       console.error('Token no válido o expirado. Redirigiendo a inicio de sesión...');
       // Aquí puedes redirigir al usuario a la página de inicio de sesión o mostrar un mensaje
     }
     return throwError(error);
   })
 );};
