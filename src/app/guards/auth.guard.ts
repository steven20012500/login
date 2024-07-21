import { CanActivateFn } from '@angular/router';
import { AuthService } from '../servicios/auth.service';	
import { inject } from '@angular/core';
import jwt_decode from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isLoggedIn();
  
};
