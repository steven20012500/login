import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {
  private apiUrl = 'http://ec2-44-211-156-254.compute-1.amazonaws.com:3000/api/usuarios/update-password';  

  constructor(private http:HttpClient ) { }
  changePassword(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

}
