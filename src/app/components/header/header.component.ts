import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="topbar">
      <div class="logo">DCEP</div>
      <input class="search" type="text" placeholder="Search products, orders, docs..." />
      <nav class="nav">
        <span>Catalog</span><span>Orders</span><span>Subscriptions</span><span>Support</span>
      </nav>
      <div class="icons">
        <button class="icon" (click)="cartClicked.emit()">
          🛒
          @if (cartCount() > 0) {
            <span class="badge">{{ cartCount() }}</span>
          }
        </button>
        <button class="icon">🔔</button>
        <button class="icon">☺</button>
      </div>
    </header>
  `,
  styles: [`
    .topbar { display:flex; align-items:center; gap:20px; padding:14px 24px; border-bottom:1px solid #ddd; }
    .logo { font-weight:bold; border:1px solid #333; padding:4px 12px; }
    .search { flex:1; max-width:400px; padding:6px 10px; border:1px solid #ccc; }
    .nav { display:flex; gap:18px; font-size:14px; }
    .icons { margin-left:auto; display:flex; gap:12px; align-items:center; }
    .icon { border:none; background:none; cursor:pointer; font-size:16px; position:relative; }
    .badge {
      position:absolute; top:-6px; right:-6px; background:#c0392b; color:#fff;
      border-radius:50%; font-size:10px; width:16px; height:16px;
      display:flex; align-items:center; justify-content:center;
    }
  `]
})
export class HeaderComponent {
  cartCount = input(0);
  cartClicked = output<void>();
}
