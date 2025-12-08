import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(
    public cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {
    // blocca guest
    if (!this.auth.isAuthenticated()) {
      alert('Accedi per visualizzare il carrello.');
      this.router.navigate(['/login']);
    }

    // blocca admin
    if (this.auth.isAdmin) {
      this.router.navigate(['/admin']);
    }
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
  }

  clear(): void {
    this.cartService.clear();
  }

  goToCheckout(): void {
    if (this.cartService.getCart().length === 0) {
      alert('Il carrello è vuoto.');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
