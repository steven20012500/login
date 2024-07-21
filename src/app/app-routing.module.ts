import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SensorGraficosComponent } from './sensor-graficos/sensor-graficos.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sensores', component: SensorGraficosComponent},
  {path: 'usuarios', component: CrearUsuarioComponent},
  {path: 'verUsuarios', component: VerUsuarioComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
