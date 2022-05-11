import { Cell } from "../classes/cell";
import { Puzzle } from "../classes/puzzle";

export class NakedCandidates {
  //==============================================================
  // Singles
  //==============================================================

  static nakedSingle(p: Puzzle): Puzzle{
    for(let r = 0; r < p.grid.length; r++){
      for(let c = 0; c < p.grid.length; c++){
        if(p.grid[r][c].value === 0 && p.grid[r][c].pencilmarks.length === 1){
          p.grid[r][c].hilite();
          p.grid[r][c].value = p.grid[r][c].pencilmarks[0];
          let n = p.grid[r][c].pencilmarks[0];
          p.eraseNAdj(n, r, c);
        }
      }
    }
    return p;
  }

  //==============================================================
  // Pairs
  //==============================================================

  static nakedPair(p: Puzzle): Puzzle{
    for(let r = 0; r < p.grid.length; r++){
      this.nakedPairRow(p, r);
      for(let c = 0; c < p.grid.length; c++){
        this.nakedPairCol(p, c);
        this.nakedPairBox(p, r, c);
      }
    }
    return p;
  }

  static nakedPairRow(p: Puzzle, r: number): void{
    this.nakedPairPuzzle(p.getBlanksRow(r));
  }

  static nakedPairCol(p: Puzzle, c: number): void{
    this.nakedPairPuzzle(p.getBlanksCol(c));
  }

  static nakedPairBox(p: Puzzle, r: number, c: number): void{
    this.nakedPairPuzzle(p.getBlanksBox(r, c));
  }

  static nakedPairPuzzle(blanks: Array<Cell>): void{
    for(let i = 0; i < blanks.length - 1; i++){
      let ipm = blanks[i].pencilmarks;
      if(ipm.length === 2){
        for(let j = i + 1; j < blanks.length; j++){
          let jpm = blanks[j].pencilmarks;
          if(jpm.length === 2 &&
            this.matches(ipm, jpm, 2)
          ){
            blanks[i].hilite();
            blanks[j].hilite();
            for(let c = 0; c < blanks.length; c++){
              if(c != i && c != j){
                for(let n of ipm){
                  blanks[c].erase(n);
                }
              }
            }
          }
        }
      }
    }
  }

  //==============================================================
  // Triples
  //==============================================================

  static nakedTriple(p: Puzzle): Puzzle{
    for(let r = 0; r < p.grid.length; r++){
      this.nakedTripleRow(p, r);
      for(let c = 0; c < p.grid.length; c++){
        this.nakedTripleCol(p, c);
        this.nakedTripleBox(p, r, c);
      }
    }
    return p;
  }

  static nakedTripleRow(p: Puzzle, r: number): void{
    console.log("Running naked triple on row " + r);
    this.nakedTriplePuzzle(p.getBlanksRow(r));
  }

  static nakedTripleCol(p: Puzzle, c: number): void{
    console.log("Running naked triple on column " + c);
    this.nakedTriplePuzzle(p.getBlanksCol(c));
  }

  static nakedTripleBox(p: Puzzle, r: number, c: number): void{
    console.log("Running naked triple from row " + r + ", col " + c);
    this.nakedTriplePuzzle(p.getBlanksBox(r, c));
  }

  static nakedTriplePuzzle(blanks: Array<Cell>): void{
    for(let i = 0; i < blanks.length - 2; i++){
      let ipm = blanks[i].pencilmarks;
      if(ipm.length === 3){
        console.log("\tHit 1 @ " + i + " with " + ipm);
        for(let j = 0; j < blanks.length - 1; j++){
          let jpm = blanks[j].pencilmarks;
          if(
            (j !== i) && (jpm.length === 2
            && this.matches(ipm, jpm, 2) || (jpm.length === 3 && this.matches(ipm, jpm, 3)))
          ){
            console.log("\t\tHit 2 @ " + j + " with " + jpm);
            for(let k = 0; k < blanks.length; k++){
              let kpm = blanks[k].pencilmarks;
              if(
                (k !== i && k !== j) && (kpm.length == 2
                && this.matches(ipm, kpm, 2) && this.matches(jpm, kpm, 1)
                || (kpm.length === 3 && this.matches(ipm, kpm, 3)))
              ){
                console.log("\t\t\tHit 3 @ " + k + " with " + kpm);
                blanks[i].hilite();
                blanks[j].hilite();
                blanks[k].hilite();
                for(let c = 0; c < blanks.length; c++){
                  if(c != i && c != j && c != k){
                    for(let n of ipm){
                      blanks[c].erase(n);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  //==============================================================
  // Helpers
  //==============================================================

  /**
   * Counts quantity of matches between given arrays
   * @param a1 [Array<number>] Array 1
   * @param a2 [Array<number>] Array 1
   * @param m [number] Minimum matches required
   * @returns [boolean] True if minimum is met, False otherwise
   */
  static matches(a1: Array<number>, a2: Array<number>, m: number): boolean{
    let matches: number = 0;
    for(let n1 of a1){
      for(let n2 of a2){
        if(n1 === n2){
          if(++matches === m){return true;}
        }
      }
    }
    return false;
  }
}
