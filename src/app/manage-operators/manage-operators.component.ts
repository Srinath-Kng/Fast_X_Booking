import { Component,OnInit } from '@angular/core';
import { ManageOperatorsService } from '../services/manage-operators.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OperatorDto } from '../../Model/OperatorDto.Model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-manage-operators',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-operators.component.html',
  styleUrl: './manage-operators.component.css'
})
export class ManageOperatorsComponent implements OnInit {
  operators: OperatorDto[] = [];
  newOperator: OperatorDto = { // Initialize a new operator object
    userId: 0, // Assuming userId is defined in OperatorDto
    name: '',
    email: '',
    contactNo: '',
    gender: '',
    password: '',
    address: ''
  };
  editingOperator: boolean = false; // To track if we are editing an operator
  operatorId: number | null = null; // For storing operator ID if needed
  displayMessage: string = '';
  constructor(private manageOperatorsService: ManageOperatorsService,private router:Router) {}

  ngOnInit(): void {
    this.getOperators(); // Fetch the list of operators on component initialization
  }

  // Fetch all operators
  getOperators(): void {
    this.manageOperatorsService.getOperators().subscribe({
      next: (data) => {
        this.operators = data; // Set the fetched operators
      },
      error: (error) => {
        console.error('Error fetching operators:', error); 
        this.displayMessage = 'Error fetching operators: ' + error;
      }
    });
  }

  // Add a new operator
  addOperator(): void {
    this.manageOperatorsService.addOperator(this.newOperator).subscribe({
      next: (operator) => {
        this.operators.push(operator); // Add new operator to the list
        this.resetForm(); // Reset the form after adding
        this.displayMessage = 'Operator added successfully!'; // Set success message
        this.getOperators(); // Fetch updated list
        this.clearMessage();
      },
      error: (error) => {
        this.displayMessage = 'Error adding operator: ' + error;
        console.error('Error adding operator:', error); // Handle error
      }
    });
  }

  // Edit an existing operator
  editOperator(operator: OperatorDto): void {
    this.editingOperator = true; // Set to editing mode
    this.newOperator = { ...operator }; // Populate the form with operator data
  }

  // Update an operator
  updateOperator(): void {
    this.manageOperatorsService.updateOperator(this.newOperator).subscribe({
      next: (operator) => {
        const index = this.operators.findIndex(op => op.userId === operator.userId);
        if (index !== -1) {
          this.operators[index] = operator; // Update the operator in the list
          this.displayMessage = 'Operator updated successfully!';
        }
        this.resetForm(); // Reset the form after updating
        this.getOperators(); // Fetch updated list
        this.clearMessage();
      },
      error: (error) => {
        this.displayMessage = 'Error updating operator: ' + error;
        console.error('Error updating operator:', error); // Handle error
      }
    });
  }

  // Delete an operator
  deleteOperator(operator: OperatorDto): void {
    this.manageOperatorsService.deleteOperator(operator.userId).subscribe({
      next: () => {
        this.operators = this.operators.filter(op => op.userId !== operator.userId);
        this.displayMessage = 'Operator deleted successfully!'; // Set success message
        this.clearMessage();
      },
      error: (error) => {
        this.displayMessage = 'Error deleting operator: ' + error;
        console.error('Error deleting operator:', error); // Handle error
      }
    });
  }

  // Reset the form
  resetForm(): void {
    this.editingOperator = false; // Exit editing mode
    this.newOperator = { // Reset newOperator object
      userId: 0,
      name: '',
      email: '',
      contactNo: '',
      gender: '',
      password: '',
      address: ''
    };
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  clearMessage(): void {
    setTimeout(() => {
      this.displayMessage = ''; // Clear message after 3 seconds
    }, 3000);
  }
  navigatetoBooking(){
    this.router.navigate(['/booking']);
  }
}
