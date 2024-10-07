export interface DroppingPoint {
    droppingId: number;
    placeName: string;
    timings: string; // Use appropriate type if needed (like TimeSpan or Date)
    busId: number | null;
  }
  