import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ds-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  user_custom: boolean = false;

  @Input() speed: number = 50;

  @Output() backtrack: EventEmitter<void> = new EventEmitter();
  @Output() enhanced: EventEmitter<void> = new EventEmitter();
  @Output() human: EventEmitter<void> = new EventEmitter();
  @Output() tempo: EventEmitter<number> = new EventEmitter();
  @Output() mark: EventEmitter<void> = new EventEmitter();
  @Output() play: EventEmitter<void> = new EventEmitter();
  @Output() pause: EventEmitter<void> = new EventEmitter();
  @Output() new: EventEmitter<void> = new EventEmitter();
  @Output() custom: EventEmitter<void> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  setSpeed(n: number): void{
    this.speed = n;
    this.tempo.emit(this.speed);
  }

  emitBacktrack(): void{
    this.backtrack.emit();
  }

  emitEnhanced(): void{
    this.enhanced.emit();
  }

  emitHuman(): void{
    this.human.emit();
  }

  emitMark(): void{
    this.mark.emit();
  }

  emitNew(): void{
    this.new.emit();
  }

  emitPlay(): void{
    this.play.emit();
  }

  emitPause(): void{
    this.pause.emit();
  }

  emitCustom(): void{
    this.custom.emit();
  }

  license(){
    this.router.navigateByUrl("/license");
  }

}
