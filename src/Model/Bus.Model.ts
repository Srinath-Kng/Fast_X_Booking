// bus.model.ts
export interface Bus {
    busId: number;
    busName: string;
    busNumber: string;
    busType: 'AC' | 'Sleeper';
    numberOfSeats: number;
    origin: string;
    destination: string;
    startTime: string; // You can change this to Date if you prefer
    endTime: string; // You can change this to Date if you prefer
    fare: number;
    busOperatorId: string;
    departureDate: Date; // Change to Date type
  }
  