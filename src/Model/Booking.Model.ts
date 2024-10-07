export interface Booking {
  bookingId: number; // This will be generated by the server
  userId: number;
  busId: number;
  boardingId: number;
  droppingId: number;
  passengerName: string;
  age: number;
  gender: string;
  seatNumber: number;
}