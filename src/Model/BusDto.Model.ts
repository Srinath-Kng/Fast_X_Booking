export interface BusDto {
    busName: string;
    busNumber: string;
    busType: string;
    noOfSeats: number;
    origin: string;
    destination: string;
    startTime: string; // or Date
    endTime: string; // or Date
    fare: number;
    busOperator: number; // or the appropriate operator type
    departureDate: string; // 'yyyy-MM-dd'
}