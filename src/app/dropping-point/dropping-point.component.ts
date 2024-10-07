import { Component,OnInit } from '@angular/core';
import { DroppingPoint } from '../../Model/DroppingPoint.Model';
import { DroppingPointService } from '../services/dropping-point.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropping-point',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropping-point.component.html',
  styleUrl: './dropping-point.component.css'
})
export class DroppingPointComponent implements OnInit{
  droppingPoints: DroppingPoint[] = [];
  newDroppingPoint: DroppingPoint = { droppingId: 0, placeName: '', timings: '', busId: 0 };
  editDroppingPoint: DroppingPoint | null = null;
  busId: number = 1; // Default bus ID, changeable dynamically
  availableBusIds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example bus IDs, replace with actual data if necessary

  constructor(private droppingPointService: DroppingPointService, private router: Router) {}

  ngOnInit(): void {
    this.getDroppingPoints();
  }

  // Fetch all dropping points for the selected bus ID
  getDroppingPoints(): void {
    this.droppingPointService.getDroppingPoints(this.busId).subscribe((data) => {
      this.droppingPoints = data;
    });
  }

  // Add a new dropping point for the selected bus ID
  addDroppingPoint(): void {
    this.newDroppingPoint.busId = this.busId; // Set the selected bus ID to the new dropping point
    if (this.newDroppingPoint.placeName && this.newDroppingPoint.timings) {
      this.droppingPointService.createDroppingPoint(this.newDroppingPoint).subscribe(() => {
        this.getDroppingPoints(); // Refresh the list
        this.newDroppingPoint = { droppingId: 0, placeName: '', timings: '', busId: this.busId }; // Reset form
      }, (error) => {
        console.error('Failed to add dropping point', error);
      });
    } else {
      console.log('Please provide all required values!');
    }
  }

  // Edit an existing dropping point
  setEditDroppingPoint(droppingPoint: DroppingPoint): void {
    this.editDroppingPoint = { ...droppingPoint }; // Copy data for editing
  }

  // Update the dropping point
  updateDroppingPoint(): void {
    if (this.editDroppingPoint) {
      this.droppingPointService.updateDroppingPoint(this.editDroppingPoint.droppingId, this.editDroppingPoint).subscribe(() => {
        this.getDroppingPoints();
        this.editDroppingPoint = null; // Reset the edit form
      });
    }
  }

  // Delete a dropping point
  deleteDroppingPoint(droppingId: number): void {
    this.droppingPointService.deleteDroppingPoint(droppingId).subscribe(() => {
      this.getDroppingPoints();
    });
  }

  // Change bus ID and fetch corresponding dropping points
  onBusIdChange(newBusId: number): void {
    this.busId = newBusId;
    this.getDroppingPoints(); // Fetch dropping points for the new bus ID
  }

  // Navigation methods
  navigateToManageBuses() {
    this.router.navigate(['/managebuses']);
  }

  navigateToAmenities() {
    this.router.navigate(['/amenities']);
  }

  navigateToBusOperatorDashboard() {
    this.router.navigate(['/busop']);
  }

  navigateToBoardingPoints() {
    this.router.navigate(['/manage-boarding-points']);
  }
  navigateToDroppingPoints() {
    this.router.navigate(['/dropping-point']);
  }
  navigateToOperatorBookings() {
    this.router.navigate(['/opbookings']);
  }
}
