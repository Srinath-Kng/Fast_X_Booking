import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardingPoint } from '../../Model/BoardingPoint.Model';
@Injectable({
  providedIn: 'root'
})
export class BoardingPointService {

  private apiUrl = 'https://localhost:5173/api/BoardingPoints'; // Replace with actual API URL

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Adding the Bearer token for authentication
      'Content-Type': 'application/json'
    });
  }
  // Fetch all boarding points for a specific bus
  getBoardingPointsByBusId(busId: number): Observable<BoardingPoint[]> {
    return this.http.get<BoardingPoint[]>(`${this.apiUrl}?busid=${busId}`,{ headers: this.getHeaders() });
  }

  // Add a new boarding point
  addBoardingPoint(boardingPoint: BoardingPoint): Observable<BoardingPoint> {
    return this.http.post<BoardingPoint>(this.apiUrl, boardingPoint,{ headers: this.getHeaders() });
  }

  // Delete a boarding point by ID
  deleteBoardingPoint(boardingPointId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${boardingPointId}`,{ headers: this.getHeaders() });
  }

  // Update an existing boarding point
  updateBoardingPoint(boardingPoint: BoardingPoint): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${boardingPoint.boardingId}`, boardingPoint,{ headers: this.getHeaders() });
  }

  // Patch an existing boarding point
  patchBoardingPoint(boardingId: number, patchData: any): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.apiUrl}/${boardingId}`, patchData,{ headers: this.getHeaders() });
  }
}
