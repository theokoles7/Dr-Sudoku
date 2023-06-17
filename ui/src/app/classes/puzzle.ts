import { Cell } from "./cell";

export class Puzzle {
    public  grid:   Array<Array<Cell>> =    [[], [], [], [], [], [], [], [], []];
    private orig!:  Array<Array<number>>;
    private marked: boolean =               false;

    constructor(g: Array<Array<number>>){
        this.orig = g;
        for(let r = 0; r < g.length; r++){
            for(let c = 0; c < g.length; c++){
                this.grid[r][c] = new Cell(g[r][c]);
            }
        }
        this.markPuzzle();
    }

    //==============================================================
    // Cells
    //==============================================================
    /**
     * Clear all cell values.
     */
    clearPuzzle():void{
        for(let row of this.grid){
            for(let cell of row){
                cell.clear()
            }
        }
        this.markPuzzle();
    }

    //==============================================================
    // Components
    //==============================================================

    /**
     * Provide row r.
     * @param r Row number
     * @returns Row 
     */
    getRow(r: number): Array<Cell>{
        return this.grid[r];
    }

    /**
     * Provide column c.
     * @param c Column number
     * @returns Column c
     */
    getCol(c: number): Array<Cell>{
        let col: Array<Cell> = [];
        for(let row of this.grid){
            col.push(row[c]);
        }
        return col;
    }

    /**
     * Provide box containing [r, c]
     * @param r Row number
     * @param c Column number
     * @returns Box containing [r, c]
     */
    getBox(r: number, c: number): Array<Cell>{
        let box: Array<Cell> = [];
        for(let i = r - (r % 3); i <= (r - (r % 3)) + 2; i++){
            for(let j = c - (c % 3); j <= (c - (c % 3)) + 2; j++){
                box.push(this.grid[r][c]);
            }
        }
        return box;
    }

    //==============================================================
    // Blanks
    //==============================================================

    /**
     * Provide count of blanks in row.
     * @param r Row number
     * @returns Quantity of blanks in row
     */
    blankInRow(r: number): number{
        return this.getBlanksInRow(r).length;
    }

    /**
     * Provide count of blanks in column.
     * @param c Column number
     * @returns Quantity of blanks in column
     */
    blankInCol(c: number): number{
        return this.getBlanksInCol(c).length;
    }

    /**
     * Provide count of blanks in box.
     * @param r Row number
     * @param c Column number
     * @returns Quantity of blanks in row
     */
    blankInBox(r: number, c: number): number{
        return this.getBlanksInBox(r, c).length;
    }

    /**
     * Provide list of cells in row that are blank.
     * @param r Row number
     * @returns List of blank cells in column
     */
    getBlanksInRow(r: number): Array<Cell>{
        return this.grid[r].filter((cell) => cell.value === 0);
    }

    /**
     * Provide list of cells in column that are blank.
     * @param c Column number
     * @returns List of blank cells in column
     */
    getBlanksInCol(c: number): Array<Cell>{
        return this.getCol(c).filter((cell) => cell.value === 0);
    }

    /**
     * Provide list of cells in box that are blank.
     * @param r Row number
     * @param c Column number
     * @returns List of blank cells in box
     */
    getBlanksInBox(r: number, c: number): Array<Cell>{
        return this.getBox(r, c).filter((cell) => cell.value === 0);
    }

    //==============================================================
    // Candidate Validation
    //==============================================================

    /**
     * Indicate if n is in row n.
     * @param n Number being searched for
     * @param r Row number
     * @returns True if n is in row r, False otherwise
     */
    numInRow(n: number, r: number): boolean{
        return this.grid[r].filter((cell) => cell.value === n).length > 0;
    }

    /**
     * Indicate if n is in column c.
     * @param n Number being searched for
     * @param c Column number
     * @returns True if n is in column c, False otherwise
     */
    numInCol(n: number, c: number): boolean{
        return this.getCol(c).filter((cell) => cell.value === n).length > 0;
    }

    /**
     * Indicate if n is in box containing [r, c].
     * @param n Number being searched for
     * @param r Row number
     * @param c Column number
     * @returns True if n is in box containing [r, c] False otherwise
     */
    numInBox(n: number, r: number, c: number): boolean{
        return this.getBox(r, c).filter((cell) => cell.value === n).length > 0;
    }

    /**
     * Indicate if n is a valid entry for [r, c].
     * @param n Number being validated
     * @param r Row number
     * @param c Column number
     * @returns True if number is a valid entry for [r, c], False otherwise
     */
    numIsValid(n: number, r: number, c: number): boolean{
        return (
            !this.numInRow(n, r) &&
            !this.numInCol(n, c) &&
            !this.numInBox(n, r, c)
        )
    }

