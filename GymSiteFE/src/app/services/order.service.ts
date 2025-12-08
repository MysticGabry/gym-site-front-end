import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/orders';

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mine`);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
