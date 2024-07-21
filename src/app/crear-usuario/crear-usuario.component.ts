import { Component, ViewChild } from '@angular/core';
import { AdministradorService } from '../servicios/administrador.service';
import { Usuario } from '../clases/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent  {
  @ViewChild('userForm', { static: false }) userForm!: NgForm;
  usuario: Usuario = {
    _id: '',
    username: '',
    password: '',
    role: '',
    createdAt: '',
    updatedAt: ''
 };
  constructor(private administradorService:AdministradorService ) {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.administradorService.addUsuario(this.usuario).subscribe({
        next: response => {
          console.log('Usuario creado', response);
          this.resetForm();
        },
        error: error => {
          console.error('Error al enviar usuario', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }
}
  resetForm(): void {
    this.usuario = {
      _id: '',
      username: '',
      password: '',
      role: '',
      createdAt: '',
      updatedAt: ''
    };
  }

}
