import { Component, AfterViewInit } from '@angular/core';
import { SensoresService } from '../servicios/sensores.service';
import { Chart, registerables } from 'chart.js';
import { Dht22 } from '../clases/dht22';
import { Bmp280 } from '../clases/bmp280';
import { IsPlatformBrowserService } from '../servicios/is-platform-browser.service';
import { ReporteService } from '../servicios/reporte.service';

Chart.register(...registerables);

@Component({
  selector: 'app-sensor-graficos',
  standalone: true,
  imports: [],
  templateUrl: './sensor-graficos.component.html',
  styleUrls: ['./sensor-graficos.component.css']
})
export class SensorGraficosComponent implements AfterViewInit {
  bmp280Data: Bmp280[] = [];
  dht22Data: Dht22[] = [];
  bmp280Chart: Chart | undefined;
  dht22Chart: Chart | undefined;

  constructor(
    private sensoresService: SensoresService,
    private isPlatFormBrowserService: IsPlatformBrowserService,
    private reporteService: ReporteService 
  ) {}

  ngAfterViewInit(): void {
    if (this.isPlatFormBrowserService.isBrowser()) {
      this.updateCharts({ target: { value: 'month' } });
    }
  }

  createChart(ctx: HTMLCanvasElement, data: any[], labels: string[], datasets: any[]) {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
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

  updateCharts(event: any) {
    const timeRange = event.target.value;

    this.sensoresService.getBmp280DataRange(timeRange).subscribe(data => {
      this.bmp280Data = data;
      if (this.bmp280Chart) this.bmp280Chart.destroy();
      const ctx = document.getElementById('bmp280Chart') as HTMLCanvasElement;
      const labels = this.bmp280Data.map(d => new Date(d.timestamp).toLocaleString());
      const datasets = [
        {
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
        }
      ];
      this.bmp280Chart = this.createChart(ctx, this.bmp280Data, labels, datasets);
    });

    this.sensoresService.getDht22DataRange(timeRange).subscribe(data => {
      this.dht22Data = data;
      if (this.dht22Chart) this.dht22Chart.destroy();
      const ctx = document.getElementById('dht22Chart') as HTMLCanvasElement;
      const labels = this.bmp280Data.map(d => new Date(d.timestamp).toLocaleString());
      const datasets = [
        {
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
        }
      ];
      this.dht22Chart = this.createChart(ctx, this.dht22Data, labels, datasets);
    });
  }

  reportePdf() {
    this.reporteService.downloadPdfReport();
  }

  reporteXls() {
    this.reporteService.downloadXlsReport();
  }
}
