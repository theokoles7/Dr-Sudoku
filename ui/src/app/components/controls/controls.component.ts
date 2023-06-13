import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  @Output() pencilMarks: EventEmitter<void> = new EventEmitter();

  constructor(public themeService: ThemeService){}

  /**
   * Emit signal to make pencil marks for puzzle.
   */
  mark():void{this.pencilMarks.emit();}
}
