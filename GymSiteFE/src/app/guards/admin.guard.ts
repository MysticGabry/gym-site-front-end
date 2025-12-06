import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // ERRORE CORRETTO: Rimosse le parentesi da isLoggedIn()
  if (!authService.isLoggedIn) {
    return router.createUrlTree(['/login']);
  }

  // ERRORE CORRETTO: Rimosse le parentesi da isAdmin()
  if (authService.isAdmin) {
    return true;
  } else {
    // Reindirizzamento se non è admin ma è loggato
    return router.createUrlTree(['/products']);
  }
};
