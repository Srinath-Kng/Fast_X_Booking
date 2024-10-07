import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl = 'https://localhost:5173/api/Buses'; // Update with your actual API URL
  private operatorApiUrl = 'https://localhost:5173/api/BusOperator';
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Replace this with how you're storing tokens
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Assuming JWT authentication
      'Content-Type': 'application/json'
    });
  }
  // Get buses by available seats
  getBusesByAvailableSeats(minSeats: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/seats/${minSeats}`, { headers: this.getHeaders() }); 
  }
  getAllBusOperators(): Observable<any[]> {
    return this.http.get<any[]>(this.operatorApiUrl,{headers: this.getHeaders()});
  }
}
