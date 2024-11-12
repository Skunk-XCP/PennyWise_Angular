import { Component } from '@angular/core';
import { FinanceCardComponent } from './components/finance-card/finance-card.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';

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
  imports: [FinanceCardComponent, TaskbarComponent],
})
export class AppComponent {
  title = 'PennyWise';
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();

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
    console.log('Modal opened');
  }

  handleOpenCalendar() {
    console.log('Calendar opened');
  }
}
