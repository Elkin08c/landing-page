import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GasesService {
  private url="http://localhost:3000";
  constructor(private htpp: HttpClient) {}

  getGases():Observable<any[]> {
    return this.htpp.get<any[]>(`${this.url}/polluting-gases`);
  }

  createGases<T>(gas: T): Observable<T> {
    return this.htpp.post<T>(`${this.url}/polluting-gases`, gas);
  }

  deleteGas(id: number): Observable<void> {
    return this.htpp.delete<void>(`${this.url}/polluting-gases/${id}`);
  }

  updateGas(id: number, data:any): Observable<any> {
    return this.htpp.patch<any>(`${this.url}/polluting-gases/${id}`, data);
  }
}
