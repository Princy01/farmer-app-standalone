import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// state.model.ts
export interface State {
  id: number;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createState(state: State): Observable<any> { // Or Observable<State>
    return this.http.post(`${this.apiUrl}/stateDetails`, state)
      .pipe(catchError(this.handleError));
  }

  updateState(state: State): Observable<any> { // Or Observable<State>
    return this.http.put(`${this.apiUrl}/statesUpdate`, state) // Corrected endpoint
      .pipe(catchError(this.handleError));
  }

  deleteState(id: number): Observable<any> { // Or Observable<void>
    return this.http.delete(`${this.apiUrl}/stateDelete/${id}`)
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