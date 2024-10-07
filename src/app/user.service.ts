import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/User.Model';
import { UserDto } from '../Model/UserDto.Model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:5173/api/Users'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Adding the Bearer token for authentication
      'Content-Type': 'application/json'
    });
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
  getUserNameFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded: any = jwtDecode(token);
        console.log(decoded); // Log the entire decoded token
        return decoded.Name ? 
               decoded.Name : null;
    }
    return null;
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() });
  }
  getuser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getHeaders() });
  }
  addUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user, { headers: this.getHeaders() });
  }
  
  updateUserq(id: number, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  getUsersByGender(gender: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/gender/${gender}`, { headers: this.getHeaders() });
  }
  updateUser(userId: number, user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/${userId}`, user, { headers: this.getHeaders() });
  }
}
