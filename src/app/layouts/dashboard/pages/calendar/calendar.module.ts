import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule si lo estás utilizando
import { DateAdapter } from '@angular/material/core';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatCardModule } from '@angular/material/card'; // Importa el módulo MatCardModule
@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    FormsModule, // Asegúrate de agregar FormsModule si lo estás utilizando
    MatDatepickerModule,
    MatCardModule,
    FormsModule,
  ],
  
  exports:[CalendarComponent] ,
  
  // Exporta CalendarComponent aquí
})
export class CalendarModule { }
