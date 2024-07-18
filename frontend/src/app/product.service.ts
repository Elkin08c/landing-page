import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/polluting-gases';

  constructor(private http: HttpClient) {}

  createCrud<T>(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  updateCrud(id: string, item: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, item);
  }

  deleteCrud(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getCrud(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}