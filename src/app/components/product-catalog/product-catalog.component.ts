import { Component, inject, output, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <section class="catalog">
      <aside class="filters">
        <h2>Filters</h2>
        <div class="filter-group">
          <div class="filter-title">Category</div>
          @for (cat of categories; track cat) {
            <label class="filter-row">
              <input type="checkbox" (change)="toggleCategory(cat)" />
              {{ cat }}
            </label>
          }
        </div>
      </aside>

      <div class="catalog-main">
        <div class="toolbar">
          <span>{{ filteredProducts().length }} products</span>
          <select>
            <option>Sort by: Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div class="grid">
          @for (product of filteredProducts(); track product.id) {
            <app-product-card [product]="product" (addToCart)="addToCart.emit($event)" />
          } @empty {
            <p>No products match your filters.</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .catalog { display:flex; gap:20px; padding:0 24px 30px; }
    .filters { width:190px; flex-shrink:0; }
    .filter-title { font-weight:bold; margin-bottom:8px; font-size:13px; }
    .filter-row { display:block; font-size:13px; margin-bottom:6px; cursor:pointer; }
    .catalog-main { flex:1; }
    .toolbar { display:flex; justify-content:space-between; margin-bottom:14px; font-size:13px; color:#555; }
    .grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
  `]
})
export class ProductCatalogComponent {
  private productService = inject(ProductService);
  addToCart = output<Product>();

  categories = ['Reagents', 'Consumables', 'Kits'];
  private activeCategories = signal<Set<string>>(new Set());

  // Converts the ProductService Observable into a signal so the template
  // can read it synchronously without an async pipe.
  private allProducts = toSignal(this.productService.getProducts(), { initialValue: [] as Product[] });

  filteredProducts = computed(() => {
    const active = this.activeCategories();
    const products = this.allProducts();
    if (active.size === 0) return products;
    return products.filter(p => active.has(p.category));
  });

  toggleCategory(cat: string) {
    this.activeCategories.update(current => {
      const next = new Set(current);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }
}
