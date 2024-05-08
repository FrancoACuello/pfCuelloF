import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthComponent } from '../auth/auth.component';
import { authGuard } from '../../core/guards/auth.guard';
import { adminGuard } from '../../core/guards/admin.guard';
import { unsavedChangesGuard } from '../../core/guards/unsaved-changes.guard';


const routes: Routes = [
  /**
   * Path actual: /dashboard
   */
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'users',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'courses',
    canDeactivate: [unsavedChangesGuard],
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },
 
  {
    path: 'calendar',
    loadChildren: () =>
      import('./pages/calendar/calendar.module').then((m) => m.CalendarModule)
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
