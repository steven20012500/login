import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {
  private bmp280Url = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/GSbmp280';
  private dht22Url = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/Gdht22';
  constructor(private http: HttpClient) { }

  getBmp280Data(): Observable<any> {
    return this.http.get(this.bmp280Url);
  }

  getDht22Data(): Observable<any> {
    return this.http.get(this.dht22Url);
  }
}
