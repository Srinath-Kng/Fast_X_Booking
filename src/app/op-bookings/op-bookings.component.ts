import { Component,OnInit } from '@angular/core';
import { Booking } from '../../Model/Booking.Model';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-op-bookings',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './op-bookings.component.html',
  styleUrl: './op-bookings.component.css'
})
export class OpBookingsComponent implements OnInit {
  bookings: Booking[] = []; // Array to hold bookings by busId
  filteredBookings: Booking[] = []; // Array to hold filtered bookings
  busId: string = ''; // Variable to hold user input for busId search

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    // Optional: You can fetch all bookings here if needed
  }

  // Method to fetch bookings based on busId
  getBookingsByBusId(): void {
    if (this.busId) {
      this.bookingService.getBookingsByBusId(Number(this.busId)).subscribe(
        (data: any) => { // Use 'any' to accommodate the API response structure
          this.filteredBookings = data.$values; // Assign the filtered bookings to the variable
          console.log(this.filteredBookings); // Log the filtered bookings for debugging
        },
        (error) => {
          console.error('Error fetching bookings by busId', error);
        }
      );
    } else {
      this.filteredBookings = []; // Reset if busId is empty
    }
  }
  navigateTomanagebuses() {
    
    this.router.navigate(['/managebuses']);
  }
  navigateToamenities() {
    this.router.navigate(['/amenities']);
  }
  navigateTobusopdb() {
    this.router.navigate(['/busop']);
  }
  naviagtetoBoarding() {
    this.router.navigate(['/manage-boarding-points']);
  }
  navigatetoDroping(){
    this.router.navigate(['/dropping-point']);
  }
  navigatetoOpBooking(){
    this.router.navigate(['/opbookings']);
  }
}
