import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagebusService } from '../managebus.service'; // Import your service here
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Bus } from '../../Model/Bus.Model';
import { BusDto } from '../../Model/BusDto.Model';
@Component({
  selector: 'app-manage-buses',
  standalone: true,
  imports: [ FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './manage-buses.component.html',
  styleUrl: './manage-buses.component.css'
})
export class ManageBusesComponent implements OnInit {
  buses: Bus[] = []; // Array to hold bus data
  successMessage: string = '';
  editingBus: Bus | null = null; // For editing a bus
  busForm: FormGroup;
  constructor(private managebusService: ManagebusService, private router: Router, private fb: FormBuilder) {  
    this.busForm = this.fb.group({
      busId: [null], // Add this line for editing
      busName: ['', Validators.required],
      busNumber: ['', Validators.required],
      busType: ['', [Validators.required, Validators.pattern('^(AC|Sleeper)$')]],
      noOfSeats: [0, [Validators.required, Validators.min(1)]],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      fare: [0, [Validators.required, Validators.min(0)]],
      busOperator: [undefined, Validators.required], // Ensure this matches your BusDto
      departureDate: [new Date().toISOString().split('T')[0], Validators.required] // Current date in 'yyyy-MM-dd' format
    });
  }
  
  ngOnInit(): void {
    this.loadBuses(); // Load buses when the component initializes
    
    //log error
  }

  loadBuses(): void {
    this.managebusService.getBuses().subscribe(buses => {
      this.buses = buses;
      console.log(this.buses);
    });
  }
  submitBusForm(): void {
    if (this.busForm.valid) {
      const busData: BusDto = {
        busName: this.busForm.value.busName,
        busNumber: this.busForm.value.busNumber,
        busType: this.busForm.value.busType as 'AC' | 'Sleeper',
        noOfSeats: this.busForm.value.noOfSeats,
        origin: this.busForm.value.origin,
        destination: this.busForm.value.destination,
        startTime: this.busForm.value.startTime,
        endTime: this.busForm.value.endTime,
        fare: this.busForm.value.fare,
        busOperator: this.busForm.value.busOperator, // Adjust this according to your BusDto model
        departureDate: this.busForm.value.departureDate
      };
  
      // Convert BusDto to Bus
      const busToSend: Bus = {
        busId: this.editingBus ? this.editingBus.busId : 0, // Set to 0 if adding a new bus
        numberOfSeats: this.busForm.value.noOfSeats, // Ensure this matches your Bus model
        busOperatorId: this.busForm.value.busOperator, // Ensure this matches your Bus model
        ...busData,
        busType: this.busForm.value.busType as 'AC' | 'Sleeper', // Explicitly cast busType
        departureDate: new Date(this.busForm.value.departureDate) // Convert string to Date
      };
  
      if (this.editingBus) {
        // If editing an existing bus
        this.managebusService.updateBus(busToSend.busId, busToSend).subscribe(
          response => {
            this.successMessage = 'Bus updated successfully!';
            this.loadBuses();
            this.resetForm();
          },
          error => {
            console.error('Error updating bus:', error);
          }
        );
      } else {
        // If adding a new bus
        this.managebusService.addBus(busData).subscribe(
          response => {
            this.successMessage = 'Bus added successfully!';
            this.loadBuses();
            this.resetForm();
          },
          error => {
            console.error('Error adding bus:', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  resetForm(): void {
    this.busForm.reset();
    this.editingBus = null;
  }

  // Function to start editing a bus
  editBus(bus: Bus): void {
    this.editingBus = bus;
    this.busForm.patchValue(bus); // Fill the form with bus data
  }

  deleteBus(busId: number): void {
    this.managebusService.deleteBus(busId).subscribe(
      response => {
        this.successMessage = 'Bus deleted successfully!';
        this.loadBuses();
      },
      error => {
        console.error('Error deleting bus:', error);
      }
    );
  }


  navigateTobusopdb(): void {
    this.router.navigate(['/busop']);
  }

  navigateTomanagebuses(): void {
    this.router.navigate(['/managebuses']);
  }

  navigateToamenities(): void {
    this.router.navigate(['/amenities']);
  }
  navigateBoarding(){
    this.router.navigate(['/manage-boarding-points']);
  }
  navigateDropping(){
    this.router.navigate(['/dropping-point']);
  }
  navigatetoOpBooking(){
    this.router.navigate(['/opbookings']);
  }
}
