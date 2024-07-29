import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/download-pdf';
  private apiUrl2 = 'http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/download-xls';
  constructor(private http : HttpClient) { }

  downloadXlsReport() {
    window.location.href = this.apiUrl;
  }
  downloadPdfReport() {
    window.location.href = this.apiUrl2;
  }
}
