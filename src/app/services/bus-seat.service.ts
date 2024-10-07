// src/app/services/bus-seat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusSeat } from '../../Model/BusSeat.Model';

@Injectable({
  providedIn: 'root'
})
export class BusSeatService {
  private apiUrl = 'https://localhost:5173/api/BusSeats'; // Replace with your API base URL
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  };

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get all seats for a bus by bus ID
  getSeatsByBusId(busId: number): Observable<BusSeat[]> {
    return this.http.get<BusSeat[]>(`${this.apiUrl}/${busId}`, this.httpOptions);
  }
  
}
