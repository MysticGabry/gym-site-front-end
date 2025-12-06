import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  /**
   * Recupera tutti i prodotti. (Read All)
   */
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  /**
   * Recupera un prodotto per ID. (Read One)
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crea un nuovo prodotto. (Create)
   * Accetta FormData perché include il file immagine.
   */
  createProduct(product:Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: number, formData: FormData): Observable<Product> {
    // Usiamo PUT per l'aggiornamento completo
    return this.http.put<Product>(`${this.baseUrl}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<void> {
    // Usiamo il metodo delete
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
