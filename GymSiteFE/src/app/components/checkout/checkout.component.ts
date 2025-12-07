import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {

  cartService = inject(CartService);
  productService = inject(ProductService);
  router = inject(Router);

  processing = false;
  success = false;

  confirmPayment() {
    this.processing = true;

    const cart = this.cartService.getCart();

    // CONCORRENZA: lo stock viene scalato DAL BACKEND
    const updates = cart.map(item =>
      this.productService.updateProduct(item.product.id, {
        ...item.product,
        stock: item.product.stock - item.quantity
      })
    );

    forkJoin(updates).subscribe({
      next: () => {
        this.cartService.clear();
        this.success = true;
        this.processing = false;

        setTimeout(() => this.router.navigate(['/products']), 2000);
      },
      error: (err) => {
        console.error("Errore checkout:", err);
        this.processing = false;
      }
    });
  }
}
