import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cell } from '../classes/cell';

@Component({
  selector: 'ds-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  // ================================================================================= VARIABLES
  // ----------------------------------------------------------- Component objects
  @Input() cell!:   Cell;
  @Input() row!:    number;
  @Input() col!:    number;
  // ----------------------------------------------------------- Controls user input
  error:            boolean = false;
  @Input() custom:  boolean = false;
  @Output() cellChange: EventEmitter<number> = new EventEmitter();

  // ================================================================================= METHODS

  /**
   * Sets the value of this cell as n
   * @param n [number] New cell value
   */
  setCell(n: number){
    if(n >= 1 && n <= 9){
      this.error = false;
      console.log("[" + this.row + ", " + this.col + "] = " + n);
      this.cell.value = n;
      this.cellChange.emit(n);
    }else{
      this.error = true;
    }
  }

  constructor() { }

  ngOnInit(): void {}

}
