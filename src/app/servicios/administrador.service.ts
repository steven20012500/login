import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';	
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private addUsuarioUrl = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/usuarios';
  private getUsuariosUrl = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/usuarios';

  constructor(private http: HttpClient) { }
  addUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.addUsuarioUrl, usuario);
  }
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.getUsuariosUrl);
  }
}
