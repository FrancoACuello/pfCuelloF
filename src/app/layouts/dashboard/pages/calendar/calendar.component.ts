import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core'; // Importa DateAdapter

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedDate: Date = new Date();
  newEvent: {
    class: string;
    time: string;
  } = { class: '', time: '' };
  eventName: string = '';
  events: string[] = [];
  timeOptions: string[] = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
  ];

  constructor(private dateAdapter: DateAdapter<Date>) {}

  onDateSelected(date: Date): void {
    // Aquí puedes agregar la lógica para manejar la selección de la fecha
    this.selectedDate = date;
  }


  ngOnInit() {
    const firstDayOfWeek = this.dateAdapter.getFirstDayOfWeek(); 
  }

  createEvent(selectedDate: Date, eventName: string): void {
    const eventDescription = `${this.newEvent.class} at ${this.newEvent.time}: ${eventName}`;
    this.events.push(eventDescription);
    this.newEvent.class = '';
    this.newEvent.time = '';
    this.eventName = '';
  }
}
