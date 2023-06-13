import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { ControlsComponent } from './controls/controls.component';
import { ConfigComponent } from './config/config.component';
import { CellComponent } from './cell/cell.component';



@NgModule({
  declarations: [
    GridComponent,
    ControlsComponent,
    ConfigComponent,
    CellComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GridComponent,
    ControlsComponent,
    ConfigComponent,
    CellComponent
  ]
})
export class ComponentsModule { }
