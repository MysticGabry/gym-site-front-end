import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private cartService = inject(CartService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);

  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: p => {
        this.product = p;

        this.cdr.detectChanges();
      },
      error: err => console.error('Errore nel caricamento prodotto:', err)
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  buyNow(product: Product): void {
    if (!this.authService.isAuthenticated() || this.authService.isAdmin) {
      this.goToLogin();
      return;
    }

    this.router.navigate(['/checkout'], {
      state: {
        buyNow: { product, quantity: 1 }
      }
    });
  }

  addToCart(product: Product): void {
    if (!this.authService.isAuthenticated() || this.authService.isAdmin) {
      this.goToLogin();
      return;
    }

    this.cartService.addToCart(product, 1);
    alert(`${product.name} è stato aggiunto al carrello!`);
  }
}
