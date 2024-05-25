import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [SharedModule,
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatCardModule
    
  ]
})
export class AuthModule { }
