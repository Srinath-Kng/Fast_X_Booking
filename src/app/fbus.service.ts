import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FbusService {
  private apiUrl = 'https://localhost:7102/api/Bus'; 
  constructor(private http: HttpClient) {}

  // Method to get buses based on departure, destination, and date
  searchBuses(departure: string, destination: string, date: string): Observable<any> {
    const params = new HttpParams()
      .set('origin', departure)
      .set('destination', destination)
      .set('date', date);

    return this.http.get(`${this.apiUrl}`, { params });
  }
  getBus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Filter`);
  }
  // Method to get bus details by ID
  getBusById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Method to create a new bus
  createBus(busData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}`, busData, { headers });
  }

  // Method to update bus details
  updateBus(id: number, busData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.apiUrl}/${id}`, busData, { headers });
  }

  // Method to delete a bus
  deleteBus(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getBusByBusId(busId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Details/${busId}`);
  }
}
