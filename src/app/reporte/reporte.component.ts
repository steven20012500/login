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
  constructor(private reportService: ReporteService) { }

  downloadPdf() {
    this.reportService.generatePdfReport().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar el reporte:', error);
    });
  }
  downloadExcel() {
    this.reportService.generateXlsReport().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.xls';
      link.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar el reporte:', error);
    });
  }
}
