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
  // ================================================================================= VARIABLES
  // ----------------------------------------------------------- Component objects
  p: Puzzle = this.newPuzzle();
  @ViewChild(GridComponent) grid!: GridComponent;
  // ----------------------------------------------------------- Stats
  considered: number = 0;
  guesses:    number = 0;
  backtracks: number = 0;
  time_i:     number = 0;
  time:       string = "00:00:000";

  // ================================================================================= METHODS
  constructor() {}

  ngOnInit(): void {}

  // ------------------------------------------------------------- Relays
  /**
   * Relays backtrack signal to grid
   */
  backtrack(): void{
    this.time_i = Date.now();
    this.grid.play();
    this.grid.backtrack();
  }

  /**
   * Relays enhanced signal to grid
   */
  enhanced(): void{
    this.time_i = Date.now();
    this.grid.play();
    this.grid.backtrack_enhanced();
  }

  /**
   * Relays human signal to grid
   */
  human(): void{
    this.time_i = Date.now();
    this.grid.play();
    this.grid.backtrack_human();
  }

  // ------------------------------------------------------------- Puzzle manager

  /**
   * Grabs random puzzle from puzzle bank
   * @returns  [Puzzle] New puzzle with fresh stats
   */
  newPuzzle(): Puzzle{
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

  /**
   * Grabs blank puzzle from puzzle bank
   */
  newBlankPuzzle(): void{
    console.log("Setting up blank puzzle");
    this.p = new Puzzle(PuzzleBank.bank[6][0]);
    console.log("Blank puzzle ready for input");
  }

  /**
   * Proxy function for "NEW PUZZLE" button
   */
  getPuzzle(): void{
    this.p = this.newPuzzle();
  }

  // ------------------------------------------------------------- Grid manager
  /**
   * Communicates new value of speed to grid component
   * @param n [number] New speed value
   */
  emitTempo(n: number): void{
    this.grid.setTempo(n);
  }

  /**
   * Tells grid to turn on user input
   */
  userInput(): void{
    this.grid.pause();
    this.newBlankPuzzle();
    this.grid.customOn();
  }

  // ------------------------------------------------------------- Techniques manager
  /**
   * Initiates single blank technique on puzzle
   */
  runSingleBlank(): void{
    SingleBlank.singleBlank(this.p);
  }

  /**
   * Initiates naked single technique on puzzle
   */
  runNakedSingle(): void{
    this.p.markPuzzle();
    this.p = NakedCandidates.nakedSingle(this.grid.puzzle);
  }

  /**
   * Initiates naked pair technique on puzzle
   */
  runNakedPair(): void{
    //this.p = new Puzzle(PuzzleBank.bank[7][0]); // For testing
    this.p.markPuzzle();
    this.p = NakedCandidates.nakedPair(this.grid.puzzle);
  }

  /**
   * Initiates naked triple technique on puzzle
   */
  runNakedTriple(): void{
    //this.p = new Puzzle(PuzzleBank.bank[7][1]); // For testing
    this.p.markPuzzle();
    this.p = NakedCandidates.nakedTriple(this.grid.puzzle);
  }

  /**
   * Initiates naked quad technique on puzzle
   */
  runNakedQuad(): void{
    //this.p = new Puzzle(PuzzleBank.bank[7][2]); // For testing
    this.p.markPuzzle();
    this.p = NakedCandidates.nakedQuad(this.grid.puzzle);
  }

  /**
   * Initiates x-wing technique on puzzle
   */
  runXWing(): void{
    //this.p = new Puzzle(PuzzleBank.bank[7][3]); // For testing row
    //this.p = new Puzzle(PuzzleBank.bank[7][4]); // For testing col
    this.p.markPuzzle();
    this.p = XWing.xWing(this.p);
  }

  // ------------------------------------------------------------- Stats manager
  /**
   * Updates amount of numbers considered for puzzle
   * @param n [number] Number of considerations being added
   */
  updateConsidered(n: number): void{
    this.considered += n;
  }

  /**
   * Updates amount of guesses made on puzzle
   * @param n [number] Number of guesses being added
   */
  updateGuesses(n: number): void{
    this.guesses += n;
  }

  /**
   * Updates amount of backtracks taken on puzzle
   * @param n [number] Amount of backtracks being added
   */
  updateBacktracks(n: number): void{
    this.backtracks += n;
  }

  /**
   * Updates time taken to solve puzzle
   * @param n [number] Current time in milliseconds
   */
  updateTime(n: number): void{
    this.time = formatDate(
      (n - this.time_i), 'mm:ss', "en-US"
      ) + ":" + ((n - this.time_i) % 1000);
      
  }

}
