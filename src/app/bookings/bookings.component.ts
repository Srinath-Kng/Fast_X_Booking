import { Component, OnInit } from '@angular/core';
import { Booking } from '../../Model/Booking.Model';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  userId: string = ''; 
  filteredBookings: Booking[] = [];
  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAllBookings();  // Call this method to fetch all bookings
  }

  // Fetch all bookings and flatten the response
  fetchAllBookings() {
    this.bookingService.getBookings().subscribe(
      (data: any) => {  // Use `any` type temporarily to access nested object
        // Assuming the bookings are inside $values array
        if (data && data.$values) {
          this.bookings = data.$values;  // Flatten by extracting $values
        }
        this.filteredBookings = [];
        console.log('All bookings fetched successfully', this.bookings);
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }
  getBookingsByUserId() {
    if (this.userId.trim()) {
      const numericUserId = Number(this.userId);
      if (isNaN(numericUserId)) {
        alert('Please enter a valid numeric User ID');
        return;
      }
  
      // Filter the bookings based on the user ID
      this.filteredBookings = this.bookings.filter(booking => booking.userId === numericUserId);
  
      if (this.filteredBookings.length === 0) {
        alert('No bookings found for the entered User ID.');
      }
    } else {
      alert('Please enter a valid User ID');
    }
  }
  
  
  // Navigation logic for sidebar buttons (example placeholder functions)
  navigateToadmindb() {
    this.router.navigate(['/admindb']);
  }
  
  navigateTomanageusers() {
    this.router.navigate(['/manageusers']);
  }
  
  navigateToreports() {
    this.router.navigate(['/reports']);
  }

  navigatetoBusOperator() {
    this.router.navigate(['/managebusoperators']);
  }

  navigatetoBookings() {
    this.router.navigate(['/booking']);
  }
}
