import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ChangePassComponent } from './change-pass/change-pass.component';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SensorGraficosComponent } from './sensor-graficos/sensor-graficos.component';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
      NavbarComponent,
      ChangePassComponent,
      HomeComponent,
      LoginComponent,
      MenuComponent,
      SensorGraficosComponent,
      VerUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'universal-app';
}
