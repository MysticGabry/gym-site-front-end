import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';
import { CartService } from './cart.service';   //  🔥 IMPORTANTE

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'http://localhost:8080/api/auth';
  private TOKEN_KEY = 'auth_token';
  private ROLE_KEY = 'user_role';
  private USER_ID_KEY = 'user_id';

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).pipe(
      tap((response: AuthResponse) => this.handleAuthentication(response))
    );
  }

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, req).pipe(
      tap((response: AuthResponse) => this.handleAuthentication(response))
    );
  }

  private handleAuthentication(response: AuthResponse | null): void {
    if (!response || !response.token || !response.role || !response.username) {
      console.error("Autenticazione fallita: risposta incompleta.");
      return;
    }

    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.ROLE_KEY, response.role);
    localStorage.setItem(this.USER_ID_KEY, response.username);
    this.cartService.reloadCart();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
    this.cartService.reloadCart();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  get isAdmin(): boolean {
    const role = localStorage.getItem(this.ROLE_KEY);
    return role?.includes('ADMIN') ?? false;
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
