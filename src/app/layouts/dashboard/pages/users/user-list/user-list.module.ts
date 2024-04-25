import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinner
  ],
  exports: [UserListComponent]
})
export class UserListModule { }
