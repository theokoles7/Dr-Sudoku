import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  @Output() pencilMarks:  EventEmitter<void>    = new EventEmitter();
  @Output() resetPuzzle:  EventEmitter<void>    = new EventEmitter();
  @Output() editPuzzle:   EventEmitter<void>    = new EventEmitter();
  @Output() newPuzzle:    EventEmitter<void>    = new EventEmitter();
  @Output() clearPuzzle:  EventEmitter<void>    = new EventEmitter();
  @Output() verifyPuzzle: EventEmitter<void>    = new EventEmitter();
  @Output() playAlgo:     EventEmitter<void>    = new EventEmitter();
  @Output() pauseAlgo:    EventEmitter<void>    = new EventEmitter();
  @Output() adjustSpeed:  EventEmitter<number>  = new EventEmitter();

  constructor(public themeService: ThemeService){}
}
