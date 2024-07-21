import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Add this line
import { CommonModule } from '@angular/common'; // Add this line
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  TypeUser: string = '';
  isAuthenticated: boolean = false;
  showUserMenu: boolean = false;

  constructor(private authService:AuthService, private router:Router ) { }
  ngOnInit(): void {
  this.TypeUser=this.authService.typeUser();
  this.isAuthenticated = this.authService.isLoggedIn();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logOut(event: Event) {   
    event.preventDefault();
    this.authService.logoutUser();
    this.isAuthenticated = false;
  }
}
