import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DroppingPoint } from '../Model/DroppingPoint.Model';
@Injectable({
  providedIn: 'root'
})
export class FDroppingServiceService {

  
  private apiUrl = 'https://localhost:7102/api/DroppingPoint';  // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Method to fetch dropping points by busId
  getDroppingPointsByBusId(busId: number): Observable<DroppingPoint[]> {
    return this.http.get<DroppingPoint[]>(`${this.apiUrl}/ByBusId/${busId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something went wrong; please try again later.');
  }
}
