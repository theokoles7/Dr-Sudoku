import { Cell } from "./cell";

export class Puzzle {
  public grid: Array<Array<Cell>> = [[], [], [], [], [], [], [], [], []];

  constructor(g: Array<Array<number>>){
    for(let r = 0; r < g.length; r++){
      for(let c = 0; c < g.length; c++){
        this.grid[r][c] = new Cell(g[r][c]);
      }
    }
  }

  //==============================================================
  // Blanks
  //==============================================================

  /**
   * Computes number of blanks in row
   * @param r [number] Row number
   * @returns [number] Quantity of blanks in row
   */
  blankInRow(r: number): number{
    let blanks: number = 0;
    for(let cell of this.grid[r]){
      if(cell.value === 0){blanks++;}
    }
    return blanks;
  }

  /**
   * Computes number of blanks in column
   * @param c [number] Column number
   * @returns [number] Quantity of blanks in column
   */
  blankInCol(c: number): number{
    let blanks: number = 0;
    for(let row of this.grid){
      if(row[c].value === 0){blanks++;}
    }
    return blanks;
  }

  /**
   * Computes number of blanks in box
   * @param r [number] Row component of cell coordinate
   * @param c [number] Column component of cell coordinate
   * @returns [number] Quantity of blanks in box
   */
  blankInBox(r: number, c: number): number{
    let blanks: number = 0;
    for(let i = r - (r % 3); i <= (r - (r % 3)) + 2; i++){
      for(let j = c - (c % 3); j <= (c - (c % 3)) + 2; j++){
        if(this.grid[i][j].value === 0){blanks++;}
      }
    }
    return blanks;
  }

  /**
   * Collects all blank cells in row
   * @param r [number] Row number
   * @returns [Array<Cell>] Blank cells in row
   */
  getBlanksRow(r: number): Array<Cell>{
    let blanks: Array<Cell> = [];
    for(let cell of this.grid[r]){
      if(cell.value === 0){
        blanks.push(cell);
      }
    }
    return blanks;
  }

  /**
   * Collects all blank cells in column
   * @param c [number] Column number
   * @returns [Array<Cell>] Blank cells in column
   */
  getBlanksCol(c: number): Array<Cell>{
    let blanks: Array<Cell> = [];
    for(let row of this.grid){
      if(row[c].value === 0){
        blanks.push(row[c]);
      }
    }
    return blanks;
  }

  /**
   * Collects all blank cells in box
   * @param r [number] Row component of cell coordinate
   * @param c [number] Column component of cell coordinate
   * @returns [Array<Cell>] Blank cells in box
   */
  getBlanksBox(r: number, c: number){
    let blanks: Array<Cell> = [];
    for(let i = r - (r % 3); i <= (r - (r % 3)) + 2; i++){
      for(let j = c - (c % 3); j <= (c - (c % 3)) + 2; j++){
        if(this.grid[i][j].value === 0){
          blanks.push(this.grid[i][j]);}
      }
    }
    return blanks;
  }

  //==============================================================
  // Candidate Validation
  //==============================================================

  /**
   * Returns true if number n exists in row r
   * @param n [number] Number to search for in row
   * @param r [number] Index of row in which number is to be searched for
   * @returns [boolean] TRUE if number is in row, FALSE otherwise
   */
  numInRow(n: number, r: number): boolean{
    for(let c of this.grid[r]){
      if(c.value === n){return true;}
    }
    return false;
  }

  /**
   * Returns true if number n exists in column c
   * @param n [number] Number to search for in column
   * @param c [number] Index of column in which number is to be searched for
   * @returns [boolean] TRUE if number is in column, FALSE otherwise
   */
   numInCol(n: number, c: number): boolean{
    for(let r of this.grid){
      if(r[c].value === n){return true;}
    }
    return false;
  }

  /**
   * Returns true if number n exists in box containing coordinate [r, c]
   * @param n [number] Number to search for in box
   * @param r [number] Row component of coordinate
   * @param c [number] Column component of coordinate 
   * @returns [boolean] TRUE if number is in box, FALSE otherwise
   */
  numInBox(n: number, r: number, c: number): boolean{
    for(let i = r - (r % 3); i <= (r - (r % 3)) + 2; i++){
      for(let j = c - (c % 3); j <= (c - (c % 3)) + 2; j++){
        if(this.grid[i][j].value === n){return true;}
      }
    }
    return false;
  }

