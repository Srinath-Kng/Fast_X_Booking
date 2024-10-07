import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-passenger-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './passenger-details.component.html',
  styleUrl: './passenger-details.component.css'
})
export class PassengerDetailsComponent {
  // Variables to capture form input
  passengerName: string = '';
  passengerAge: string = '';
  gender: string = '';
  address: string = '';
  email: string = '';
  phoneNumber: string = '';

  constructor(private router: Router) {}

  // Validate form inputs before navigation
  navigateToTicketsConfirmed() {
    if (this.passengerName && this.passengerAge && this.gender && this.address && this.email && this.phoneNumber) {
      // All fields are valid, navigate to tickets confirmed page
      this.router.navigate(['/ticketsconfirmed']);
    } else {
      // Show an alert if any field is missing
      alert('Please fill in all required fields.');
    }
  }

}
