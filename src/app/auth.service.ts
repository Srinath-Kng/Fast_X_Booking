import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5173/api/Token'; // Your token generation API

  constructor(private http: HttpClient) {}

  // Login method - posting email and password to get JWT token
  login(email: string, password: string): Observable<any> {
    const body = { email, password };  // Object shorthand

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // No need for JSON.stringify here, Angular automatically handles it
    return this.http.post(this.apiUrl, body, { headers });
  }

  // Store JWT token in localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token); // Decode the JWT token
    }
    return null;
  }
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded: any = jwtDecode(token);
        console.log(decoded); // Log the entire decoded token
        return decoded.UserId ? Number(decoded.UserId) : null; // Use the correct case for UserId
    }
    return null;
  }
  getUserRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded: any = jwtDecode(token);
        console.log(decoded); // Log the entire decoded token
        return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ? 
               decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
    }
    return null;
  }
  // Remove JWT token from localStorage
  removeToken(): void {
    localStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    return !!this.getToken(); // Returns true if token exists, false otherwise
  }
  logout(): void {
    this.removeToken(); // Clear the token from storage
  }
}
