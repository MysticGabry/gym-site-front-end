import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);


  order: any = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.loadOrder(+id);
    }
  }

  loadOrder(id: number) {
    this.http.get<any>(`http://localhost:8080/api/orders/${id}`)
      .subscribe({
        next: data => {
          this.order = data;
          this.cdr.detectChanges()
        },
        error: () => {
          alert("Impossibile caricare l'ordine");
          this.router.navigate(['/orders']);
        }
      });
  }

  calculateTotal(): number {
    if (!this.order) return 0;
    return this.order.items
      .reduce((sum: number, item: any) =>
        sum + item.price * item.quantity, 0);
  }

}
