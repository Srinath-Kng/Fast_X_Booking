// src/app/services/seat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Seat } from '../../Model/Seat.Model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = 'https://localhost:5173/api/Seats'; // Ensure this is your actual API URL
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

  // Get seats by booking ID
  getSeatsByBookingId(bookingId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}?bookingId=${bookingId}`, this.httpOptions)
      .pipe(catchError(this.handleError<Seat[]>('getSeatsByBookingId', [])));
  }

  // Create a new seat booking
  bookSeat(seat: Seat): Observable<any> {
    console.log('Sending seat data:', seat);
    return this.http.post(this.apiUrl, seat, this.httpOptions).pipe(
    );
  }

  // Get seats by user ID
  getSeatsByUserId(userId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/GetSeatsByUserId?userId=${userId}`, this.httpOptions)
      .pipe(catchError(this.handleError<Seat[]>('getSeatsByUserId', [])));
  }

  // Delete a seat by seat ID
  deleteSeatByBookingId(seatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${seatId}`, this.httpOptions)
      .pipe(catchError(this.handleError<void>('deleteSeatByBookingId')));
  }

  // Generic error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
