import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// category.model.ts
export interface Category {
  category_id: number;
  category_name: string;
  super_cat_id: number | null;
  col1: string;
  col2: string;
  remarks: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createCategory(category: Category): Observable<any> { // Or Observable<Category>
    return this.http.post(`${this.apiUrl}/categoryDetails`, category)
      .pipe(catchError(this.handleError));
  }

  updateCategory(category: Category): Observable<any> { // Or Observable<Category>
    return this.http.put(`${this.apiUrl}/categoryUpdate`, category)
      .pipe(catchError(this.handleError));
  }

  deleteCategory(id: number): Observable<any> { // Or Observable<void>
    return this.http.delete(`${this.apiUrl}/categoryDelete/${id}`)
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