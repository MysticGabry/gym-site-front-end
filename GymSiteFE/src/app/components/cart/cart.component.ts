import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(public cartService: CartService, private auth: AuthService, private router: Router) {
    if (this.auth.isAdmin) {
      this.router.navigate(['/admin']);
    }
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  clear() {
    this.cartService.clear();
  }
}
