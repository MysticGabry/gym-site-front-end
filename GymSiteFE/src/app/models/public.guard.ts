import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('user_role');

    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin']);
      return false;
    }

    return true;
  }
}
