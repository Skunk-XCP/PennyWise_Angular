import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarAlt,
  faChartLine,
  faEllipsisH,
  faHome,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css'],
})
export class TaskbarComponent {
  faHome = faHome;
  faCalendar = faCalendarAlt;
  faAddCircle = faPlusCircle;
  faChart = faChartLine;
  faMore = faEllipsisH;

  @Output() openCalendar = new EventEmitter<void>();
  @Output() openModal = new EventEmitter<void>();

  onOpenModal() {
    this.openModal.emit();
  }

  onOpenCalendar() {
    this.openCalendar.emit();
  }
}
