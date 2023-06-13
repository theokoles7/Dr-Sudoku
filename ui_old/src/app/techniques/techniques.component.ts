import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ds-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.scss']
})
export class TechniquesComponent implements OnInit {
  // ================================================================================= VARIABLES
  // ----------------------------------------------------------- Stats
  @Input() considered:  number = 0;
  @Input() guesses:     number = 0;
  @Input() backtracks:  number = 0;
  @Input() time:        string = "00:00:000";
  // ----------------------------------------------------------- Technique signals
  @Output() singleBlank:  EventEmitter<void> = new EventEmitter();
  @Output() nakedSingle:  EventEmitter<void> = new EventEmitter();
  @Output() nakedPair:    EventEmitter<void> = new EventEmitter();
  @Output() nakedTriple:  EventEmitter<void> = new EventEmitter();
  @Output() nakedQuad:    EventEmitter<void> = new EventEmitter();
  @Output() xwing:        EventEmitter<void> = new EventEmitter();

  // ================================================================================= METHODS
  constructor(){}

  ngOnInit(): void{}

}
