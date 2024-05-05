import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    UserListModule,
   CoursesModule,
   MatDatepickerModule,
   HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
