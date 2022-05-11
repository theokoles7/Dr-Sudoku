import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cell } from '../classes/cell';

@Component({
  selector: 'ds-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() cell!: Cell;
  @Input() row!: number;
  @Input() col!: number;
  @Input() custom: boolean = false;

  @Output() cellChange: EventEmitter<number> = new EventEmitter();

  error: boolean = false;

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

  ngOnInit(): void {
  }

}
