import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesYDirectivasRoutingModule } from './pipes-y-directivas-routing.module';
import { FontSizeDirective } from './font-size.directive';
import { FullNamePipe } from './full-name.pipe';
import { PipesYDirectivasComponent } from './pipes-y-directivas.component';


@NgModule({
  declarations: [
     FontSizeDirective, FullNamePipe, PipesYDirectivasComponent
  ],
  imports: [
    CommonModule,
    PipesYDirectivasRoutingModule
  ],
  exports:[FullNamePipe, FontSizeDirective]
})
export class PipesYDirectivasModule { }
