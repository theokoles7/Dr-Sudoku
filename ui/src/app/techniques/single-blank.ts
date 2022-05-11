import { Puzzle } from "../classes/puzzle";

export class SingleBlank {

  static singleBlank(p: Puzzle): void{
    console.log("Checking for single blanks:");
    for(let r = 0; r < p.grid.length; r++){
      if(this.singleBlankRow(p, r)){
        p.highlightRow(r);
        console.log("\tSingle blank in row " + r);
      }
      for(let c = 0; c < p.grid.length; c++){
        if(this.singleBlankCol(p, c)){
          p.highlightCol(c);
          console.log("\tSingle blank in column " + c);
        }
        if(this.singleBlankBox(p, r, c)){
          p.highlightBox(r, c);
          console.log("\tSingle blank in box containing [" + r + ", " + c + "]");
        }
      }
    }
  }

  static singleBlankRow(p: Puzzle, r: number): boolean{
    return p.blankInRow(r) == 1;
  }

  static singleBlankCol(p: Puzzle, c: number): boolean{
    return p.blankInCol(c) == 1;
  }

  static singleBlankBox(p: Puzzle, r: number, c: number): boolean{
    return p.blankInBox(r, c) == 1;
  }
}
