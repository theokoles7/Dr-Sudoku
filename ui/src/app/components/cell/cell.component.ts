import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cell } from 'src/app/classes/cell';
import { ThemeService } from 'src/app/services/theme.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
          style({opacity: 0 }),
          animate('0.25s ease-in-out', style({opacity: 1 }))
      ])])
    ]
})

export class CellComponent {

  // INPUTS
  @Input() cell!:   Cell;

  // CONSTRUCTOR
  constructor(public themeService: ThemeService){}
}
