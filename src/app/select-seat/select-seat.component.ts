import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusSeatService } from '../services/bus-seat.service';
import { BookingService } from '../services/booking.service';
import { BusSeat } from '../../Model/BusSeat.Model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Seat } from '../../Model/Seat.Model';
import { SeatService } from '../services/seat.service';
import { BusService } from '../bus.service';
@Component({
  selector: 'app-select-seat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-seat.component.html',
  styleUrl: './select-seat.component.css'
})
export class SelectSeatComponent implements OnInit {
  busId: number;
  bookingId: number;
  fare: number;
  userId: number;
  seats: BusSeat[] = [];
  selectedSeats: Seat[] = [];
  totalAmount: number = 0;

  passengerName: string = '';
  passengerAge: number | null = null;
  passengerGender: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVC: string = '';

  constructor(
    private router: Router,
    private seatService: SeatService,
    private busSeatService: BusSeatService,
    private bookingService: BookingService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.busId = navigation?.extras?.state?.['busId'];
    this.bookingId = navigation?.extras?.state?.['bookingId'];
    this.fare = navigation?.extras?.state?.['fare'];
    this.userId = navigation?.extras?.state?.['userId'];
  }

  ngOnInit(): void {
    this.getAvailableSeats(this.busId);
  }

  // Fetch available seats for the bus by bus ID
  getAvailableSeats(busId: number): void {
    this.busSeatService.getSeatsByBusId(busId).subscribe((seats: BusSeat[]) => {
      this.seats = seats.filter(seat => !seat.isBooked);
    });
  }

  // Toggle seat selection and calculate the total amount
  toggleSeatSelection(seat: BusSeat): void {
    const seatPrice = this.fare;
    const index = this.selectedSeats.findIndex(s => s.seatId === seat.seatId);

    if (index > -1) {
      this.selectedSeats.splice(index, 1);
      this.totalAmount -= seatPrice;
    } else {
      this.selectedSeats.push({
        seatId: seat.seatId,
        seatNumber: seat.seatNo ?? 0,
        bookingId: this.bookingId,
        amount: seatPrice,
        cardDetails: '',
        bookingDateTime: new Date(),
        passengerName: this.passengerName,
        gender: this.passengerGender,
        age: this.passengerAge || 0
      });
      this.totalAmount += seatPrice;
    }
  }

  // Check if a seat is selected
  isSeatSelected(seat: BusSeat): boolean {
    return this.selectedSeats.some(s => s.seatId === seat.seatId);
  }

  // Confirm booking and process payment
  confirmSeatSelection(): void {
    if (!this.passengerName || this.passengerAge === null || !this.cardNumber || !this.cardExpiry || !this.cardCVC) {
      alert("Please fill all passenger and payment details.");
      return;
    }

    this.selectedSeats.forEach(seat => {
      const bookingDetails = {
        ...seat,
        cardDetails: `${this.cardNumber} | ${this.cardExpiry} | ${this.cardCVC}`
      };

      this.seatService.bookSeat(bookingDetails).subscribe({
        next: (response) => {
          console.log('Seat booked successfully:', response);
        },
        error: (error) => {
          console.error('Error occurred:', error);
        }
      });
    });

    this.router.navigate(['/ticketsconfirmed']);
  }
}