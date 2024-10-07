import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusAmenity } from '../Model/BusAmenity.Model';
@Injectable({
  providedIn: 'root'
})
export class BusAmenitiesService {

  private apiUrl = 'https://localhost:5173/api/Buses'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Method to get headers with the token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Adding the Bearer token for authentication
      'Content-Type': 'application/json'
    });
  }

  // Add a bus amenity
  addBusAmenity(busId: number, amenityId: number): Observable<any> {
    const params = new HttpParams()
      .set('busid', busId.toString()) // Ensure the parameter matches the API
      .set('amenityid', amenityId.toString()); // Ensure the parameter matches the API

    // Add headers to the request
    return this.http.post(`${this.apiUrl}/PostBusAmenities`, null, { params, headers: this.getHeaders() });
  }
}
