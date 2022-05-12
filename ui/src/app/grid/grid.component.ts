import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Puzzle } from '../classes/puzzle';
import { SingleBlank } from '../techniques/single-blank';

@Component({
  selector: 'ds-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  // ================================================================================= VARIABLES
  // ----------------------------------------------------------- Component objects
  @Input() puzzle!: Puzzle;
  // ----------------------------------------------------------- Cell tracking
  r_current!:   number;
  c_current!:   number;
  r_backup!:    number;
  c_backup!:    number;
  // ----------------------------------------------------------- Algo tempo
  tempo:        number =  50;
  // ----------------------------------------------------------- Play/pause
  algo_play:    boolean = false;
  // ----------------------------------------------------------- Custom puzzle on/off
  user_puzzle:  boolean = false;

  // ----------------------------------------------------------- Stats
  @Output() considered: EventEmitter<number> = new EventEmitter();
  @Output() guess:      EventEmitter<number> = new EventEmitter();
  @Output() mistake:    EventEmitter<number> = new EventEmitter();
  @Output() new_time:   EventEmitter<number> = new EventEmitter();

  // ================================================================================= METHODS
  constructor() { }

  ngOnInit(): void {}

  /**
   * Controls 'current' styling rule for cells
   * @param r [number] Row number
   * @param c [number] Column number
   * @returns [boolean] True if current, False otherwise
   */
  isCurrent(r: number, c: number): boolean{
    return(
      this.r_current === r &&
      this.c_current === c
    );
  }

  // ------------------------------------------------------------- Algorithms
  /**
   * Runs brute force backtrack algorithm on puzzle
   * @returns [boolean] True at completion, False at failure
   */
  async backtrack(): Promise<boolean>{
    this.customOff();
    for(let r = 0; r < this.puzzle.grid.length; r++){
      this.r_current = r;
      for(let c = 0; c < this.puzzle.grid.length; c++){
        this.c_current = c;
        if(this.puzzle.grid[r][c].value === 0){
          for(let n = 1; n <= this.puzzle.grid.length; n++){
            this.considered.emit(1);
            await this.delay(100 - this.tempo);
            this.new_time.emit(Date.now());
            if(this.puzzle.numValid(n, r, c)){
              while(!this.algo_play){await this.delay(500);}
              this.puzzle.grid[r][c].solved = true;
              this.puzzle.grid[r][c].value = n;
              this.guess.emit(1);
              if(await this.backtrack()){
                return true;
              }else{
                this.puzzle.grid[r][c].solved = false;
                this.puzzle.grid[r][c].value = 0;
                this.mistake.emit(1);
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Runs enhanced backtrack algorithm on puzzle
   * @returns [boolean] True at completion, False at failure
   */
   async backtrack_enhanced(): Promise<boolean>{
    this.customOff();
    this.puzzle.markPuzzle();
    for(let r = 0; r < this.puzzle.grid.length; r++){
      this.r_current = r;
      for(let c = 0; c < this.puzzle.grid.length; c++){
        this.c_current = c;
        if(this.puzzle.grid[r][c].value === 0){
          for(let n of this.puzzle.grid[r][c].pencilmarks){
            this.considered.emit(1);
            await this.delay(100 - this.tempo);
            this.new_time.emit(Date.now());
            if(this.puzzle.numValid(n, r, c)){
              while(!this.algo_play){await this.delay(500);}
              this.puzzle.grid[r][c].solved = true;
              this.puzzle.grid[r][c].value = n;
              this.guess.emit(1);
              if(await this.backtrack_enhanced()){
                return true;
              }else{
                this.puzzle.grid[r][c].solved = false;
                this.puzzle.grid[r][c].value = 0;
                this.mistake.emit(1);
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Runs human backtrack algorithm on puzzle
   * @returns [boolean] True at completion, False at failure
   */
  async backtrack_human(): Promise<boolean>{
    let n!: number;
      this.customOff();
      this.puzzle.markPuzzle();
      for(let r = 0; r < this.puzzle.grid.length; r++){
        this.r_current = r;
        for(let c = 0; c < this.puzzle.grid.length; c++){
          this.c_current = c;
          this.new_time.emit(Date.now());
          if(this.puzzle.grid[r][c].value === 0){

            if(SingleBlank.singleBlankRow(this.puzzle, r)){
              this.considered.emit(1);
              await this.delay(100 - this.tempo);
              n = this.puzzle.diffRow(r);
              if(this.puzzle.numValid(n, r, c)){
                while(!this.algo_play){await this.delay(500);}
                this.puzzle.grid[r][c].solved = true;
                this.puzzle.grid[r][c].value = n;
                this.guess.emit(1);
                if(await this.backtrack_human()){
                  return true;
                }else{
                  this.puzzle.grid[r][c].solved = false;
                  this.puzzle.grid[r][c].value = 0;
                  this.mistake.emit(1);
                }
              }
            }
            else if(SingleBlank.singleBlankCol(this.puzzle, c)){
              this.considered.emit(1);
              await this.delay(100 - this.tempo);
              n = this.puzzle.diffCol(c);
              if(this.puzzle.numValid(n, r, c)){
                while(!this.algo_play){await this.delay(500);}
                this.puzzle.grid[r][c].solved = true;
                this.puzzle.grid[r][c].value = n;
                this.guess.emit(1);
                if(await this.backtrack_human()){
                  return true;
                }else{
                  this.puzzle.grid[r][c].solved = false;
                  this.puzzle.grid[r][c].value = 0;
                  this.mistake.emit(1);
                }
              }
            }
            else if(SingleBlank.singleBlankBox(this.puzzle, r, c)){
              this.considered.emit(1);
              await this.delay(100 - this.tempo);
              n = this.puzzle.diffBox(r, c);
              if(this.puzzle.numValid(n, r, c)){
                while(!this.algo_play){await this.delay(500);}
                this.puzzle.grid[r][c].solved = true;
                this.puzzle.grid[r][c].value = n;
                this.guess.emit(1);
                if(await this.backtrack_human()){
                  return true;
                }else{
                  this.puzzle.grid[r][c].solved = false;
                  this.puzzle.grid[r][c].value = 0;
                  this.mistake.emit(1);
                }
              }
            }
            else{
              for(let m of this.puzzle.grid[r][c].pencilmarks){
                this.considered.emit(1);
                await this.delay(100 - this.tempo);
                if(this.puzzle.numValid(m, r, c)){
                  while(!this.algo_play){await this.delay(500);}
                  this.puzzle.grid[r][c].solved = true;
                  this.puzzle.grid[r][c].value = m;
                  this.guess.emit(1);
                  if(await this.backtrack_human()){
                    return true;
                  }else{
                    this.puzzle.grid[r][c].solved = false;
                    this.puzzle.grid[r][c].value = 0;
                    this.mistake.emit(1);
                  }
                }
              }
            }
            return false;
          }
        }
      }
      return true;
  }

  // ------------------------------------------------------------- Speed control
  /**
   * Sets the algorithm tempo value
   * @param n 
   */
  setTempo(n: number): void{
    this.tempo = n;
  }

  /**
   * Provides pseudo-sleep function
   * @param t [number] Milliseconds to wait
   * @returns [Promise] Pseudo-sleep object
   */
  delay(t: number): Promise<void>{
    return new Promise((resolve) => setTimeout(() => resolve(), t));
  }

  
  // ------------------------------------------------------------- Controls
  /**
   * Turns algorithm playability ON
   */
  play(): void{
    this.algo_play = true;
  }

  /**
   * Turns algorithm playability OFF
   */
  pause(): void{
    this.algo_play = false;
  }

  /**
   * Turns user input ON
   */
  customOn(): void{
    this.user_puzzle = true;
  }

  /**
   * Turns user input OFF
   */
  customOff(): void{
    this.user_puzzle = false;
  }


}
