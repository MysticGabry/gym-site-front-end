import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderService} from '../../services/order.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  loading = true;

  private orderService = inject(OrderService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {

    this.orderService.getMyOrders().subscribe({
      next: orders => {
        this.orders = orders;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error("Errore caricamento ordini:", err);
        this.loading = false;
      }
    });
  }

  openOrder(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }
}
