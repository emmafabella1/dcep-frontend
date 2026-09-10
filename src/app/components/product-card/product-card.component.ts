import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div class="card">
      <div class="image" aria-hidden="true">IMG</div>
      <div class="name">{{ product().name }}</div>
      <div class="footer-row">
        <span class="price">\${{ product().price.toFixed(2) }}</span>
        <button
          class="btn"
          [disabled]="!product().inStock"
          (click)="addToCart.emit(product())">
          {{ product().inStock ? 'Add' : 'Out of stock' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .card { border:1px solid #ddd; padding:10px; display:flex; flex-direction:column; gap:8px; }
    .image {
      height:110px; background:#f2f2f2; border:1px dashed #bbb;
      display:flex; align-items:center; justify-content:center; color:#999; font-size:12px;
    }
    .name { font-size:13px; color:#222; }
    .footer-row { display:flex; justify-content:space-between; align-items:center; }
    .price { font-weight:bold; font-size:13px; }
    .btn { padding:5px 12px; font-size:12px; cursor:pointer; }
    .btn:disabled { opacity:.5; cursor:not-allowed; }
  `]
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();
}
