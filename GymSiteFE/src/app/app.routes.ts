// app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
// Avremo bisogno di creare questi:
// import { LoginComponent } from './components/auth/login/login.component';
// import { RegisterComponent } from './components/auth/register/register.component';


export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' }, // Redirect alla Home (prodotti)
  { path: 'products', component: ProductListComponent, title: 'Catalogo Prodotti' },
  // { path: 'login', component: LoginComponent, title: 'Login' },
  // { path: 'register', component: RegisterComponent, title: 'Registrati' },
  { path: '**', redirectTo: 'products' }, // Catch-all, reindirizza a prodotti
];
