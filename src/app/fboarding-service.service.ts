import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BoardingPoint } from '../Model/BoardingPoint.Model';
@Injectable({
  providedIn: 'root'
})
export class FBoardingServiceService {

  private apiUrl = 'https://localhost:7102/api/BoardingPoint';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Method to fetch boarding points by busId
  getBoardingPointsByBusId(busId: number): Observable<BoardingPoint[]> {
    return this.http.get<BoardingPoint[]>(`${this.apiUrl}/ByBusId/${busId}`)
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
