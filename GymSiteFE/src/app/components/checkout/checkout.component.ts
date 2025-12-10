import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  cartService = inject(CartService);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  processing = false;
  success = false;

  buyNowData: { product: any, quantity: number } | null = history.state['buyNow'] ?? null;

  constructor() {
    // blocca accesso se non loggato
    if (!this.authService.isAuthenticated()) {
      alert('Devi effettuare il login per procedere al pagamento.');
      this.router.navigate(['/login']);
      return;
    }
  }

  get total(): number {
    if (this.buyNowData) {
      return this.buyNowData.product.price * this.buyNowData.quantity;
    }
    return this.cartService.getTotal();
  }

  confirmPayment(): void {
    this.processing = true;

    let payload: { productId: number; quantity: number }[];

    if (this.buyNowData) {
      payload = [{
        productId: this.buyNowData.product.id,
        quantity: this.buyNowData.quantity
      }];
    } else {
      const cart = this.cartService.getCart();
      payload = cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }));
    }

    this.http.post('http://localhost:8080/api/products/checkout', payload)
      .subscribe({
        next: () => {
          if (!this.buyNowData) {
            this.cartService.clear();
          }

          this.success = true;
          this.processing = false;
          this.cdr.detectChanges();

          setTimeout(() => this.router.navigate(['/products']), 2000);
        },
        error: (err) => {
          console.error('Errore checkout:', err);
          this.processing = false;
          alert('Errore nel pagamento: probabilmente stock insufficiente');
        }
      });
  }
}
