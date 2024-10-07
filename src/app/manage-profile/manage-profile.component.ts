import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDto } from '../../Model/UserDto.Model';
import { CommonModule } from '@angular/common';
import { Booking } from '../../Model/Booking.Model';
import { BookingService } from '../services/booking.service';
import { FbusService } from '../fbus.service';
import { BusDto } from '../../Model/BusDto.Model';
@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.css'
})
export class ManageProfileComponent implements OnInit {
  userForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isUser: boolean = false; // Flag to check if the user is a regular user
  bookings: Booking[] = [];
  busDetails: { [busId: number]: BusDto } = {}; 
  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private bookingService: BookingService,
    private busService: FbusService
  ) {
    this.userForm = this.fb.group({
      userId: [null, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      contactNo: ['', Validators.required],
      gender: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    const userId = this.userService.getUserIdFromToken();
    const userRole = this.userService.getUserRoleFromToken(); // Fetch User ID and role from the token

    if (userId !== null) {
      this.userForm.get('userId')?.setValue(userId); // Set User ID in the form
      this.fetchUser(); // Fetch user details using the ID
      this.fetchUserBookings(userId);
      console.log(`User ID from token: ${userId}`);
      console.log(`User Role from token: ${userRole}`);
      
      // Check if the user role is a regular user
      if (userRole === 'User') {
        this.isUser = true; // Set the user flag to true for regular users
      } else {
        this.errorMessage = 'Only  users can update profiles.'; // Set error message for admin and bus operators
      }
    } else {
      this.errorMessage = 'User ID not found in token'; // Handle the case where User ID is null
    }
  }

  fetchUser() {
    const userId = this.userForm.get('userId')?.value;
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user: UserDto) => {
          if (user) {
            this.userForm.patchValue(user);
            this.errorMessage = null; // Clear previous error message
          } else {
            this.errorMessage = 'User not found'; // Set error message if user is not found
            this.userForm.reset(); // Optionally reset the form
          }
        },
        (error) => {
          this.errorMessage = 'Error fetching user'; 
          console.error('Error fetching user', error);
        }
      );
    }
  }

  updateuser() {
    if (this.userForm.valid && this.isUser) { // Allow update only if the user is a regular user
      const user: UserDto = this.userForm.value;
      this.userService.updateUser(user.userId, user).subscribe(
        (response) => {
          console.log('User updated successfully', response);
          this.successMessage = 'User profile updated successfully!';
          this.errorMessage = null;
          setTimeout(() => {
            this.successMessage = null; 
          }, 3000);
        },
        (error) => {
          this.errorMessage = 'Error updating user'; 
          console.error('Error updating user', error);
        }
      );
    }
  }
  private fetchUserBookings(userId: number): void {
    this.bookingService.getBookingsByUserId(userId).subscribe(
      (response: any) => {
        // Check if response has a $values property and extract it if necessary
        if (response?.$values) {
          this.bookings = response.$values; // Extract bookings from $values
        } else {
          this.bookings = response; // Fallback if no $values property
        }
        this.errorMessage = null; // Clear previous error message
        console.log(this.bookings);
        this.bookings.forEach(booking => {
          this.fetchBusDetails(booking.busId);
        });
      },
      () => (this.errorMessage = 'Error fetching bookings') // Error handling
    );
  }

  private fetchBusDetails(busId: number): void {
    this.busService.getBusById(busId).subscribe(
      (bus: BusDto) => {
        this.busDetails[busId] = bus; // Store bus details by busId
      },
      () => {
        console.error(`Error fetching bus details for Bus ID: ${busId}`);
      }
    );
  }
}