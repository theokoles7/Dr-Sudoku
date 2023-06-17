import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { LicenseComponent } from './license/license.component';
import { ComponentsModule } from '../components/components.module';
import { HelpComponent } from './help/help.component';



@NgModule({
  declarations: [
    ErrorComponent,
    PuzzleComponent,
    LicenseComponent,
    HelpComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    ErrorComponent
  ]
})
export class PagesModule { }
