import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { Puzzle } from '../classes/puzzle';
import { PuzzleBank } from '../classes/puzzlebank';
import { SingleBlank } from '../techniques/single-blank';
import { formatDate } from '@angular/common';

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

  @ViewChild(GridComponent) grid!: GridComponent;

  constructor() {}

  ngOnInit(): void {}

  backtrack(): void{
    this.grid.play();
    this.grid.backtrack();
  }

  enhanced(): void{
    this.grid.play();
    this.grid.backtrack_enhanced();
  }

  human(): void{
    this.grid.play();
    this.grid.backtrack_human();
  }

  getPuzzle(): void{
    this.p = this.newPuzzle();
  }

  newPuzzle(){
    console.log("Grabbing new puzzle");
    this.considered = 0;
    this.guesses = 0;
    this.backtracks = 0;
    if(this.grid){
      this.grid.customOff();
      this.grid.pause();
    }
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

  updateConsidered(n: number){
    this.considered += n;
  }

  updateGuesses(n: number){
    this.guesses += n;
  }

  updateBacktracks(n: number){
    this.backtracks += n;
  }

  userInput(): void{
    this.grid.pause();
    this.newBlankPuzzle();
    this.grid.customOn();
  }

}
