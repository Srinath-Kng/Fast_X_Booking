import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { OperatorDto } from '../../Model/OperatorDto.Model'; // Import your OperatorDto
@Injectable({
  providedIn: 'root'
})
export class ManageOperatorsService {
  private apiUrl = 'https://localhost:5173/api/BusOperator'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    });
  }

  // Get all operators
  getOperators(): Observable<OperatorDto[]> {
    return this.http.get<OperatorDto[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a single operator by ID
  getOperatorById(id: number): Observable<OperatorDto> {
    return this.http.get<OperatorDto>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new operator
  addOperator(operator: OperatorDto): Observable<OperatorDto> {
    return this.http.post<OperatorDto>(this.apiUrl, operator, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing operator
  updateOperator(operator: OperatorDto): Observable<OperatorDto> {
    return this.http.put<OperatorDto>(`${this.apiUrl}/${operator.userId}`, operator, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete an operator by ID
  deleteOperator(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log the error for debugging
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}