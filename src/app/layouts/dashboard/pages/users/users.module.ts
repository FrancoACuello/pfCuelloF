import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { PipesYDirectivasModule } from '../../../../core/pipes-y-directivas/pipes-y-directivas.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    PipesYDirectivasModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  exports:[UsersComponent]
})
export class UsersModule { }
