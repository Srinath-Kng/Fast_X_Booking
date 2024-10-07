import { Component,OnInit } from '@angular/core';
import { BoardingPoint } from '../../Model/BoardingPoint.Model';
import { BoardingPointService } from '../services/boarding-point.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-boarding-points',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-boarding-points.component.html',
  styleUrl: './manage-boarding-points.component.css'
})
export class ManageBoardingPointsComponent implements OnInit {

  boardingPoints: BoardingPoint[] = [];
  newBoardingPoint: BoardingPoint = { boardingId: 0, placeName: '', timings: '', busId: 0 };
  editBoardingPoint: BoardingPoint | null = null;
  busId: number = 1; // Default bus ID, changeable dynamically
  availableBusIds: number[] = [1, 2, 3, 4, 5,6,7,8,9,10]; // Example bus IDs, replace with actual data if necessary

  constructor(private boardingPointsService: BoardingPointService,private router:Router) {}

  ngOnInit(): void {
    this.getBoardingPoints();
  }

  // Fetch all boarding points for the selected bus ID
  getBoardingPoints(): void {
    this.boardingPointsService.getBoardingPointsByBusId(this.busId).subscribe((data) => {
      this.boardingPoints = data;
    });
  }

  // Add a new boarding point for the selected bus ID
  addBoardingPoint(): void {
    this.newBoardingPoint.busId = this.busId; // Set the selected bus ID to the new boarding point
    if (this.newBoardingPoint.placeName && this.newBoardingPoint.timings) {
      this.boardingPointsService.addBoardingPoint(this.newBoardingPoint).subscribe(() => {
        this.getBoardingPoints(); // Refresh the list
        this.newBoardingPoint = { boardingId: 0, placeName: '', timings: '', busId: this.busId }; // Reset form
      }, (error) => {
        console.error('Failed to add boarding point', error);
      });
    } else {
      console.log('Please provide all required values!');
    }
  }

  // Edit an existing boarding point
  setEditBoardingPoint(boardingPoint: BoardingPoint): void {
    this.editBoardingPoint = { ...boardingPoint }; // Copy data for editing
  }

  // Update the boarding point
  updateBoardingPoint(): void {
    if (this.editBoardingPoint) {
      this.boardingPointsService.updateBoardingPoint(this.editBoardingPoint).subscribe(() => {
        this.getBoardingPoints();
        this.editBoardingPoint = null; // Reset the edit form
      });
    }
  }

  // Delete a boarding point
  deleteBoardingPoint(boardingId: number): void {
    this.boardingPointsService.deleteBoardingPoint(boardingId).subscribe(() => {
      this.getBoardingPoints();
    });
  }

  // Change bus ID and fetch corresponding boarding points
  onBusIdChange(newBusId: number): void {
    this.busId = newBusId;
    this.getBoardingPoints(); // Fetch boarding points for the new bus ID
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
  navigatetoDroping() {
    this.router.navigate(['/dropping-point']);
  }
  navigatetoOpBooking() {
    this.router.navigate(['/opbookings']);
  }
}