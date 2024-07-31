import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://ec2-44-211-156-254.compute-1.amazonaws.com:3000/api/download-pdf';
  private apiUrl2 = 'http://ec2-44-211-156-254.compute-1.amazonaws.com:3000/api/download-xls';
  constructor(private http : HttpClient, private storageService: StorageService) { }

  downloadXlsReport() {
    const token = this.storageService.getToken(); // Reemplaza con el token real
    fetch(this.apiUrl2, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.blob(); // Obtén el archivo como un blob
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.xls'; // Nombre del archivo a guardar
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Libera la URL del blob
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }
  
  downloadPdfReport() {
    const token = this.storageService.getToken(); // Reemplaza con el token real
    fetch(this.apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.blob(); // Obtén el archivo como un blob
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf'; // Nombre del archivo a guardar
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Libera la URL del blob
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }
}
