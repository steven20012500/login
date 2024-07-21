import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
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
