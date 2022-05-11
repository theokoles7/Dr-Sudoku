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
      if(blanks[i].pencilmarks.length === 2){
        for(let j = i + 1; j < blanks.length; j++){
          if(blanks[j].pencilmarks.length === 2 &&
            blanks[i].pencilmarks[0] === blanks[j].pencilmarks[0] &&
            blanks[i].pencilmarks[1] === blanks[j].pencilmarks[1]
          ){
            blanks[i].hilite();
            blanks[j].hilite();
            for(let c = 0; c < blanks.length; c++){
              if(c != i && c != j){
                for(let n of blanks[i].pencilmarks){
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
