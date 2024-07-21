import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router'; // Import the correct module for Router
import { StorageService } from '../servicios/storage.service';
import { Usuario } from '../clases/usuario';
@Component({
  selector: 'app-login',
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
  loginUser() {
    this.authService.loginUser(this.usuarios).subscribe(
      res => {
        this.storageService.setItem('token', res.token);
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      },
      err => console.error(err)
    );
  }
  
 
}
