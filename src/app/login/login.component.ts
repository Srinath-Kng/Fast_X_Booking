import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // AuthService that handles login logic
import { CommonModule } from '@angular/common';  
import { FormsModule,FormGroup, Validators } from '@angular/forms';  

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';  // To store user input for email
  password: string = '';  // To store user input for password
  role: string = '';  // To capture the role from the form (e.g., 'Admin', 'Bus Operator')
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  
  // This method is called when the login form is submitted
  // This method is called when the login form is submitted
  onSubmit(): void {
    this.errorMessage = '';
    console.log('Logging in with:', this.email, this.password, this.role);
    
    // Call the login method from AuthService, passing the email and password
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        
        // Check if the response contains a JWT token
        if (response && response.token) {
          this.authService.setToken(response.token);  // Store the token in AuthService or localStorage
          
          // Decode the token and check the role
          const decodedToken = this.authService.getDecodedToken();
          const role = decodedToken ? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
  
          // Check if the decoded role matches the selected role
          if (role && role !== this.role) {
            console.error('Role mismatch: cannot log in with selected role');
            this.errorMessage = 'Role mismatch: cannot log in with selected role.';
            return;
          }
          
          // Redirect to different dashboards based on the user's role
          this.redirectBasedOnRole(role);
        } else {
          console.error('Invalid login response: Token missing');
          this.errorMessage = 'Invalid login response: Token missing.';
        }
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }
  


  // Helper method to redirect the user based on their role
  private redirectBasedOnRole(role: string): void {
    console.log('Redirecting based on role:', role);
    
    // Navigate to the appropriate dashboard based on the role
    if (role === 'Admin') {
      this.router.navigate(['/admindb']);  // Admin dashboard
    } else if (role === 'Bus Operator') {
      this.router.navigate(['/busop']);  // Bus operator dashboard
    } else {
      this.router.navigate(['/search-buses']);  // Default to user dashboard
    }
  }

  // Optional method for directly navigating to the admin dashboard (e.g., button click)
  navigateToAdmin(): void {
    this.router.navigate(['/admindb']);
  }
}
