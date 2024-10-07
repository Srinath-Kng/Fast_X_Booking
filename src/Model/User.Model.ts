
export interface User {
    userId: number; // Corresponds to UserId
    role?: string; // Optional field, corresponds to Role
    name: string; // Corresponds to Name
    email: string; // Corresponds to Email
    password: string; // Corresponds to Password
    address?: string; // Optional field, corresponds to Address
    gender?: string; // Optional field, corresponds to Gender
    contactNo: string; // Corresponds to ContactNo
  }
  