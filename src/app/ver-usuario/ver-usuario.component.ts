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

  constructor(private administradorService: AdministradorService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.administradorService.getUsuarios().subscribe({
      next: (response: Usuario[]) => {
        this.users = response;
      },
      error: error => {
        console.error('Error al obtener usuarios', error);
      },
      complete: () => {
        console.log('Solicitud completada');
      }
    });
    
  }

}
