import {Routes} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {adminGuard} from './guards/admin.guard';

// 1. IMPORTA IL COMPONENTE PLACEHOLDER
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

export const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},

  // ROTTE PUBBLICHE
  {path: 'products', component: ProductListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {
    path: 'admin/products',
    // 2. AGGIUNGI IL COMPONENTE PLACEHOLDER
    component: PlaceholderComponent, // <<< CORREZIONE
    canActivate: [adminGuard]
  },
  {
    path: 'admin/users',
    // 3. AGGIUNGI IL COMPONENTE PLACEHOLDER
    component: PlaceholderComponent, // <<< CORREZIONE
    canActivate: [adminGuard]
  },

  // Wildcard (catch-all)
  {path: '**', redirectTo: '/products'},
];
