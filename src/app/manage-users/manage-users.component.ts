import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../../Model/User.Model';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  
  users: any[] = []; // Array to hold user data
  message:string = '';
  newUser = {
    userId: 0,
    name: '',
    password: '',
    gender:'',
    email: '',
    contactNo: '',
    address: ''
  };
  userId: number | null = null; // For fetching user by ID
  fetchedUser: any = null; // User fetched by ID
  editUserDetails: User = {
    userId: 0,
    name: '',
    email: '',
    password: '',
    contactNo: ''
  };
  editMode = false;
  addMode = true;  

  constructor(private router: Router,private userService: UserService) {}
  ngOnInit(): void {
      this.getusers();
  }

  navigateTomanageusers() {
    this.router.navigate(['/manageusers']);
  }
  getUserById() {
    if (this.userId !== null) {
      this.userService.getUserById(this.userId).subscribe(
        (user) => {
          this.fetchedUser = { ...user }; 
          console.log(this.fetchedUser);
        },
        (error) => {
          console.log("User not found", error);
          this.fetchedUser = null;
          this.message = error.message;
        }
      );
    } else {
      console.log("Please enter a valid user ID.");
      this.fetchedUser = null; 
    }
  }
  getusers() {
    this.userService.getuser().subscribe(
      (users) => {
        console.log('Fetched users:', users); // Check what is being fetched
        this.users = users;
      },
      (error) => {
        console.log("Error fetching users", error);
      }
    );
  }
  editUser(user: User): void {
    this.editUserDetails = { ...user }; // Pre-fill the form with user data
    this.editMode = true;
    this.addMode = false; // Disable add mode when editing
  }

  updateUser(userId: number): void {
    if (this.editUserDetails) {
      this.userService.updateUser(userId, this.editUserDetails).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.editMode = false;
          this.addMode = true; // Enable add mode after update
          this.getusers(); // Refresh the user list after update
          this.resetNewUserForm(); // Clear the form
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.getusers(); // Refresh the user list after delete
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  
  
  navigateToadmindb() {
    this.router.navigate(['/admindb']);
  }
  navigateToreports() {
    this.router.navigate(['/reports']);
  }
  addUser(): void {
    if (this.newUser.name && this.newUser.email && this.newUser.password && this.newUser.contactNo) {
      this.userService.addUser(this.newUser).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.getusers(); // Refresh user list after adding
          this.resetNewUserForm();
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      console.log('Please fill in all required fields.');
    }
  }
  
  resetNewUserForm(): void {
    this.newUser = {
      userId: 0,
      name: '',
      password: '',
      gender: '',
      email: '',
      contactNo: '',
      address: ''
    };
  }
  cancelEdit(): void {
    this.editMode = false;
    this.addMode = true; // Switch back to add mode
    this.resetNewUserForm(); // Clear form
  }
  navigatetoBusOperators(){
    this.router.navigate(['/managebusoperators']);
  }
  navigateToBooking(){
    this.router.navigate(['/bookings']);
  }
}
