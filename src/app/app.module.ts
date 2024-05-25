import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { UserListModule } from './layouts/dashboard/pages/users/user-list/user-list.module';
import { RouterModule, Route } from '@angular/router';
import { CoursesModule } from './layouts/dashboard/pages/courses/courses.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './layouts/auth/auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { usersReducer } from './store/users/users.reducer';
import { coursesReducer } from './store/courses/courses.reducers';
import { enrollmentsReducer } from './store/enrollment/enrollment.reducers';

import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users/users.effects';
import { CoursesEffects } from './store/courses/courses.effects';
import { EnrollmentEffects } from './store/enrollment/enrollment.effects';

import { ROOT_REDUCERS } from './store';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    UserListModule,
   CoursesModule,
   MatDatepickerModule,
   HttpClientModule,
   AuthRoutingModule,
   MatProgressSpinnerModule,
   StoreModule.forRoot(ROOT_REDUCERS),
   EffectsModule.forRoot([UsersEffects, CoursesEffects, EnrollmentEffects,AuthEffects ]),
   StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
