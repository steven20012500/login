import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {
  private apiUrl = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/usuarios/update-password';  // Ajusta esta URL a tu API

  constructor(private http:HttpClient ) { }
  changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    const payload = { username, oldPassword, newPassword };
    return this.http.post(this.apiUrl, payload);
  }
}
