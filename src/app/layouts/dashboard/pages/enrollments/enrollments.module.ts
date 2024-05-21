import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    EnrollmentsComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
  ],
  providers: []
})
export class EnrollmentsModule { }
