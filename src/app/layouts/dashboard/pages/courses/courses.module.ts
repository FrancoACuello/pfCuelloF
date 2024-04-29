import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { MatListModule } from '@angular/material/list'
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [ CoursesComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    CoursesRoutingModule,
    MatListModule,
    FormsModule
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
