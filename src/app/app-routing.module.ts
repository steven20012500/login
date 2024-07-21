import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SensorGraficosComponent } from './sensor-graficos/sensor-graficos.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sensores', component: SensorGraficosComponent},
  {path: 'usuarios', component: CrearUsuarioComponent},
  {path: 'verUsuarios', component: VerUsuarioComponent},
  {path: 'changePass', component: ChangePassComponent},
  {path: 'navbar', component: NavbarComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirige al informacion por defecto

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
