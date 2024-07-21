import { NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { SensorGraficosComponent } from './sensor-graficos/sensor-graficos.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { FormsModule } from '@angular/forms';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    NavbarComponent,
    SensorGraficosComponent,
    CrearUsuarioComponent,
    VerUsuarioComponent,
    ChangePassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
