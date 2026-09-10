import { Component } from '@angular/core';

interface QuickAction {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  template: `
    <section class="quick-actions">
      @for (action of actions; track action.label) {
        <div class="qa-card">
          <div class="qa-icon">{{ action.icon }}</div>
          <div class="qa-label">{{ action.label }}</div>
        </div>
      }
    </section>
  `,
  styles: [`
    .quick-actions { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; padding:0 24px 24px; }
    .qa-card { border:1px solid #ddd; padding:16px; display:flex; flex-direction:column; gap:8px; }
    .qa-icon { font-size:20px; }
    .qa-label { color:#333; font-size:14px; }
  `]
})
export class QuickActionsComponent {
  // Backed by Order / Digital Service / Support Service per the architecture diagram
  actions: QuickAction[] = [
    { label: 'My Orders', icon: '📦' },
    { label: 'Subscriptions', icon: '🔁' },
    { label: 'Support Tickets', icon: '🎫' },
    { label: 'Documents & Downloads', icon: '📄' },
  ];
}
