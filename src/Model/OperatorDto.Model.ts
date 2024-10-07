export interface OperatorDto {
    userId: number;          // Unique identifier for the operator
    name: string;            // Name of the operator
    email: string;           // Email address of the operator
    password: string;        // Password for the operator
    address?: string;        // Optional address of the operator
    gender?: string;         // Optional gender of the operator
    contactNo: string;       // Contact number of the operator
  }
  