import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { FooterComponent } from './components/footer/footer.component';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    QuickActionsComponent,
    ProductCatalogComponent,
    FooterComponent,
  ],
  template: `
    <app-header [cartCount]="cartCount()" (cartClicked)="scrollToCatalog()" />
    <app-hero (browseCatalog)="scrollToCatalog()" />
    <app-quick-actions />
    <app-product-catalog (addToCart)="onAddToCart($event)" />
    <app-footer />
  `,
})
export class AppComponent {
  cartCount = signal(0);

  onAddToCart(product: Product) {
    this.cartCount.update(count => count + 1);
    // In the real integration this would also call productService.addToCart(product.id)
  }

  scrollToCatalog() {
    document.querySelector('app-product-catalog')?.scrollIntoView({ behavior: 'smooth' });
  }
}
