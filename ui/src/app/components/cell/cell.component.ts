import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cell } from 'src/app/classes/cell';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell!:   Cell;
  @Input() row!:    number;
  @Input() col!:    number;

  error:            boolean =  false;
  @Input() custom:  boolean =  false;
  @Output() cellChange: EventEmitter<number> = new EventEmitter();

  constructor(public themeService: ThemeService){}
}
