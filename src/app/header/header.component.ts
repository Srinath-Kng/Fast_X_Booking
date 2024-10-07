import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userRole: string | null = null;
  constructor(private router: Router, private authService: AuthService) {
    this.userRole = this.authService.getUserRoleFromToken();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  navigateToSearch() {
    this.router.navigate(['/search-buses']);
  }
  navigateToHome() {
    this.router.navigate(['']);
  }
  naviagtetoprofile() { 
    this.router.navigate(['/manageprofile']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to home after logout
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
