export interface UserDto {
    userId: number;
    name: string;
    email: string;
    password: string; // Consider security practices for handling passwords
    address?: string; // Optional property
    gender?: string; // Optional property
    contactNo: string;
  }
  