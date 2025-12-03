// app.ts (o app.component.ts)

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// ✅ 1. Importa la classe del componente da usare
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  // ✅ 2. Aggiungi la classe del componente all'array imports
  imports: [RouterOutlet, ProductListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('GymSiteFE');
}
