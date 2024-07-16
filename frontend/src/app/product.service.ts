import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createCrud<T>(item: T): Observable<T> {
    return this.http.post<T>(`${this.url}/polluting-gases`, item);
  }

  updateCrud(id: string, item: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/polluting-gases/${id}`, item);
  }

  deleteCrud(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/polluting-gases/${id}`);
  }

  getCrud(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/polluting-gases`);
  }
}
