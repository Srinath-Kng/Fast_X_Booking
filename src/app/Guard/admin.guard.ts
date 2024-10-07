import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const Role = this.authService.getUserRoleFromToken();
    if (token&& Role === 'Admin') {
      // You may want to check the role from the token or the stored user data
      return true; // Allow access
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false; // Prevent access
    }
  }
}
