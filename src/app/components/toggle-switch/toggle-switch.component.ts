import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css'],
})
export class ToggleSwitchComponent {
  @Input() initialIncome: boolean = false;
  @Output() updateMode = new EventEmitter<'income' | 'expenses'>();

  isIncome: boolean = this.initialIncome;

  toggleSwitch() {
    this.isIncome = !this.isIncome;
    this.updateMode.emit(this.isIncome ? 'income' : 'expenses');
  }
}
