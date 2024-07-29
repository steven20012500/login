import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bmp280 } from '../clases/bmp280';
import { Dht22 } from '../clases/dht22';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {
  private bmp280Url = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/bmp280';
  private dht22Url = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/dht22';
  private bmp280Data= 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/bmp280-data'
  private dht22Data = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/dht22-data'
  constructor(private http: HttpClient) { }

  getBmp280Data(): Observable<any> {
    return this.http.get(this.bmp280Url);
  }

  getDht22Data(): Observable<any> {
    return this.http.get(this.dht22Url);
  }

  getBmp280DataRange(timeRange: string): Observable<Bmp280[]> {
    return this.http.get<Bmp280[]>(`/api/bmp280-data?range=${timeRange}`);
  }

  getDht22DataRange(timeRange: string): Observable<Dht22[]> {
    return this.http.get<Dht22[]>(`/api/dht22-data?range=${timeRange}`);
  }


}
