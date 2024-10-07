import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ManageBusesComponent } from './manage-buses/manage-buses.component';
import { Bus } from '../Model/Bus.Model';
import { HttpErrorResponse } from '@angular/common/http';
import { BusDto } from '../Model/BusDto.Model';

@Injectable({
  providedIn: 'root'
})
export class ManagebusService {

  private apiUrl = 'https://localhost:5173/api/Buses'; // Update with your API URL
  
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Adding the Bearer token for authentication
      'Content-Type': 'application/json'
    });
  }
  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl,{ headers: this.getHeaders() });
  }

  // Add a new bus
  addBus(busDto: BusDto): Observable<Bus> {
    console.log('Bus data being sent:', busDto);
    return this.http.post<Bus>(this.apiUrl, busDto,{ headers: this.getHeaders() });
  }
  

  // Update an existing bus
  updateBus(busId: number, bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(`${this.apiUrl}/${busId}`, bus,{ headers: this.getHeaders() });
  }

  // Delete a bus
  deleteBus(busId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${busId}`,{ headers: this.getHeaders() });
  }
}
