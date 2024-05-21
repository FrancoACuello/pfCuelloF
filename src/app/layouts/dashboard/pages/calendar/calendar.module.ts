import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatCardModule } from '@angular/material/card'; 
@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    FormsModule, 
    MatDatepickerModule,
    MatCardModule,
    FormsModule,
  ],
  
  exports:[CalendarComponent] ,
  
  // Exporta CalendarComponent aquí
})
export class CalendarModule { }
