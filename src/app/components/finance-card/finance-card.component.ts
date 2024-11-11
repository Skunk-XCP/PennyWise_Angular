import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FinanceCardItemComponent } from '../finance-card-item/finance-card-item.component';

interface Transaction {
  amount: number;
  mode: 'income' | 'expenses';
  date: string;
}

@Component({
  selector: 'app-finance-card',
  standalone: true,
  imports: [FinanceCardItemComponent, FontAwesomeModule],
  templateUrl: './finance-card.component.html',
  styleUrls: ['./finance-card.component.css'],
})
export class FinanceCardComponent {
  @Input() transactions: Transaction[] = [];
  @Input() selectedMonth!: number;
  @Input() selectedYear!: number;
  @Output() changeMonth = new EventEmitter<{ month: number; year: number }>();
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  get monthName(): string {
    return this.monthNames[this.selectedMonth];
  }

  get filteredTransactions(): Transaction[] {
    return this.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === this.selectedMonth &&
        transactionDate.getFullYear() === this.selectedYear
      );
    });
  }

  get monthlyIncome(): number {
    return this.filteredTransactions
      .filter((transaction) => transaction.mode === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  get monthlyExpenses(): number {
    return this.filteredTransactions
      .filter((transaction) => transaction.mode === 'expenses')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  get monthlyBalance(): number {
    return this.monthlyIncome - this.monthlyExpenses;
  }

  previousMonth(): void {
    if (this.selectedMonth === 0) {
      this.changeMonth.emit({ month: 11, year: this.selectedYear - 1 });
    } else {
      this.changeMonth.emit({
        month: this.selectedMonth - 1,
        year: this.selectedYear,
      });
    }
  }

  nextMonth(): void {
    if (this.selectedMonth === 11) {
      this.changeMonth.emit({ month: 0, year: this.selectedYear + 1 });
    } else {
      this.changeMonth.emit({
        month: this.selectedMonth + 1,
        year: this.selectedYear,
      });
    }
  }
}
