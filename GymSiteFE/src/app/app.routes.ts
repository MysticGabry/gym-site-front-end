import {Routes} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {AdminGuard} from './guards/admin.guard';
import {PublicGuard} from './models/public.guard';
import {ADMIN_ROUTES} from './admin/admin.routes';
import {UserGuard} from './guards/user.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},

  {path: 'products', component: ProductListComponent, canActivate: [PublicGuard]},

  {
    path: 'products/:id',
    loadComponent: () =>
      import('./components/product-detail/product-detail.component')
        .then(m => m.ProductDetailComponent)
  },

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component')
        .then(m => m.ProfileComponent)
  },

  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: ADMIN_ROUTES
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart.component')
        .then(m => m.CartComponent)
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('./components/checkout/checkout.component')
        .then(m => m.CheckoutComponent)
  },{
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
    canActivate: [UserGuard]
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [UserGuard]
  },

  {path: '**', redirectTo: 'products'}
];
