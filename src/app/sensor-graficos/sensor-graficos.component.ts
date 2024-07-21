import { Component, AfterViewInit } from '@angular/core';
import { SensoresService } from '../servicios/sensores.service';
import { Chart, registerables } from 'chart.js';
import { Dht22 } from '../clases/dht22';
import { Bmp280 } from '../clases/bmp280';
import { IsPlatformBrowserService } from '../servicios/is-platform-browser.service';

Chart.register(...registerables);

@Component({
  selector: 'app-sensor-graficos',
  standalone: true,
  imports: [],
  templateUrl: './sensor-graficos.component.html',
  styleUrls: ['./sensor-graficos.component.css']  // Corrección: styleUrls en lugar de styleUrl
})
export class SensorGraficosComponent implements AfterViewInit {

  bmp280Data: Bmp280[] = [];
  dht22Data: Dht22[] = [];
  
  constructor(private sensoresService: SensoresService,private isPlatFormBrowserService: IsPlatformBrowserService) { }

  ngAfterViewInit(): void {
    if (this.isPlatFormBrowserService.isBrowser()) {
      this.sensoresService.getBmp280Data().subscribe(data => {
        this.bmp280Data = data;
        this.createBmp280Chart();
      });

      this.sensoresService.getDht22Data().subscribe(data => {
        this.dht22Data = data;
        this.createDht22Chart();
      });
    }
  }

  createBmp280Chart() {
    const ctx = document.getElementById('bmp280Chart') as HTMLCanvasElement;
    if (ctx) {
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
    } else {
      console.error('Canvas element for bmp280Chart not found');
    }
  }

  createDht22Chart(): void {
    const ctx = document.getElementById('dht22Chart') as HTMLCanvasElement;
    if (ctx) {
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
    } else {
      console.error('Canvas element for dht22Chart not found');
    }
  }
}
