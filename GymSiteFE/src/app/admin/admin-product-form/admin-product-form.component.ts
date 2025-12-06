import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import {Product} from '../../models/product.model';


@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent {

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  preview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['', Validators.required]
  });

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result;
    reader.readAsDataURL(file);
  }

  saveProduct() {
    if (this.form.invalid) {
      alert("Compila tutti i campi!");
      return;
    }

    const productToCreate = {
      name: this.form.value.name!,
      description: this.form.value.description!,
      price: this.form.value.price!,
      stock: this.form.value.stock!,
      imageUrl: this.form.value.imageUrl
    } as Product;


    this.productService.createProduct(productToCreate).subscribe({
      next: () => this.router.navigate(['/admin/products']),
      error: (err) => console.error(err)
    });

  }
}
