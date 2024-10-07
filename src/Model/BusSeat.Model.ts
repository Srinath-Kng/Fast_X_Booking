// src/app/models/bus-seat.model.ts
export interface BusSeat {
    seatId: number;
    busId?: number | null;
    seatNo?: number | null;
    isBooked?: boolean | null;
}
