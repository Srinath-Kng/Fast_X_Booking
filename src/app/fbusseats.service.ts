import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusSeat } from '../Model/FBusSeats.Model';
@Injectable({
  providedIn: 'root'
})
export class FbusseatsService {

  private apiUrl = 'https://localhost:7102/api/BusSeat'; // Update with your actual API URL

  constructor(private http: HttpClient) {}

  getBusSeatsByBusId(busId: number): Observable<BusSeat[]> {
    return this.http.get<BusSeat[]>(`${this.apiUrl}/ByBusId/${busId}`);
  }

}