    //==============================================================
    // Difference
    //==============================================================

    /**
     * Provide difference of 45 - sum of row r.
     * @param r Row number
     * @returns Difference of 45 - sum of row
     */
    diffRow(r: number): number{
        return 45 - this.sumRow(r);
    }

    /**
     * Provide difference of 45 - sum of column c.
     * @param c Column number
     * @returns Difference of 45 - sum of column
     */
    diffCol(c: number): number{
        return 45 - this.sumCol(c);
    }

    /**
     * Provide difference of 45 - sumn of box containing [r, c]
     * @param r Row number
     * @param c Column number
     * @returns Difference of 45 - sum of box containing [r, c]
     */
    diffBox(r: number, c: number):number{
        return 45 - this.sumBox(r, c);
    }

    //==============================================================
    // Highlight
    //==============================================================

    /**
     * Highlight every cell in row r.
     * @param r Row number
     */
    highlightRow(r: number): void{
        for(let cell of this.getRow(r)){cell.hilite();}
    }

    /**
     * Highlight every cell in column c.
     * @param c Column number
     */
    highlightCol(c: number): void{
        for(let cell of this.getCol(c)){cell.hilite();}
    }

    /**
     * Highlight every cell in box containing [r, c]
     * @param r Row number
     * @param c Column number
     */
    highlightBox(r: number, c: number): void{
        for(let cell of this.getBox(r, c)){cell.hilite();}
    }

    //==============================================================
    // Pencil Marks
    //==============================================================

    /**
     * Add valid pencil marks for candidates of cell [r, c].
     * @param r Row number
     * @param c Column number
     */
    markCell(r: number, c: number): void{
        for(let n = 1; n <= 9; n++){
            if(
                this.numIsValid(n, r, c) &&
                !this.grid[r][c].pencilMarks.includes(n)
            ){
                this.grid[r][c].make_marks(n);
            }
        }
    }

    /**
     * Add pencil marks for every empty cell found in the grid.
     */
    markPuzzle(): void{
        if(!this.marked){
            for(let r = 0; r < this.grid.length; r++){
                for(let c = 0; c < this.grid.length; c++){
                    if(this.grid[r][c].value === 0){this.markCell(r, c);}
                }
            }
        }
    }

    /**
     * Erase all instances of n in pencil marks of cells in row.
     * @param n Pencil mark being erased
     * @param r Row number
     */
    eraseInRow(n: number, r: number): void{
        for(let cell of this.getRow(r)){cell.erase(n);}
    }

    /**
     * Erase all instances of n in pencil marks of cells in column.
     * @param n Pencil mark being erased
     * @param c Column number
     */
    eraseInCol(n: number, c: number): void{
        for(let cell of this.getCol(c)){cell.erase(n);}
    }

    /**
     * Erase all instances of n in pencil marks of cells in box.
     * @param n Pencil mark being erased
     * @param r Row number
     * @param c Column number
     */
    eraseInBox(n: number, r: number, c: number): void{
        for(let cell of this.getBox(r, c)){cell.erase(n);}
    }

    /**
    * Erase all instances of n in pencil marks of surrounding cells.
    * @param n [number] Pencil mark being erased
    * @param r [number] Row number
    * @param c [number] Column number
    */
    eraseInAdjacent(n: number, r: number, c: number): void{
        this.eraseInRow(n, r);
        this.eraseInCol(n, c);
        this.eraseInBox(n, r, c);
    }

    //==============================================================
    // Sum
    //==============================================================

    /**
     * Provide sum of cells in row r.
     * @param r Row number
     * @returns Sum of cell values in row
     */
    sumRow(r: number): number{
        let sum = 0;
        return this.getRow(r).reduce(
            (accumulator, currentValue) => accumulator + currentValue.value, sum
        );
    }

    /**
     * Provide sum of cells in column c.
     * @param c Column number
     * @returns Sum of cell values in column
     */
    sumCol(c: number): number{
        let sum = 0;
        return this.getCol(c).reduce(
            (accumulator, currentValue) => accumulator + currentValue.value, sum
        );
    }

    /**
     * Provide sum of cells in box containing [r, c].
     * @param r Row number
     * @param c Column number
     * @returns Sum of cell values in box containing [r, c]
     */
    sumBox(r: number, c: number): number{
        let sum = 0;
        return this.getBox(r, c).reduce(
            (accumulator, currentValue) => accumulator + currentValue.value, sum
        );
    }
}
