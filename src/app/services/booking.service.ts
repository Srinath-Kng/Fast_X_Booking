// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDto } from '../../Model/BookingDto.Model'; 
import { Booking } from '../../Model/Booking.Model'; 

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7102/api/Booking'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Get all bookings
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl); // Assuming this returns Booking with bookingId
  }

  // Get booking by ID
  getBookingById(bookingId: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/BookingById/${bookingId}`);
  }

  // Get bookings by user ID
  getBookingsByUserId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/ByUserId/${userId}`);
  }

  // Get bookings by bus ID
  getBookingsByBusId(busId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/ByBusId/${busId}`);
  }

  // Post a new booking
  postBooking(bookingDto: BookingDto): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, bookingDto);
  }
}