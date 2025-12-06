import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminProductFormComponent } from './admin-product-form/admin-product-form.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
  },
  {
    path: 'products',
    component: AdminProductsComponent
  },
  {
    path: 'products/new',
    component: AdminProductFormComponent
  },
  {
    path: 'products/edit/:id',
    component: AdminProductFormComponent
  }
];
