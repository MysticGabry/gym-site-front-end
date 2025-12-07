import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authService = inject(AuthService);
  router = inject(Router);
  cartService = inject(CartService);

  cartCount = 0;
  showNavbar = true;

  menuOpen = false;
  mobileMenuOpen = false;

  constructor() {

    // 🔥 NAVBAR: mostra solo se NON siamo in login/register
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        this.showNavbar = !(url.includes('/login') || url.includes('/register'));
      });

    // 🔥 Conta elementi del carrello
    this.cartService.items$.subscribe(items => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onLogout(): void {
    this.authService.logout();
    this.menuOpen = false;
    this.mobileMenuOpen = false;
    this.router.navigate(['/login']);
  }
}
