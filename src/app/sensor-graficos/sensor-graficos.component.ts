import { Component, OnInit } from '@angular/core';
import { SensoresService } from '../servicios/sensores.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sensor-graficos',
  templateUrl: './sensor-graficos.component.html',
  styleUrl: './sensor-graficos.component.css'
})
export class SensorGraficosComponent implements OnInit {
  bmp280Data: any[] = [];
  dht22Data: any[] = [];

  constructor(private sensoresService: SensoresService) { }

  ngOnInit(): void {
    this.sensoresService.getBmp280Data().subscribe(data => {
      this.bmp280Data = data;
      this.createBmp280Chart();
    });

    this.sensoresService.getDht22Data().subscribe(data => {
      this.dht22Data = data;
      this.createDht22Chart();
    });
  }

  createBmp280Chart() {
    const ctx = document.getElementById('bmp280Chart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.bmp280Data.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [{
          label: 'Temperatura (°C)',
          data: this.bmp280Data.map(d => d.temperature),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Presión (Pa)',
          data: this.bmp280Data.map(d => d.pressure),
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        },
        {
          label: 'Altitud (m)',
          data: this.bmp280Data.map(d => d.altitude),
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true },
          y: { display: true }
        }
      }
    });
  }
  

 
// Dentro del método createDht22Chart
createDht22Chart() {
  const ctx = document.getElementById('dht22Chart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.dht22Data.map(d => new Date(d.timestamp).toLocaleTimeString()),
      datasets: [{
        label: 'Temperatura (°C)',
        data: this.dht22Data.map(d => d.temperature),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Humedad (%)',
        data: this.dht22Data.map(d => d.humidity),
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true },
        y: { display: true }
      }
    }
  });
}
}
