import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// user.model.ts
export interface User {
  user_id: number;
  user_type_id: number;
  name: string;
  dt_of_commence_business: string; // Or Date if you want to convert in the service
  mobile_num: string;
  email: string;
  address: string;
  pincode: string;
  location: number; // Or string
  state: number; // Or string
  business_license_no: string;
  validity: string;
  gst_no: string;
  expiry_dt: string; // Or Date
  business_name: string;
  business_type: string;
  mandi_id: number;
  mandi_type_id: string;
  remarks: string;
  col1: string;
  col2: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(
        retry(3), // Retry up to 3 times
        catchError(this.handleError)
      );
  }

  createUser(user: User): Observable<any> { // Or Observable<User>
    return this.http.post(`${this.apiUrl}/userTableDetails`, user)
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<any> { // Or Observable<User>
    return this.http.put(`${this.apiUrl}/usertableUpdate`, user)
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: number): Observable<any> { // Or Observable<void>
    return this.http.delete(`${this.apiUrl}/usertableDelete/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
      return throwError(() => new Error('Something went wrong. Please try again later.')); // More user-friendly message
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

        // Extract error message from backend if available.
        let errorMessage = 'Something went wrong. Please try again later.';
        if(error.error && error.error.message){
            errorMessage = error.error.message;
        }

      return throwError(
        () => new Error(errorMessage) // Or provide more specific error details
      );
    }
  }
}