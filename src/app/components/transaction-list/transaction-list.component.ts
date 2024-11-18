import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Transaction {
  amount: number;
  mode: 'income' | 'expenses';
  date: string;
}

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Input() selectedMonth!: number;
  @Input() selectedYear!: number;

  get filteredAndGroupedTransaction(): Record<string, Transaction[]> {
    const filteredTransactions = this.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === this.selectedMonth &&
        transactionDate.getFullYear() === this.selectedYear
      );
    });

    const sortedTransactions = filteredTransactions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return sortedTransactions.reduce(
      (acc: Record<string, Transaction[]>, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
      },
      {}
    );
  }

  get filteredDates(): string[] {
    return Object.keys(this.filteredAndGroupedTransaction).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });
  }

  formatDate(date: string): string {
    const today = new Date().toISOString().split('T')[0];
    if (date === today) {
      return "Aujourd'hui";
    }
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Date(date).toLocaleDateString('fr-FR', options);
  }
}
