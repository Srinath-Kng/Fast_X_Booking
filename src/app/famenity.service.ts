import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amenity } from '../Model/Amenity.Model';
@Injectable({
  providedIn: 'root'
})
export class FamenityService {
  private baseUrl: string = 'https://localhost:7102/api/BusAmenity'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to get amenities by BusId
  getAmenitiesByBusId(busId: number): Observable<Amenity[]> {
    const url = `${this.baseUrl}/ByBusId/${busId}`;
    return this.http.get<Amenity[]>(url);
  }
  getAllAmenity(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.baseUrl}`);
  }
}
