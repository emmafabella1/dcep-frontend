import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

// TEMP: hardcoded data so the UI can be built/demoed before the
// Product Catalog Service backend is ready. Swap out once the
// real endpoint (see architecture diagram: Product Catalog Service,
// behind the API Gateway) is available.
const HARDCODED_PRODUCTS: Product[] = [
  { id: 1, name: 'Sample Reagent Kit A', price: 129.99, category: 'Reagents', inStock: true },
  { id: 2, name: 'Extraction Column Set', price: 89.5, category: 'Consumables', inStock: true },
  { id: 3, name: 'Buffer Solution 500ml', price: 45.0, category: 'Reagents', inStock: false },
  { id: 4, name: 'PCR Plate 96-well', price: 22.75, category: 'Consumables', inStock: true },
  { id: 5, name: 'Enzyme Mix Kit', price: 210.0, category: 'Kits', inStock: true },
  { id: 6, name: 'Sample Tubes (Pack of 500)', price: 15.99, category: 'Consumables', inStock: true },
  { id: 7, name: 'Nucleic Acid Kit', price: 175.25, category: 'Kits', inStock: true },
  { id: 8, name: 'Calibration Standard', price: 60.0, category: 'Reagents', inStock: true },
];

/**
 * Talks to the backend Product Catalog Service (Spring Boot microservice,
 * reached through the API Gateway per the architecture diagram).
 *
 * HttpClient is already wired in via DI so this drops in cleanly once the
 * real API exists — for now every method returns hardcoded/mock data
 * instead of calling `this.http`. Swap the commented-out lines back in
 * when the backend is ready; the component layer won't need to change
 * at all since the return type (Observable<Product[]>) stays the same.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/products`;

  getProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.baseUrl);
    return of(HARDCODED_PRODUCTS).pipe(delay(300)); // simulate network latency
  }

  getRecommended(): Observable<Product[]> {
    // return this.http.get<Product[]>(`${this.baseUrl}/recommended`);
    return of(HARDCODED_PRODUCTS.slice(0, 5)).pipe(delay(200));
  }

  addToCart(productId: number, quantity = 1): Observable<{ success: boolean }> {
    // return this.http.post<{ success: boolean }>(`${environment.apiBaseUrl}/cart/items`, { productId, quantity });
    console.log(`[mock] add to cart -> productId=${productId}, qty=${quantity}`);
    return of({ success: true }).pipe(delay(150));
  }
}
