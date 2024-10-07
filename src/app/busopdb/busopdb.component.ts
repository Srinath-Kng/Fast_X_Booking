import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-busopdb',
  standalone: true,
  imports: [],
  templateUrl: './busopdb.component.html',
  styleUrl: './busopdb.component.css'
})
export class BusopdbComponent {
  constructor(private router: Router) {}
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
  navigatetoDroping(){
    this.router.navigate(['/dropping-point']);
  }
  navigatetoOpBooking(){
    this.router.navigate(['/opbookings']);
  }
}
