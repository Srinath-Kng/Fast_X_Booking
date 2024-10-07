import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FbusService } from '../fbus.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-buses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-buses.component.html',
  styleUrl: './search-buses.component.css'
})
export class SearchBusesComponent {
  origin: string = '';
  destination: string = '';
  date: string = '';
  buses: any[] = []; // To store the fetched buses

  constructor(private fbusService: FbusService, private router: Router) {}

  // Method to search buses based on user input
  search() {
    this.fbusService.searchBuses(this.origin, this.destination, this.date).subscribe(
      (data) => {
        // Extract the array from the response
        if (data && data.$values) {
          this.buses = data.$values; // Now this.buses is the array of bus objects
        } else {
          this.buses = []; // Set to empty if no buses found
        }
        this.router.navigate(['/list-buses'], { state: { buses: this.buses } });
      },
      (error) => {
        console.error('Error fetching buses:', error);
      }
    );
  }  
}
