// src/app/models/booking-history.model.ts
export interface BookingHistory {
    bookId: number;
    bookingId?: number | null;
    userName?: string | null;
    amount: number;
    busName?: string | null;
    busNumber: string;
    seats: string;
    isCancelled: boolean;
    bookingDateTime: Date;
    passengerName: string;
    gender?: string | null;
    age: number;
}
