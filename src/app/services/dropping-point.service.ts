import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DroppingPoint } from '../../Model/DroppingPoint.Model';
@Injectable({
  providedIn: 'root'
})
export class DroppingPointService {
  private apiUrl = 'https://localhost:5173/api/DroppingPoints'; // Adjust this URL as needed

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Adding the Bearer token for authentication
      'Content-Type': 'application/json'
    });
  }
  getDroppingPoints(busId: number): Observable<DroppingPoint[]> {
    return this.http.get<DroppingPoint[]>(`${this.apiUrl}?busid=${busId}`,{ headers: this.getHeaders() });
  }

  createDroppingPoint(droppingPoint: DroppingPoint): Observable<DroppingPoint> {
    return this.http.post<DroppingPoint>(this.apiUrl, droppingPoint,{ headers: this.getHeaders() });
  }

  updateDroppingPoint(id: number, droppingPoint: DroppingPoint): Observable<DroppingPoint> {
    return this.http.put<DroppingPoint>(`${this.apiUrl}/${id}`, droppingPoint,{ headers: this.getHeaders() });
  }

  deleteDroppingPoint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() });
  }

  patchDroppingPoint(id: number, patchData: any): Observable<DroppingPoint> {
    return this.http.patch<DroppingPoint>(`${this.apiUrl}/${id}`, patchData,{ headers: this.getHeaders() });
  }
}