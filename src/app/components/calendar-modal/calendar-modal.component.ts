import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

interface Transaction {
  amount: number;
  mode: 'income' | 'expenses';
  date: string;
}

@Component({
  selector: 'app-calendar-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.css'],
})
export class CalendarModalComponent {
  @Input() isOpen: boolean = false;
  @Input() transactions: Transaction[] = [];
  @Output() close = new EventEmitter<void>();

  faTimes = faTimes;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  today = new Date();
  currentYear = this.today.getFullYear();
  currentMonth = this.today.getMonth();
  days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  get daysInMonth(): number[] {
    const totalDaysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    return Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
  }

  get emptyDaysStart(): number[] {
    const firstDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    return Array.from({
      length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1,
    });
  }

  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString(
      'fr-FR',
      { month: 'long' }
    );
  }

  closeModal() {
    this.close.emit();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  isToday(date: number): boolean {
    return (
      date === this.today.getDate() &&
      this.currentMonth === this.today.getMonth() &&
      this.currentYear === this.today.getFullYear()
    );
  }

  formatDate(year: number, month: number, day: number): string {
    const monthString = (month + 1).toString().padStart(2, '0');
    const dayString = day.toString().padStart(2, '0');
    return `${year}-${monthString}-${dayString}`;
  }

  get transactionsByDate() {
    const grouped: { [key: string]: Transaction[] } = {};
    this.transactions.forEach((transaction) => {
      const transactionDate = transaction.date;
      if (!grouped[transactionDate]) {
        grouped[transactionDate] = [];
      }
      grouped[transactionDate].push(transaction);
    });
    return grouped;
  }
}
