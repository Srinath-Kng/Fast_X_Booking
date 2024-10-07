// src/app/services/route.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from '../../Model/Route.Model';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private apiUrl = 'https://localhost:5173/api/Routes'; // Replace with your actual API URL
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}` // JWT token for auth
        })
    };

    constructor(private http: HttpClient) {}

    private getToken(): string | null {
        return localStorage.getItem('token');
    }

    getRoutesByBusId(busId: number): Observable<Route[]> {
        return this.http.get<Route[]>(`${this.apiUrl}?id=${busId}`, this.httpOptions);
    }

    addRoute(route: Route): Observable<Route> {
        return this.http.post<Route>(this.apiUrl, route, this.httpOptions);
    }

    updateRoute(id: number, route: Route): Observable<Route> {
        return this.http.put<Route>(`${this.apiUrl}/${id}`, route, this.httpOptions);
    }

    deleteRoute(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions);
    }

    patchRoute(id: number, patch: any): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${id}`, patch, this.httpOptions);
    }
}
