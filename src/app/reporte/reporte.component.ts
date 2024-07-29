import { Component } from '@angular/core';
import { ReporteService } from '../servicios/reporte.service';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {
  constructor(private reporteService: ReporteService) {}

  downloadXls() {
    this.reporteService.downloadXlsReport();
  }

  downloadPdf() {
    this.reporteService.downloadPdfReport();
  }
}
