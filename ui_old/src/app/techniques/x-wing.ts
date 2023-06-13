import { Puzzle } from "../classes/puzzle";

export class XWing {

  //==============================================================
  // Driver
  //==============================================================

  /**
   * Runs X-Wing technique on all rows and columns in puzzle
   * @param p [Puzzle] Puzzle being worked
   */
  static xWing(p: Puzzle): Puzzle{
    for(let r = 0, c = 0; r < p.grid.length; r++, c++){
      this.row(p, r);
      this.col(p, c);
    }
    return p;
  }

  //==============================================================
  // Searches
  //==============================================================

  /**
   * Executes the X-Wing technique on specified row in puzzle
   * @param p [Puzzle] Puzzle object
   * @param r1 [number] Row number
   */
  static row(p: Puzzle, r1: number): void{
    console.log("Running x-wing row on row " + r1);
    for(let n = 1; n <= p.grid.length; n++){
      if(this.nInRow(p, r1, n) === 2){
        console.log("\tRow " + r1 + " has two " + n + "\'s");
        for(let r2 = 0; r2 < p.grid.length; r2++){
          if(r2 != r1 && this.nInRow(p, r2, n) === 2){
            console.log("\t\tRow " + r2 + " has two " + n + "\'s");
            for(let c1 = 0; c1 < p.grid.length; c1++){
              if(p.grid[r1][c1].hasMark(n) && p.grid[r2][c1].hasMark(n)){
                console.log("\t\t\tMatch 1 @ column " + c1);
                for(let c2 = c1 + 1; c2 < p.grid.length; c2++){
                  if(p.grid[r1][c2].hasMark(n) && p.grid[r2][c2].hasMark(n)){
                    console.log("\t\t\t\tMatch 2 @ column " + c2);
                    p.grid[r1][c1].hilite();
                    p.grid[r1][c2].hilite();
                    p.grid[r2][c1].hilite();
                    p.grid[r2][c2].hilite();
                    this.eraseN(p, r1, r2, c1, c2, n);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Executes the X-Wing technique on specified column in puzzle
   * @param p [Puzzle] Puzzle object
   * @param c1 [number] Column number
   */
  static col(p: Puzzle, c1: number): void{
    console.log("Running x-wing on column " + c1);
    for(let n = 1; n <= p.grid.length; n++){
      if(this.nInCol(p, c1, n) === 2){
        console.log("\tCol " + c1 + " has two " + n + "\'s");
        for(let c2 = 0; c2 < p.grid.length; c2++){
          if(this.nInCol(p, c2, n) === 2){
            console.log("\t\tCol " + c2 + " has two " + n + "\'s");
            for(let r1 = 0; r1 < p.grid.length; r1++){
              if(p.grid[r1][c1].hasMark(n) && p.grid[r1][c2].hasMark(n)){
                console.log("\t\t\tMatch 1 @ row " + r1);
                for(let r2 = 0; r2 < p.grid.length; r2++){
                  if(p.grid[r2][c1].hasMark(n) && p.grid[r2][c2].hasMark(n)){
                    console.log("\t\t\t\tMatch 2 @ row " + r2);
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
   * Determines the amount of occurrences of n in row r
   * @param p [Puzzle] Puzzle to search
   * @param r [number] Row number
   * @param n [number] Number to search for
   * @returns [number] Occurrences of n in p[r]
   */
  static nInRow(p: Puzzle, r: number, n: number): number{
    let q: number = 0;
    for(let c of p.grid[r]){
      if(c.pencilmarks.includes(n)){q++;}
    }
    return q;
  }

  /**
   * Determines the amount of occurrences of n in column c
   * @param p [Puzzle] Puzzle to search
   * @param c [number] Column number
   * @param n [number] Number to search for
   * @returns [number] Occurrences of n in p[c]
   */
  static nInCol(p: Puzzle, c: number, n: number): number{
    let q: number = 0;
    for(let r of p.grid){
      if(r[c].pencilmarks.includes(n)){q++;}
    }
    return q;
  }

  /**
   * Erases pencil mark n from all cells orthogonal to the four cells specified
   * @param p [Puzzle] Puzzle holding cells
   * @param r1 [number] Row 1
   * @param r2 [number] Row 2
   * @param c1 [number] Column 1
   * @param c2 [number] Column 2
   * @param n [number] Pencil mark being erased
   */
  static eraseN(p: Puzzle, r1: number, r2: number, c1: number, c2: number, n: number): void{
    console.log(
      "\t\t\t\t\tErasing " + n + " from rows " + 
      r1 + " & " + r2 + " and cols " + 
      c1 + " & " + c2);
      for(let r = 0, c = 0; r < p.grid.length; r++, c++){
        if(c != c1 && c != c2){
          p.grid[r1][c].erase(n);
          p.grid[r2][c].erase(n);
        }
        if(r != r1 && r != r2){
          p.grid[r][c1].erase(n);
          p.grid[r][c2].erase(n);
        }
      }
  }
}
