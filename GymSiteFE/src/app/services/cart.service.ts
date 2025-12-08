import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private getCartKey(): string {
    const userId = localStorage.getItem('user_id') ?? 'guest';
    return `cart_${userId}`;
  }

  reloadCart(): void {
    this.loadCart();
  }

  private loadCart(): void {
    const data = localStorage.getItem(this.getCartKey());
    if (data) {
      this.itemsSubject.next(JSON.parse(data));
    } else {
      this.itemsSubject.next([]);
    }
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.getCartKey(), JSON.stringify(cart));
    this.itemsSubject.next(cart);
  }

  getCart(): CartItem[] {
    return this.itemsSubject.getValue();
  }

  addToCart(product: Product, quantity: number): void {
    const cart = this.getCart();
    const existing = cart.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    this.saveCart(cart);
  }

  removeItem(productId: number): void {
    const cart = this.getCart();
    const item = cart.find(i => i.product.id === productId);
    if (!item) return;

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }
    this.saveCart(cart);
  }

  clear(): void {
    this.saveCart([]);
  }

  getTotal(): number {
    return this.getCart().reduce(
      (sum: number, item: CartItem) =>
        sum + (Number(item.product.price) * Number(item.quantity)), 0
    );
  }
}
