import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { Puzzle } from '../classes/puzzle';
import { PuzzleBank } from '../classes/puzzlebank';
import { SingleBlank } from '../techniques/single-blank';
import { formatDate } from '@angular/common';
import { NakedCandidates } from '../techniques/naked-candidates';

@Component({
  selector: 'ds-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  p: Puzzle = this.newPuzzle();

  considered: number = 0;
  guesses: number = 0;
  backtracks: number = 0;
  time_i = 0;
  time = "00:00:000";

  @ViewChild(GridComponent) grid!: GridComponent;

  constructor() {}

  ngOnInit(): void {
    console.log(Date.now());
  }

  backtrack(): void{
    this.time_i = Date.now();
    this.grid.play();
    this.grid.backtrack();
  }

  enhanced(): void{
    this.time_i = Date.now();
    this.grid.play();
    this.grid.backtrack_enhanced();
  }

  human(): void{
    this.time_i = Date.now();
    this.grid.play();
    this.grid.backtrack_human();
  }

  getPuzzle(): void{
    this.p = this.newPuzzle();
  }

  newPuzzle(){
    console.log("Grabbing new puzzle");
    if(this.grid){
      this.grid.customOff();
      this.grid.pause();
    }
    this.considered = 0;
    this.guesses = 0;
    this.backtracks = 0;
    this.time = "00:00:000";
    return new Puzzle(
        PuzzleBank.bank[
          Math.floor(Math.random() * 6)
        ][
          Math.floor(Math.random() * 3)
        ]
    )
  }

  newBlankPuzzle(): void{
    console.log("Setting up blank puzzle");
    this.p = new Puzzle(PuzzleBank.bank[5][3]);
    console.log("Blank puzzle ready for input");
  }

  markPuzzle(): void{
    this.p.markPuzzle();
  }

  emitTempo(n: number){
    this.grid.setTempo(n);
  }

  playAlgo(): void{
    this.grid.play();
  }

  pauseAlgo(): void{
    this.grid.pause();
  }

  runSingleBlank(): void{
    SingleBlank.singleBlank(this.p);
  }

  runNakedPair(): void{
    this.p.markPuzzle();
    NakedCandidates.nakedPairPuzzle(this.p);
  }

  updateConsidered(n: number){
    this.considered += n;
  }

  updateGuesses(n: number){
    this.guesses += n;
  }

  updateBacktracks(n: number){
    this.backtracks += n;
  }

  updateTime(n: number){
    this.time = formatDate(
      (n - this.time_i), 'mm:ss', "en-US"
      ) + ":" + ((n - this.time_i) % 1000);
      
  }

  userInput(): void{
    this.grid.pause();
    this.newBlankPuzzle();
    this.grid.customOn();
  }

}
