import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';	
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private addUsuarioUrl = 'http://ec2-44-211-156-254.compute-1.amazonaws.com:3000/api/usuarios';
  private getUsuariosUrl = 'http://ec2-44-211-156-254.compute-1.amazonaws.com:3000/api/usuarios';
  private deleteUsuarioUrl = 'http://ec2-44-211-156-254.compute-1.amazonaws.com:3000/api/usuarios';
  private updateUsuarioUrl = 'http://ec2-44-211-156-254.compute-1.amazonaws.com:3000/api/usuarios';
  private getUserByUsernameUrl = 'http://ec2-44-211-156-254.compute-1.amazonaws.com:3000/api/usuarios';

  constructor(private http: HttpClient) { }
  addUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.addUsuarioUrl, usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.getUsuariosUrl);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete<any>(`${this.deleteUsuarioUrl}/${username}`);
  }

  updateUser(username: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.updateUsuarioUrl}/${username}`, data);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.getUserByUsernameUrl}/${username}`);
  }

}
