import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDashboardService } from '../admin-dashboard.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-admindb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admindb.component.html',
  styleUrl: './admindb.component.css'
})

export class AdmindbComponent implements OnInit {
  revenue: number = 0;
  cancelledBookings: number = 0;
  totalEmployees: number = 0;
  reportsGenerated: number = 0;
  availableBuses: any[] = [];
  busOperators: any[] = [];
  chart: any;
  maleCount: number = 0;
  femaleCount: number = 0;

  addressCounts: { [key: string]: number } = {};
  addresses: string[] = [];


  constructor(private adminService: AdminDashboardService,private router : Router,private userService : UserService) {}

  ngOnInit() {
    this.fetchAvailableBuses();
    this.fetchBusOperators();
    this.fetchOtherData(); // Add more methods if needed
    this.loadUserGenderData();
    this.loadAllUsersData();
  }
  
  fetchAvailableBuses() {
    const minSeats = 20; // Example: Fetch buses with at least 20 seats
    this.adminService.getBusesByAvailableSeats(minSeats).subscribe(
      (response) => {
        this.availableBuses = response;
        console.log('Available buses:', this.availableBuses);
      },
      (error) => {
        console.error('Error fetching buses', error);
      }
    );
  }
  fetchBusOperators() {
    this.adminService.getAllBusOperators().subscribe(
      (response) => {
        this.busOperators = response; // Store bus operators
        console.log('Bus Operators:', this.busOperators);
      },
      (error) => {
        console.error('Error fetching bus operators', error);
      }
    );
  }
  fetchOtherData() {
    // You can fetch other metrics here like revenue, cancelled bookings, etc.
    this.revenue = 2900;
    this.cancelledBookings = 25;
    this.totalEmployees = 100;
    this.reportsGenerated = 30;
  }

  navigateTomanageusers() {
    // Navigation logic
    this.router.navigate(['/manageusers']);
  }

  navigateToadmindb() {
    // Navigation logic
    this.router.navigate(['/admindb']);
  }
  navigateToreports() {
    this.router.navigate(['/reports']);
  }

  loadUserGenderData() {
    // Fetching male users
    this.userService.getUsersByGender('Male').subscribe({
      next: (maleUsers) => {
        this.maleCount = maleUsers.length;
  
        // Fetching female users after male users are fetched
        this.userService.getUsersByGender('Female').subscribe({
          next: (femaleUsers) => {
            this.femaleCount = femaleUsers.length;
  
            // Once both counts are retrieved, generate the pie chart
            this.createPieChart();
          },
          error: (error) => {
            console.error('Error fetching female users', error);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching male users', error);
      }
    });
  }
 createPieChart() {
  this.chart = new Chart('userPieChart', {
    type: 'pie',
    data: {
      labels: ['Male', 'Female'],
      datasets: [
        {
          data: [this.maleCount, this.femaleCount],
          backgroundColor: ['#17c3b2', '#ffcc00'], // Using green and yellow colors
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#404241', // Set legend text color
          },
        },
      },
    },
  });
}

createAddressBarChart(addresses: string[], counts: number[]) {
  const ctx = document.getElementById('addressBarChart') as HTMLCanvasElement;
  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: addresses,
      datasets: [
        {
          label: 'Number of Users',
          data: counts,
          backgroundColor: '#17c3b2', // Using green color for the bars
          borderColor: '#ffcc00',     // Yellow border for the bars
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#404241', // Set legend text color
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#404241', // Set x-axis labels color
          },
        },
        y: {
          ticks: {
            color: '#404241', // Set y-axis labels color
          },
        },
      },
    },
  });
}

  loadAllUsersData() {
    this.userService.getuser().subscribe({
      next: (users) => {
        users.forEach(user => {
          const address = user.address; // Assuming address is a property of User
          if (address) {
            if (this.addressCounts[address]) {
              this.addressCounts[address]++;
            } else {
              this.addressCounts[address] = 1;
            }
          }
        });

        this.addresses = Object.keys(this.addressCounts);
        const counts = Object.values(this.addressCounts);
        this.createAddressBarChart(this.addresses, counts); // Create the bar chart
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      }
    });
  }
  navigatetoBusOperator(){
    this.router.navigate(['/managebusoperators']);
  }
  navigatetoBookings(){
    this.router.navigate(['/booking']);
  }
}