  /**
   * Returns true if number n is a valid candidate for coordinate [r, c]
   * @param n [number] Number to be validated
   * @param r [number] Row componnent of coordinate being validated
   * @param c [number] Column component of coordinate being validated
   * @returns [boolean] TRUE if number is valid entry, FALSE otherwise
   * @see numInRow(), @see numInCol(), @see numInBox()
   */
  numValid(n: number, r: number, c: number): boolean{
    return(
      !this.numInRow(n, r) &&
      !this.numInCol(n, c) &&
      !this.numInBox(n, r, c)
    );
  }

  //==============================================================
  // Difference
  //==============================================================

  /**
   * Computes the difference of all current entries in row
   * @param r [number] Row number
   * @returns [number] Difference of 45 minus @see sumRow()
   */
  diffRow(r: number): number{
    return (45 - this.sumRow(r));
  }

  /**
   * Computes the difference of all current entries in column
   * @param c [number] Column number
   * @returns [number] Difference of 45 minus @see sumCol()
   */
   diffCol(c: number): number{
    return (45 - this.sumCol(c));
  }

  /**
   * Computes the difference of all current entries in box
   * @param r [number] Row component of cell
   * @param c [number] Column component of cell
   * @returns [number] Difference of 45 minus @see sumBox()
   */
  diffBox(r: number, c: number): number{
    return (45 - this.sumBox(r, c));
  }

  //==============================================================
  // Highlight
  //==============================================================

  /**
   * Highlights all cells in row
   * @param r [number] Row number
   */
  highlightRow(r: number): void{
    for(let cell of this.grid[r]){
      cell.hilite();
    }
  }

  /**
   * Highlights all cells in column
   * @param c [number] Column number
   */
  highlightCol(c: number): void{
    for(let row of this.grid){
      row[c].hilite();
    }
  }

  /**
   * Highlights all cells in box
   * @param r [number] Row component of cell coordinate
   * @param c [number] Column component of cell coordinate
   */
  highlightBox(r: number, c: number): void{
    for(let i = r - (r % 3); i <= (r - (r % 3)) + 2; i++){
      for(let j = c - (c % 3); j <= (c - (c % 3)) + 2; j++){
        this.grid[i][j].hilite();
      }
    }
  }

  //==============================================================
  // Pencil Marks
  //==============================================================

  /**
   * Adds pencil marks for valid candidates of cell [r, c]
   * @param r [number] Row component of coordinate
   * @param c [number] Column coordinate of coordinate
   */
  markCell(r: number, c: number): void{
    for(let n = 1; n <= 9; n++){
      if(
        this.numValid(n, r, c) &&
        !this.grid[r][c].pencilmarks.includes(n)
      ){this.grid[r][c].mark(n);}
    }
  }

  /**
   * Adds pencil marks for every empty cell found in the grid
   * @see markCell()
   */
  markPuzzle(): void{
    for(let r = 0; r < this.grid.length; r++){
      for(let c = 0; c < this.grid.length; c++){
        if(this.grid[r][c].value === 0){
          this.markCell(r, c);
        }
      }
    }
  }

  //==============================================================
  // Sum
  //==============================================================

  /**
   * Computes the sum of all current entries in row
   * @param r [number] Row number
   * @returns [number] Sum of entries in row
   */
  sumRow(r: number): number{
    let sum: number = 0;
    for(let cell of this.grid[r]){
      sum += cell.value;
    }
    return sum;
  }

  /**
   * Computes the sum of all current entries in column
   * @param c [number] Column number
   * @returns [number] Sum of entries in column
   */
  sumCol(c: number): number{
    let sum: number = 0;
    for(let row of this.grid){
      sum += row[c].value;
    }
    return sum;
  }

  /**
   * Computes the sum of all current entries in box
   * @param r [number] Row component of cell
   * @param c [number] Column component of cell
   * @returns [number] Sum of entries in box
   */
   sumBox(r: number, c: number): number{
    let sum: number = 0;
    for(let i = r - (r % 3); i <= (r - (r % 3)) + 2; i++){
      for(let j = c - (c % 3); j <= (c - (c % 3)) + 2; j++){
        sum += this.grid[i][j].value;
      }
    }
    return sum;
  }
}
