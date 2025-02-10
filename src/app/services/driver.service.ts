import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, take } from 'rxjs';
import { catchError } from 'rxjs/operators';

// driver.model.ts
export interface Driver {
  driver_id: number;
  driver_name: string;
  driver_age: number | null; // Allow null values
  driver_license: string;
  driver_number: string;
  driver_address: string | null;
  driver_status: string | null;
  date_of_joining: string | null; // Or Date
  experience_years: number | null;
  vehicle_id: number | null;
  license_expiry_date: string; // Or Date
  emergency_contact: string | null;
  assigned_route_id: number | null;
  col1: string | null;
  col2: string | null;
  d_o_b: string | null; // Or Date
  violation: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createDriver(driver: Driver): Observable<any> { // Or Observable<Driver>
    return this.http.post(`${this.apiUrl}/driverDetails`, driver)
      .pipe(take(1),catchError(this.handleError));
  }

  updateDriver(driver: Driver): Observable<any> { // Or Observable<Driver>
    return this.http.put(`${this.apiUrl}/driverUpdate`, driver)
      .pipe(catchError(this.handleError));
  }

  deleteDriver(id: number): Observable<any> { // Or Observable<void>
    return this.http.delete(`${this.apiUrl}/driverDelete/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError(() => new Error('Something went wrong. Please try again later.'));
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

        let errorMessage = 'Something went wrong. Please try again later.';
        if(error.error && error.error.message){
            errorMessage = error.error.message;
        }

      return throwError(() => new Error(errorMessage));
    }
  }
}