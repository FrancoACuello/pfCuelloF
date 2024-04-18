import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { PipesYDirectivasModule } from '../pipes-y-directivas/pipes-y-directivas.module';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    PipesYDirectivasModule,
  ],
  exports:[UsersComponent]
})
export class UsersModule { }
