// src/app/models/route.model.ts
export interface Route {
    routeId: number;
    placeName: string;
    busId?: number | null;
}
