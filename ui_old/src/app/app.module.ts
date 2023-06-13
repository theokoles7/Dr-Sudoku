import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LicenseComponent } from './license/license.component';
import { MainComponent } from './main/main.component';
import { GridComponent } from './grid/grid.component';
import { ControlsComponent } from './controls/controls.component';
import { CellComponent } from './cell/cell.component';
import { TechniquesComponent } from './techniques/techniques.component';

@NgModule({
  declarations: [
    AppComponent,
    LicenseComponent,
    MainComponent,
    GridComponent,
    ControlsComponent,
    CellComponent,
    TechniquesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
