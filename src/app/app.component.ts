import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarModalComponent } from './components/calendar-modal/calendar-modal.component';
import { FinanceCardComponent } from './components/finance-card/finance-card.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { TransactionModalComponent } from './components/transaction-modal/transaction-modal.component';

interface Transaction {
  amount: number;
  mode: 'income' | 'expenses';
  date: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    FinanceCardComponent,
    TaskbarComponent,
    TransactionModalComponent,
    CalendarModalComponent,
    CommonModule,
  ],
})
export class AppComponent {
  title = 'PennyWise';
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  currentDate = new Date().toISOString().split('T')[0];
  isTransactionModalOpen = false;
  isCalendarModalOpen = false;

  transactions: Transaction[] = [
    { amount: 500, mode: 'income', date: '2024-11-01' },
    { amount: 200, mode: 'expenses', date: '2024-11-02' },
    { amount: 300, mode: 'income', date: '2024-11-15' },
    { amount: 100, mode: 'expenses', date: '2024-11-20' },
  ];

  // Méthode pour gérer le changement de mois
  onMonthChange(event: { month: number; year: number }) {
    this.currentMonth = event.month;
    this.currentYear = event.year;
  }

  handleOpenModal() {
    this.isTransactionModalOpen = true;
  }

  handleCloseModal() {
    this.isTransactionModalOpen = false;
  }

  handleTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    this.isTransactionModalOpen = false;
  }

  handleOpenCalendar() {
    this.isCalendarModalOpen = true;
  }

  handleCloseCalendarModal() {
    this.isCalendarModalOpen = false;
  }
}
