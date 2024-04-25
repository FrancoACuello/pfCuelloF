// calendar.component.ts
import { Component } from '@angular/core';
import { CalendarModule } from './calendar.module';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  selectedDate: Date = new Date(); // Inicializa la propiedad selectedDate con la fecha actual
  events: string[] = []; // Lista de eventos

  constructor() {}

  // Método para manejar la selección de fechas
  onDateSelected(date: Date): void {
    this.selectedDate = date;
    // Aquí podrías cargar los eventos del día seleccionado desde tu servicio o base de datos
    // Por ahora, solo usaremos una lista de eventos ficticios
    this.events = [
      'Meeting at 10:00 AM',
      'Lunch with friends at 1:00 PM',
      'Gym at 5:30 PM'
    ];
  }

  // Método para agregar eventos
  addEvent(event: string): void {
    if (event.trim()) {
      this.events.push(event);
    }
  }
}
