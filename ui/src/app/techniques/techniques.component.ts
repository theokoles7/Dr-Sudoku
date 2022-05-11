import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ds-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.scss']
})
export class TechniquesComponent implements OnInit {
  @Input() considered: number = 0;
  @Input() guesses: number = 0;
  @Input() backtracks: number = 0;
  @Input() time: string = "00:00:000";
  
  @Output() singleBlank: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitSingleBlank(): void{
    this.singleBlank.emit();
  }

}
