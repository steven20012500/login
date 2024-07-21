import { Component } from '@angular/core';
import { OperadorService } from '../servicios/operador.service';	
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css'
})
export class ChangePassComponent {
  changePasswordData = { username: 'jsuntaxic@ups.edu.ec', oldPassword: '', newPassword: '' };
  constructor(private operadorService: OperadorService) { }
  onChangePassword(form: NgForm): void {
    if (form.valid) {
      this.operadorService.changePassword(this.changePasswordData.username, this.changePasswordData.oldPassword, this.changePasswordData.newPassword)
        .subscribe(
          response => {
            alert('Contraseña cambiada exitosamente');
            form.resetForm();
          },
          error => {
            alert('Error al cambiar la contraseña: ' + error.message);
          }
        );
    }
  }
}
