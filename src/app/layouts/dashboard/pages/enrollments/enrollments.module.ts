import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { EnrollmentsComponent } from './enrollments.component';
import { SharedModule } from '../../../../shared/shared.module';
import { enrollmentsReducer } from '../../../../store/enrollment/enrollment.reducers';
import { EnrollmentEffects } from '../../../../store/enrollment/enrollment.effects';

@NgModule({
  declarations:[
    EnrollmentsComponent,
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    FormsModule,
    EffectsModule,StoreModule,
    SharedModule,
    StoreModule.forFeature('enrollments', enrollmentsReducer),
    EffectsModule.forFeature([EnrollmentEffects])
  ],
  providers: [],
})
export class EnrollmentsModule { }
