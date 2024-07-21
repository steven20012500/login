import { Component,OnInit } from '@angular/core';
import { AdministradorService } from '../servicios/administrador.service';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrl: './ver-usuario.component.css'
})
export class VerUsuarioComponent implements OnInit {
  users: Usuario[] = [];
  selectedUser: any = null;
  newPassword: string = '';
  newRole: string = '';

  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.administradorService.getUsuarios().subscribe(
      data => this.users = data,
      error => console.error('Error al obtener usuarios', error)
    );
  }

  onDelete(username: string) {
    this.administradorService.deleteUser(username).subscribe(
      response => {
        console.log('Usuario eliminado exitosamente', response);
        this.loadUsers(); // Recarga la lista de usuarios
      },
      error => console.error('Error al eliminar usuario', error)
    );
  }

  onEdit(username: string) {
    this.administradorService.getUserByUsername(username).subscribe(
      data => {
        this.selectedUser = data;
        this.newPassword = '';
        this.newRole = '';
      },
      error => console.error('Error al obtener usuario', error)
    );
  }

  onUpdate() {
    if (this.selectedUser) {
      const updateData: any = {};
      if (this.newPassword) {
        updateData.newPassword = this.newPassword;
      }
      if (this.newRole) {
        updateData.role = this.newRole;
      }
      this.administradorService.updateUser(this.selectedUser.username, updateData).subscribe(
        response => {
          console.log('Usuario actualizado exitosamente', response);
          this.loadUsers(); // Recarga la lista de usuarios
          this.selectedUser = null; // Limpiar el usuario seleccionado
        },
        error => console.error('Error al actualizar usuario', error)
      );
    }
  }
}
