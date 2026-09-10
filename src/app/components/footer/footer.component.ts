import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="col">
        <h3>Company</h3>
        <div>About</div>
        <div>Contact</div>
      </div>
      <div class="col">
        <h3>Support</h3>
        <div>Help Center</div>
        <div>Track Order</div>
      </div>
      <div class="col">
        <h3>Legal</h3>
        <div>Terms</div>
        <div>Privacy</div>
      </div>
    </footer>
  `,
  styles: [`
    footer { display:flex; justify-content:space-between; padding:20px 24px; border-top:1px solid #ddd; font-size:12px; color:#666; }
    .col div { margin-bottom:4px; }
    h3 { font-size:13px; color:#222; margin:0 0 8px; }
  `]
})
export class FooterComponent {}
