// src/app/services/booking-history.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingHistory } from '../../Model/booking-history.model';

@Injectable({
  providedIn: 'root'
})
export class BookingHistoryService {
  private apiUrl = 'https://localhost:5173/api/BookingHistories'; // Replace with your API base URL
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}` // Assuming you are using JWT for authentication
    })
  };

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    // Replace with your logic to get the token, e.g., from local storage
    return localStorage.getItem('token');
  }

  // Get all booking histories
  getBookingHistories(): Observable<BookingHistory[]> {
    return this.http.get<BookingHistory[]>(this.apiUrl, this.httpOptions);
  }

  // Get all bookings by user ID
  getAllBookingsByUserId(userId: number): Observable<BookingHistory[]> {
    return this.http.get<BookingHistory[]>(`${this.apiUrl}/getAllBookingsByUserId/${userId}`, this.httpOptions);
  }

  // Get cancelled bookings by user ID
  getCancelledBookingsByUserId(userId: number): Observable<BookingHistory[]> {
    return this.http.get<BookingHistory[]>(`${this.apiUrl}/getCancelledBookingsByUserId/${userId}`, this.httpOptions);
  }

  // Get all bookings by bus ID
  getAllBookingsByBus(busId: number): Observable<BookingHistory[]> {
    return this.http.get<BookingHistory[]>(`${this.apiUrl}/getAllBookingsByBusId/${busId}`, this.httpOptions);
  }
}
