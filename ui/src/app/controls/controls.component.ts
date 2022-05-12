import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ds-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  // ================================================================================= VARIABLES
  @Input() speed: number = 50;

  // ----------------------------------------------------------- Algorithm signals
  @Output() backtrack:  EventEmitter<void> = new EventEmitter();
  @Output() enhanced:   EventEmitter<void> = new EventEmitter();
  @Output() human:      EventEmitter<void> = new EventEmitter();
  // ----------------------------------------------------------- Control signals
  @Output() tempo:      EventEmitter<number> = new EventEmitter();
  @Output() mark:       EventEmitter<void> = new EventEmitter();
  @Output() play:       EventEmitter<void> = new EventEmitter();
  @Output() pause:      EventEmitter<void> = new EventEmitter();
  @Output() new:        EventEmitter<void> = new EventEmitter();
  @Output() custom:     EventEmitter<void> = new EventEmitter();

  // ================================================================================= METHODS

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {}

  // ------------------------------------------------------- Emitters

  /**
   * Sets the speed at which an algorithm will execute instructions.
   * Emits the new speed value to main
   * @param n [number] Speed value (1 - 100)
   */
  setSpeed(n: number): void{
    this.speed = n;
    this.tempo.emit(this.speed);
  }

  /**
   * Emits signal for backtrack algorithm to begin
   */
  emitBacktrack(): void{
    this.backtrack.emit();
  }

  /**
   * Emits signal for enhanced backtrack algorithm to begin
   */
  emitEnhanced(): void{
    this.enhanced.emit();
  }

  /**
   * Emits signal for human backtrack algorithm to being
   */
  emitHuman(): void{
    this.human.emit();
  }

  /**
   * Emits signal for pencil marks to made on puzzle
   */
  emitMark(): void{
    this.mark.emit();
  }

  /**
   * Emits signal for new puzzle to be loaded
   */
  emitNew(): void{
    this.new.emit();
  }

  /**
   * Emits signal for grid's play value to be set to true
   */
  emitPlay(): void{
    this.play.emit();
  }

  /**
   * Emits signal for grid's play value to be set to false
   */
  emitPause(): void{
    this.pause.emit();
  }

  /**
   * Emits signal for blank puzzle to be displayed and allow user input
   */
  emitCustom(): void{
    this.custom.emit();
  }

  // ------------------------------------------------------- Routers

  /**
   * Navigates to license
   */
  license(): void{
    this.router.navigateByUrl("/license");
  }

}
