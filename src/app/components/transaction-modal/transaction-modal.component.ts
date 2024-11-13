import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [
    ToggleSwitchComponent,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css'],
})
export class TransactionModalComponent implements OnInit {
  @Input() initialMode: 'income' | 'expenses' = 'income';
  @Input() selectedDate: string = new Date().toISOString().split('T')[0];
  @Output() transaction = new EventEmitter<{
    amount: number;
    mode: 'income' | 'expenses';
    date: string;
  }>();
  @Output() close = new EventEmitter<void>();

  faTimes = faTimes;
  amount: number | null = null;
  mode!: 'income' | 'expenses'; // Initialisation différée via ngOnInit
  internalSelectedDate: Date = new Date(this.selectedDate);
  isDateSelectorOpen: boolean = false;

  get formattedDate(): string {
    return this.internalSelectedDate.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  constructor() {
    console.log('Constructor - initialMode:', this.initialMode);
  }

  ngOnInit() {
    // Initialiser `mode` avec `initialMode` pour que la couleur corresponde dès le chargement
    this.mode = this.initialMode;
    console.log('ngOnInit - initialMode:', this.initialMode);
    console.log('ngOnInit - mode after initialization:', this.mode);
  }

  setMode(newMode: 'income' | 'expenses') {
    this.mode = newMode;
  }

  openDateSelector() {
    this.isDateSelectorOpen = true;
  }

  updateDate(newDate: Date) {
    this.internalSelectedDate = newDate;
    this.isDateSelectorOpen = false;
  }

  addTransaction() {
    if (this.amount !== null && this.amount > 0) {
      this.transaction.emit({
        amount: this.amount,
        mode: this.mode,
        date: this.internalSelectedDate.toISOString().split('T')[0],
      });
      this.amount = null;
      this.close.emit();
    }
  }
}
