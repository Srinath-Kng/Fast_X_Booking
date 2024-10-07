export interface BusSeat{
    seatId: number;
    seatNo: number;
    isBooked: boolean;
    busId: number;
    bookingId: number | null;
}