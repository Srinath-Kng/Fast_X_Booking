import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm: FormGroup;
    successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      Address: ['', Validators.required],
      Gender: ['', Validators.required],
      ContactNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      Role: ['', Validators.required] 
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      
      let apiUrl = '';
      switch (this.registerForm.value.Role) {
        case 'Admin':
          apiUrl = 'https://localhost:5173/api/Admin';
          break;
        case 'Operator':
          apiUrl = 'https://localhost:5173/api/BusOperator';
          break;
        default: // Assume User as default
          apiUrl = 'https://localhost:5173/api/Users';
      }
      
      this.http.post(apiUrl, this.registerForm.value, { headers, responseType: 'text' })
        .subscribe({
          next: (response) => {
            console.log('Registration successful', response);
            this.successMessage = 'Registered Successfully!'; // Set success message here
            this.router.navigate(['/login']);
            this.registerForm.reset();
          },
          error: (error) => {
            console.error('Registration failed', error);
            // Optionally set an error message to the user here
          }
        });
    }
  }
  

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
