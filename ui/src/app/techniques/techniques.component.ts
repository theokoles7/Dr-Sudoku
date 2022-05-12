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
  @Output() nakedSingle: EventEmitter<void> = new EventEmitter();
  @Output() nakedPair: EventEmitter<void> = new EventEmitter();
  @Output() nakedTriple: EventEmitter<void> = new EventEmitter();
  @Output() nakedQuad: EventEmitter<void> = new EventEmitter();
  @Output() xwing: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitSingleBlank(): void{
    this.singleBlank.emit();
  }

  emitNakedSingle(): void{
    this.nakedSingle.emit();
  }

  emitNakedPair(): void{
    this.nakedPair.emit();
  }

  emitNakedTriple(): void{
    this.nakedTriple.emit();
  }

  emitNakedQuad(): void{
    this.nakedQuad.emit();
  }

  emitXWing(): void{
    this.xwing.emit();
  }

}
