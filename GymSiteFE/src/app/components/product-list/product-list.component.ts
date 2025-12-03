import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessario per ngFor, ngIf
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule], // Importa i moduli comuni
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  // Uso di Observable + async pipe (best practice Angular)
  products$: Observable<Product[]> | undefined;

  // Iniezione del servizio
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Carica la lista dei prodotti all'avvio del componente
    this.products$ = this.productService.getProducts();
  }
}
