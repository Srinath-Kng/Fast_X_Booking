// src/app/models/seat.model.ts
export interface Seat {
  seatId: number;
  seatNumber: number;
  bookingId?: number | null;
  amount: number;
  cardDetails: string;
  bookingDateTime: Date;
  passengerName: string;
  gender?: string | null;
  age: number;
}
