import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { UserListModule } from './layouts/dashboard/pages/users/user-list/user-list.module';
import { RouterModule, Route } from '@angular/router';
import { CoursesModule } from './layouts/dashboard/pages/courses/courses.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './layouts/auth/auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UsersEffects } from './store/users/users.effects';
import { usersReducer } from './store/users/users.reducer';
import { coursesReducer } from './store/courses/courses.reducers';
import { CoursesEffects } from './store/courses/courses.effects';
import { EnrollmentsEffects } from './store/enrollment/enrollment.effects';
import { enrollmentsReducer } from './store/enrollment/enrollment.reducers';

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
   StoreModule.forRoot({users : usersReducer, courses: coursesReducer , enrollments: enrollmentsReducer}),
   EffectsModule.forRoot([UsersEffects, CoursesEffects, EnrollmentsEffects ]),
   StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
