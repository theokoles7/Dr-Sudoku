import { Puzzle } from "../classes/puzzle";

export class SingleBlank {

  /**
   * Executes single blank technique on every row, column, and box in puzzle
   * @param p [Puzzle] Puzzle to execute technique on
   */
  static singleBlank(p: Puzzle){
    console.log("Running single blanks technique on:");
    for(let r = 0; r < p.grid.length; r++){
      console.log("\tRow " + r + ":");
      for(let c = 0; c < p.grid.length; c++){
        console.log("\t\tCol " + c + ":");
        if(p.grid[r][c].value === 0){
          if(p.blankInRow(r) === 1){
            p.highlightRow(r);
            p.grid[r][c].value = p.diffRow(r);
            console.log("\t\t\t[" + r + ", " + c + "] = " + p.grid[r][c].value + "(single blank in row)");
          }
          else if(p.blankInCol(c) === 1){
            p.highlightCol(c);
            p.grid[r][c].value = p.diffCol(c);
            console.log("\t\t\t[" + r + ", " + c + "] = " + p.grid[r][c].value + "(single blank in col)");
          }
          else if(p.blankInBox(r, c) === 1){
            p.highlightBox(r, c);
            p.grid[r][c].value = p.diffBox(r, c);
            console.log("\t\t\t[" + r + ", " + c + "] = " + p.grid[r][c].value + "(single blank in box)");
          }
        }
      }
    }
  }

  /**
   * Determines if single blank technique can be applied to row
   * @param p [Puzzle] Puzzle object
   * @param r [number] Row number
   * @returns [boolean] True if technique should be applied, False otherwise
   */
  static singleBlankRow(p: Puzzle, r: number): boolean{
    return p.blankInRow(r) == 1;
  }

  /**
   * Determines if single blank technique can be applied to column
   * @param p [Puzzle] Puzzle object
   * @param c [number] Column number
   * @returns [boolean] True if technique should be applied, False otherwise
   */
  static singleBlankCol(p: Puzzle, c: number): boolean{
    return p.blankInCol(c) == 1;
  }

  /**
   * Determines if single blank technique can be applied to box
   * @param p [Puzzle] Puzzle object
   * @param r [number] Row number
   * @param c [number] Column number
   * @returns [boolean] True if technique should be applied, False otherwise
   */
  static singleBlankBox(p: Puzzle, r: number, c: number): boolean{
    return p.blankInBox(r, c) == 1;
  }
}
