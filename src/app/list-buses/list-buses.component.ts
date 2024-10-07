import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ActivatedRoute,Router } from '@angular/router';
import { FbusService } from '../fbus.service';
import { Bus } from '../../Model/Bus.Model';
import { FamenityService } from '../famenity.service';
import { Amenity } from '../../Model/Amenity.Model';
@Component({
  selector: 'app-list-buses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-buses.component.html',
  styleUrl: './list-buses.component.css'
})
export class ListBusesComponent {
  buses: any[] = [];
  originalBuses: Bus[] = [];
  amenitiesMap: { [key: number]: Amenity[] } = {};
  selectedBusType: string | null = null;
  selectedPriceSort: 'asc' | 'desc' | null = null;
  constructor(private router: Router,private famenityService: FamenityService) {
    // Access the buses from the navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.buses = navigation.extras.state['buses'] || []; 
      this.originalBuses = [...this.buses]; 
      console.log(this.buses);
    }
  }
  ngOnInit(): void {
    this.fetchAmenitiesForBuses();
  }
  fetchAmenitiesForBuses(): void {
    this.buses.forEach(bus => {
      this.famenityService.getAmenitiesByBusId(bus.busId).subscribe(
        (response: any) => {
          this.amenitiesMap[bus.busId] = response.$values || []; // Store amenities in the map
          console.log(`Amenities for Bus ID ${bus.busId}:`, this.amenitiesMap[bus.busId]);
        },
        error => {
          console.error('Error fetching amenities for bus ID:', bus.busId, error);
        }
      );
    });
  }
  
  navigatetobookTicket(selectedBus: Bus) {
    this.router.navigate(['book-ticket'], { state: { bus: selectedBus } });
  }
  applyFilters(): void {
    let filteredBuses = this.originalBuses;

    // Filter by bus type
    if (this.selectedBusType) {
      filteredBuses = filteredBuses.filter(bus => bus.busType === this.selectedBusType);
    }

    // Sort by price
    if (this.selectedPriceSort) {
      filteredBuses.sort((a, b) => {
        return this.selectedPriceSort === 'asc' ? a.fare - b.fare : b.fare - a.fare;
      });
    }

    // Update the displayed buses
    this.buses = filteredBuses;
  }
  onBusTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    this.selectedBusType = selectElement.value; // Get the selected value
    this.applyFilters(); // Apply filters
  }
  resetFilters(): void {
    this.selectedBusType = null;
    this.selectedPriceSort = null;
    this.buses = [...this.originalBuses];  // Reset to original list
  }
}