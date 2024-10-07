import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'https://localhost:5173/api/Buses/GetBusByDetails'; // Correct API URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Adding the Bearer token for authentication
      'Content-Type': 'application/json'
    });
  }

  // Method to get buses based on departure, destination, and date
  searchBuses(departure: string, destination: string, date: string): Observable<any> {
    const params = new HttpParams()
      .set('origin', departure)
      .set('destination', destination)
      .set('date', date);

    // Include the headers in the request
    return this.http.get(this.apiUrl, { params, headers: this.getHeaders() });
  }

  getBusById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}

