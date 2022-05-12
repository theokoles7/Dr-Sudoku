import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { Puzzle } from '../classes/puzzle';
import { PuzzleBank } from '../classes/puzzlebank';
import { SingleBlank } from '../techniques/single-blank';
import { formatDate } from '@angular/common';
import { NakedCandidates } from '../techniques/naked-candidates';
import { XWing } from '../techniques/x-wing';

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

  ngOnInit(): void {}

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
    this.p = new Puzzle(PuzzleBank.bank[6][0]);
    console.log("Blank puzzle ready for input");
  }

  emitTempo(n: number){
    this.grid.setTempo(n);
  }

  runSingleBlank(): void{
    SingleBlank.singleBlank(this.p);
  }

  runNakedSingle(): void{
    this.p.markPuzzle();
    this.p = NakedCandidates.nakedSingle(this.grid.puzzle);
  }

  runNakedPair(): void{
    //this.p = new Puzzle(PuzzleBank.bank[7][0]); // For testing
    this.p.markPuzzle();
    this.p = NakedCandidates.nakedPair(this.grid.puzzle);
  }

  runNakedTriple(): void{
    //this.p = new Puzzle(PuzzleBank.bank[7][1]); // For testing
    this.p.markPuzzle();
    this.p = NakedCandidates.nakedTriple(this.grid.puzzle);
  }

  runNakedQuad(): void{
    //this.p = new Puzzle(PuzzleBank.bank[7][2]); // For testing
    this.p.markPuzzle();
    this.p = NakedCandidates.nakedQuad(this.grid.puzzle);
  }

  runXWing(): void{
    //this.p = new Puzzle(PuzzleBank.bank[7][3]); // For testing row
    //this.p = new Puzzle(PuzzleBank.bank[7][4]); // For testing col
    this.p.markPuzzle();
    this.p = XWing.xWing(this.p);
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
