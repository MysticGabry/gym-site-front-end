import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Se l'utente è admin NON può accedere alla pagina
    if (this.authService.isAdmin) {
      this.router.navigate(['/admin']);
      return false;
    }

    return true; // Utente normale → ok
  }
}
