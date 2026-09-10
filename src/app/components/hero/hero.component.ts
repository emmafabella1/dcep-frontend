import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero">
      <div class="hero-copy">
        <h1>Welcome back, {{ customerName() }}</h1>
        <p>Manage your orders, subscriptions, and account — all in one place.</p>
        <div class="actions">
          <button class="btn primary" (click)="browseCatalog.emit()">Browse catalog</button>
          <button class="btn secondary" (click)="trackOrder.emit()">Track an order</button>
        </div>
      </div>
      <div class="hero-image" aria-hidden="true"></div>
    </section>
  `,
  styles: [`
    .hero { display:flex; justify-content:space-between; align-items:center; gap:24px; padding:28px; }
    .hero-copy { max-width:520px; }
    h1 { margin:0 0 8px; font-size:22px; }
    p { margin:0; color:#555; }
    .actions { display:flex; gap:10px; margin-top:16px; }
    .btn { padding:10px 18px; cursor:pointer; font-size:14px; }
    .btn.primary { background:#1a1a1a; color:#fff; border:none; }
    .btn.secondary { background:#fff; border:1px solid #333; }
    .hero-image { width:280px; height:140px; background:#eee; border:1px dashed #bbb; flex-shrink:0; }
  `]
})
export class HeroComponent {
  // in a real app this would come from an auth/user service (e.g. via Azure AD B2C claims)
  customerName = input('Alex');
  browseCatalog = output<void>();
  trackOrder = output<void>();
}
