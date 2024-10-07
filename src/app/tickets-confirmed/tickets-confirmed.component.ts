import { Component , OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../../Model/Booking.Model';
import { BookingService } from '../services/booking.service';
import { Bus } from '../../Model/Bus.Model';
import { FbusService } from '../fbus.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-tickets-confirmed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets-confirmed.component.html',
  styleUrl: './tickets-confirmed.component.css'
})
export class TicketsConfirmedComponent implements OnInit, OnDestroy {
  bookingId: number | null = null; 
  bookingDetails: Booking | null = null; 
  bus: Bus | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private busService: FbusService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.bookingId = navigation?.extras.state?.['bookingId'] || null;
  }

  ngOnInit(): void {
    if (this.bookingId) {
      this.loadBookingDetails(this.bookingId);
    } else {
      this.errorMessage = 'Booking ID is missing';
      this.loading = false;
    }
  }

  loadBookingDetails(bookingId: number): void {
    const bookingSub = this.bookingService.getBookingById(bookingId).subscribe(
      (response: Booking) => {
        this.bookingDetails = response; 
        console.log('Booking Details:', this.bookingDetails); 

        if (this.bookingDetails) {
          this.loadBusDetails(this.bookingDetails.busId);
        }
      },
      (error) => {
        console.error('Error fetching booking details:', error);
        this.errorMessage = 'Failed to fetch booking details.';
        this.loading = false;
      }
    );

    this.subscriptions.add(bookingSub);
  }

  loadBusDetails(busId: number): void {
    const busSub = this.busService.getBusById(busId).subscribe(
      (busResponse: Bus) => {
        this.bus = busResponse;
        console.log('Bus:', this.bus);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching bus details:', error);
        this.errorMessage = 'Failed to fetch bus details.';
        this.loading = false;
      }
    );

    this.subscriptions.add(busSub);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options); // Formats to dd-mm-yyyy
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours < 12 ? 'AM' : 'PM'}`;
    return `${formattedDate} ${formattedTime}`;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  downloadTicket(): void {
    const ticketContent = document.getElementById('ticket-content'); // Make sure this ID exists
    if (ticketContent) {
      html2canvas(ticketContent, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; // Image width in mm
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
  
        let position = 0;
  
        // Add the first page
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        // If the image height exceeds one page, add additional pages
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('ticket.pdf');
      });
    }
  }
  
}