import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const ADMIN_ROUTES: Routes = [

  {
    path: '',
    component: AdminDashboardComponent,

    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },

      {
        path: 'products',
        loadComponent: () =>
          import('./admin-products/admin-products.component')
            .then(m => m.AdminProductsComponent)
      },

      {
        path: 'products/new',
        loadComponent: () =>
          import('./admin-product-form/admin-product-form.component')
            .then(m => m.AdminProductFormComponent)
      },

      {
        path: 'products/edit/:id',
        loadComponent: () =>
          import('./admin-product-form/admin-product-form.component')
            .then(m => m.AdminProductFormComponent)
      }
    ]
  }
];
