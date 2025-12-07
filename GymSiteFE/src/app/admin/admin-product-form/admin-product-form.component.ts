import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {

  form!: FormGroup;
  productId: number | null = null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    // Inizializzo il form
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      imageUrl: ['']
    });

    // Controllo se sono in modalità EDIT
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productId = Number(id);
      this.isEdit = true;

      // Carico il prodotto
      this.productService.getProductById(this.productId).subscribe(p => {
        this.form.patchValue(p);  // carica i valori nel form
      });
    }
  }

  saveProduct(): void {

    const product: Product = this.form.value;

    if (this.isEdit && this.productId) {
      // MODIFICA
      this.productService.updateProduct(this.productId, product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      // CREAZIONE
      this.productService.createProduct(product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }
}
