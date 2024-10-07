import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class OperatorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const Role = this.authService.getUserRoleFromToken();
    if (token && Role === 'Bus Operator') {
      
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false; 
    }
  }
}
