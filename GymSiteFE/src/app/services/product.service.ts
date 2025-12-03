import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Base URL basato sul tuo BE (Spring Boot default + @RequestMapping)
  private readonly baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  /**
   * GET /api/products - Recupera tutti i prodotti (Endpoint pubblico)
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  /**
   * GET /api/products/{id} - Recupera un singolo prodotto
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // --- Funzioni per ADMIN (richiedono JWT) ---

  /**
   * POST /api/products - Crea un nuovo prodotto
   */
  createProduct(product: Product): Observable<Product> {
    // Nota: per POST, PUT, DELETE, l'applicazione Angular avrà bisogno di
    // inviare il JWT. Lo gestirà l'Auth Service/Interceptor.
    return this.http.post<Product>(this.baseUrl, product);
  }
}
