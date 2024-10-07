import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const UserId = this.authService.getUserIdFromToken(); 
    const Role = this.authService.getUserRoleFromToken();
    if (token && Role === 'User') { // Ensure the user has the 'user' role
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login if no valid token or not a user
      return false;
    }
  }
}
