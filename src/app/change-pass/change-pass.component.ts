import { Component } from '@angular/core';
import { OperadorService } from '../servicios/operador.service';	
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css'
})
export class ChangePassComponent {
  constructor(private operadorService: OperadorService) { }

  onSubmit(form: NgForm) {
    this.operadorService.changePassword(form.value).subscribe({
      next: (response) => {
        console.log('Contraseña cambiada:', response);
        form.reset();
      },
      error: (error) => {
        console.error('Error al cambiar la contraseña:', error);
      }
    });
  }
}

