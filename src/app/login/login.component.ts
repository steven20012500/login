import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router'; // Import the correct module for Router
import { StorageService } from '../servicios/storage.service';
import { Usuario } from '../clases/usuario';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuarios: Usuario = {
    _id: '',  
    username: '',
    password: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    
  };
  constructor(private authService: AuthService,private storageService: StorageService, private router: Router) {}
  loginUser(event: Event) {
    event.preventDefault();
    this.authService.loginUser(this.usuarios).subscribe({
      next: (res) => {
        this.storageService.setItem('token', res.token);
        this.router.navigate(['/']).then(() => {
          // If you need to trigger some updates or refresh parts of your app, do it here
          window.location.reload();
        });
      },
      error: (err) => console.error(err)
    });
  }
  
 
}
