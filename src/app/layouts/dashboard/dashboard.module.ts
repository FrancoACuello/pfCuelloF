import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UsersModule } from './pages/users/users.module';
import { PipesYDirectivasModule } from './pages/pipes-y-directivas/pipes-y-directivas.module';
import { SharedModule } from '../../shared/shared.module';
import { UserListModule } from './pages/users/user-list/user-list.module'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoursesModule } from './pages/courses/courses.module';
import { CalendarModule } from './pages/calendar/calendar.module';
import { CourseUserComponent } from './pages/course-user/course-user.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    DashboardComponent,
    CourseUserComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    UsersModule,
    PipesYDirectivasModule,
    SharedModule,
    UserListModule,
    MatProgressSpinnerModule,
    CoursesModule,
    CalendarModule,
    AuthModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
