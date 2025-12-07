import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getToken();

  // Se non c'è token non fa niente
  if (!token) {
    return next(req);
  }

  // Evita di intercettare asset locali
  if (req.url.includes('/assets/')) {
    return next(req);
  }

  // Evita di intercettare la login
  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  // Clona la richiesta con il token
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Token scaduto o non valido.');
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
