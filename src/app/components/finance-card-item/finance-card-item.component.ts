import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-finance-card-item',
  standalone: true,
  templateUrl: './finance-card-item.component.html',
  styleUrls: ['./finance-card-item.component.css'],
})
export class FinanceCardItemComponent {
  @Input() label!: string;
  @Input() value!: number;
  @Input() valueColor!: string;

  get formattedValue(): string {
    return `${(this.value ?? 0).toFixed(2)} €`;
  }
}
