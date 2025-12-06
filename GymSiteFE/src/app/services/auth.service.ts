import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {LoginRequest, RegisterRequest, AuthResponse} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/api/auth';
  private TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).pipe(
      tap((response: AuthResponse) => this.handleAuthentication(response))
    );
  }

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, req)
      .pipe(
        tap((response: AuthResponse) => this.handleAuthentication(response))
      );
  }

  private handleAuthentication(response: AuthResponse | null): void {
    if (!response || !response.token || !response.role) {
      console.error("Autenticazione fallita: risposta mancante o incompleta dal server.");
      return;
    }
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user_role', response.role);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('user_role');
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  get isAdmin(): boolean {
    const role = localStorage.getItem('user_role');
    return role === 'ROLE_ADMIN';
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUserEmail(): string {
    return 'test@user.com';
  }

  getUserName(): string {
    return 'Mario';
  }
}
