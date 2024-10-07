import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amenity } from '../Model/Amenity.Model';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {

  private apiUrl = 'https://localhost:5173/api/Amenities'; // Replace with actual API URL

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Adding the Bearer token for authentication
      'Content-Type': 'application/json'
    });
  }
  getAllAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(this.apiUrl,{ headers: this.getHeaders() });
  }

  addAmenity(amenity: Amenity): Observable<Amenity> {
    return this.http.post<Amenity>(this.apiUrl, amenity,{ headers: this.getHeaders() });
  }
  

  deleteAmenity(amenityId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${amenityId}`,{ headers: this.getHeaders() });
  }

  updateAmenity(amenity: Amenity): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${amenity.amenityId}`, amenity,{ headers: this.getHeaders() });
  }
}
