import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { PublicGuard } from './models/public.guard';
import { ADMIN_ROUTES } from './admin/admin.routes';

export const routes: Routes = [

  { path: '', redirectTo: '/products', pathMatch: 'full' },

  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [PublicGuard]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: ADMIN_ROUTES
  },

  { path: '**', redirectTo: 'products' }
];
