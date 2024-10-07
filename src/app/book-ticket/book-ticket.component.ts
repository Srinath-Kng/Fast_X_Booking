import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bus } from '../../Model/Bus.Model';
import { FbusseatsService } from '../fbusseats.service';
import { BusSeat } from '../../Model/FBusSeats.Model';
import { FBoardingServiceService } from '../fboarding-service.service';
import { FDroppingServiceService } from '../fdropping-service.service';
import { UserService } from '../user.service';
import { BookingDto } from '../../Model/BookingDto.Model';
import { BookingService } from '../services/booking.service';
@Component({
  selector: 'app-book-ticket',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'] // Fixed styleUrls
})
export class BookTicketComponent implements OnInit {
  bus: Bus | null = null;
  busSeats: BusSeat[] = []; // Array to hold the bus seats
  boardingPoints: any[] = []; // For holding boarding points
  droppingPoints: any[] = []; 
  userId: number | null = null;
  selectedSeat: number | null = null;
  selectedBoardingPoint: number | null = null;
  selectedDroppingPoint: number | null = null;
  passengerName: string = '';
  passengerAge: number | null = null;
  passengerGender: string = 'Male';
  constructor(
    private router: Router,
    private busSeatsService: FbusseatsService,
    private boardingService: FBoardingServiceService, // Inject boarding service
    private droppingService: FDroppingServiceService,
    private userService: UserService,
    private bookingService: BookingService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.bus = navigation.extras.state['bus'] || null; // Fallback to null
      console.log(this.bus); // Print bus details to the console
    }
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromToken(); // Get user ID from token
    console.log('User ID:', this.userId);
    if (this.bus) {
      this.loadBusSeats(this.bus.busId);
      this.loadBoardingPoints(this.bus.busId);
      this.loadDroppingPoints(this.bus.busId);  
    }
  }

  loadBusSeats(busId: number): void {
    this.busSeatsService.getBusSeatsByBusId(busId).subscribe(
      (response: any) => {
        // Access the array from the response
        this.busSeats = response.$values || []; // Assuming $values holds the actual array
        console.log(this.busSeats); // Log the seats to the console for debugging
      },
      (error) => {
        console.error('Error fetching bus seats:', error); // Handle errors
      }
    );
  }
  loadBoardingPoints(busId: number): void {
    this.boardingService.getBoardingPointsByBusId(busId).subscribe(
      (response: any) => {
        this.boardingPoints = response.$values || []; // Assuming $values holds the actual array
        console.log(this.boardingPoints); // Log the boarding points for debugging
      },
      (error) => {
        console.error('Error fetching boarding points:', error);
      }
    );
  }

  // Fetch dropping points by busId
  loadDroppingPoints(busId: number): void {
    this.droppingService.getDroppingPointsByBusId(busId).subscribe(
      (response: any) => {
        this.droppingPoints = response.$values || []; // Assuming $values holds the actual array
        console.log(this.droppingPoints); // Log the dropping points for debugging
      },
      (error) => {
        console.error('Error fetching dropping points:', error);
      }
    );
  }
  confirmBooking(): void {
    // Validate all required fields
    if (this.selectedSeat && this.selectedBoardingPoint && this.selectedDroppingPoint && this.passengerName && this.passengerAge && this.userId && this.bus) {
      const bookingData: BookingDto = {
        userId: this.userId,
        busId: this.bus.busId,
        boardingId: +this.selectedBoardingPoint,
        droppingId: +this.selectedDroppingPoint,
        passengerName: this.passengerName,
        age: this.passengerAge,
        gender: this.passengerGender,
        seatNumber: this.selectedSeat
      };
  
      console.log('Booking Data:', bookingData); // Log booking data for debugging
  
      // Post booking data to the server
      this.bookingService.postBooking(bookingData).subscribe(
        (response) => {
          console.log('Booking successful:', response);
          const bookingId = response.bookingId; // Ensure bookingId exists in response
          // Navigate to the TicketsConfirmedComponent with the necessary data
          this.router.navigate(['/ticketsconfirmed'], { state: { bookingId, busId: this.bus!.busId, userId: this.userId } });
        },
        (error) => {
          console.error('Error during booking:', error); // Handle booking errors
        }
      );
    } else {
      console.error('Missing booking details'); // Log if details are missing
    }
  }
  

  // Method to handle seat selection
  selectSeat(seatNo: number): void {
    const seat = this.busSeats.find(seat => seat.seatNo === seatNo);
  
    if (seat && !seat.isBooked) {
      // If the seat is already selected, deselect it
      if (this.selectedSeat === seatNo) {
        this.selectedSeat = null; // Deselect the seat
      } else {
        this.selectedSeat = seatNo; // Select the new seat
      }
    } else {
      console.error('Seat is already booked');
    }
  }  
}