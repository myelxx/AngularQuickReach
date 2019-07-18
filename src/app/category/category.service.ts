import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = "https://localhost:5001/api/categories";

  constructor(private http: HttpClient) {

  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      catchError(this.errorHandler));
   
  }

  addCategory(item: any): Observable<any[]> {
    return this.http.post<any[]>(this.url, item).pipe(
      catchError(this.errorHandler));
  }

  updateCategory(item: any): Observable<any[]> {
    return this.http.put<any[]>(this.url+'/'+item.id, item).pipe(
      catchError(this.errorHandler));
   
  }

  deleteCategory(id: number): Observable<any[]> {
    console.log(id)

    return this.http.delete<any[]>(this.url+'/'+id).pipe(
      catchError(this.errorHandler));
   
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
}
