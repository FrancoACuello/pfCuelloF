import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesYDirectivasRoutingModule } from './pipes-y-directivas-routing.module';
import { PipesYDirectivasComponent } from './pipes-y-directivas.component';
import { FontSizeDirective } from './font-size.directive';
import { FullNamePipe } from './full-name.pipe';


@NgModule({
  declarations: [
    PipesYDirectivasComponent, FontSizeDirective, FullNamePipe
  ],
  imports: [
    CommonModule,
    PipesYDirectivasRoutingModule
  ],
  exports:[PipesYDirectivasComponent, FullNamePipe, FontSizeDirective]
})
export class PipesYDirectivasModule { }
