import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  report = {
    busId: ''
  };

  generatedReport: any; // Define the structure according to your data model

  constructor(private router: Router, private http: HttpClient) {}

  navigateToadmindb() {
    this.router.navigate(['/admindb']);
  }

  navigateTomanageusers() {
    this.router.navigate(['/manageusers']);
  }

  navigateToreports() {
    this.router.navigate(['/reports']);
  }

  generateReport() {
    if (this.report.busId) {
      this.getReportByBusId(this.report.busId);
    } else {
      alert('Please provide a Bus ID to generate the report.');
    }
  }

  // Method to generate report by bus ID
  getReportByBusId(busId: string) {
    this.http.get(`https://localhost:7102/api/Booking/BookingsReport/${busId}`, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        this.downloadFile(response, `booking_report_bus_${busId}.csv`); // Dynamic filename
      }, error => {
        console.error('Error generating report by Bus ID', error);
      });
  }

  // Method to download file
  downloadFile(data: Blob, filename: string) {
    const url = window.URL.createObjectURL(data); // Create a URL from the blob
    const link = document.createElement('a'); // Create a link element
    link.href = url;
    link.download = filename; // Set the filename
    link.click(); // Trigger download
    window.URL.revokeObjectURL(url); // Clean up and revoke the object URL
  }

  navigateToBusOperator() {
    this.router.navigate(['/managebusoperators']);
  }
  navigateToBookings(){
    this.router.navigate(['/bookings']);
  }
}