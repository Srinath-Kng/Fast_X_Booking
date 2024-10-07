import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmenitiesService } from '../amenities.service';
import { BusAmenity } from '../../Model/BusAmenity.Model';
import { BusAmenitiesService } from '../bus-amenities.service';
interface Amenity {
  amenityId?: string; // Assuming it might be auto-generated
  amenityName: string;  // Array to hold list of amenities for each bus
}
@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent implements OnInit {
  amenities: any[] = [];
  amenityName: string = ''
  amenityId?: number;
  editingAmenity: Amenity | null = null;
  busId: number = 0; // Add a property for Bus ID
  constructor(private amenitiesService: AmenitiesService,private router:Router,private busAmenitiesService: BusAmenitiesService) {}

  ngOnInit(): void {
    this.loadAmenities();
  }

  loadAmenities(): void {
    this.amenitiesService.getAllAmenities().subscribe(
      (data) => {
        this.amenities = data;
        console.log(this.amenities);
      },
      (error) => {
        console.error('Error fetching amenities', error);
      }
    );
  }

  addAmenity(): void {
    const newAmenity: Amenity = { amenityName: this.amenityName };
    this.amenitiesService.addAmenity(newAmenity).subscribe(
      (response: Amenity) => {
        console.log('Amenity added:', response);
        this.amenities.push(response);
        alert('Amenity added successfully!');
        this.amenityName = ''; 
      },
      (error) => {
        console.error('Error adding amenity', error);
      }
    );
  }
  

  deleteAmenity(amenityId: number): void {
    if (confirm("Are you sure you want to delete this amenity?")) {
      this.amenitiesService.deleteAmenity(amenityId).subscribe(
        () => {
          this.amenities = this.amenities.filter(amenity => amenity.amenityId !== amenityId);
          alert("Amenity deleted successfully");
        },
        (error) => {
          console.error('Error deleting amenity', error);
          alert("Failed to delete amenity");
        }
      );
    }
  }

  editAmenity(amenity: Amenity): void {
    this.editingAmenity = { ...amenity }; // Create a copy for editing
    this.amenityName = amenity.amenityName; // Set input value for editing
  }

  updateAmenity(): void {
    if (this.editingAmenity) {
      this.amenitiesService.updateAmenity(this.editingAmenity).subscribe(
        (response: { message: string }) => {
          console.log(response.message);
          alert(response.message);
          
          // Optionally update the local array instead of fetching again
          const index = this.amenities.findIndex(a => a.amenityId === this.editingAmenity!.amenityId);
          if (index !== -1) {
            this.amenities[index] = this.editingAmenity; // Update the local array
          }
  
          this.editingAmenity = null; // Reset editing state
          this.amenityName = ''; // Clear input field
        },
        (error) => {
          console.error('Error updating amenity', error);
          alert('Failed to update amenity');
        }
      );
    }
  }
  
  
  // Fetch amenities method
  getAmenities(): void {
    this.amenitiesService.getAllAmenities().subscribe(
      (amenities: Amenity[]) => {
        this.amenities = amenities; // Update the local state
      },
      (error) => {
        console.error('Error fetching amenities', error);
      }
    );
  }
  onAmenitySelected(event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast event target to HTMLSelectElement
    const amenityId = Number(target.value); // Get the value from the select
    this.editingAmenity = this.amenities.find(amenity => amenity.amenityId === amenityId) || null;
  }

  addBusAmenity(): void {
    if (!this.editingAmenity) {
      alert('Please select an amenity to add to the bus.');
      return; // Exit the method if editingAmenity is null
    }

    const busId = this.busId; // Ensure busId is correctly set
    const amenityId = Number(this.editingAmenity.amenityId); // Ensure amenityId is a number

    this.busAmenitiesService.addBusAmenity(busId, amenityId).subscribe(
      response => {
        console.log('Bus Amenity added:', response);
        alert('Bus Amenity added successfully!');
        this.busId = 0; // Clear input field
        this.editingAmenity = null; // Clear selected amenity after adding
      },
      error => {
        console.error('Error adding bus amenity', error);
        alert('Failed to add bus amenity: ' + (error.error?.message || error.message));
      }
    );
  }
  
    
  navigateTobusopdb(){
    this.router.navigate(['/busop']);
  }
  navigateTomanagebuses(){
    this.router.navigate(['/managebuses']);
  }
  navigateToamenities(){
    this.router.navigate(['/amenities']);
  }
  naviagtetoBoarding(){
    this.router.navigate(['/manage-boarding-points']);
  }
  navigatetoDroping(){
    this.router.navigate(['/dropping-point']);
  }
  navigatetoOpBooking(){
    this.router.navigate(['/opbookings']);
  }
}

