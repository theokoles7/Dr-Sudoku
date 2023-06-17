export class Cell {
    value!:             number;
    editModeActive:     boolean =       false;
    pencilMarksVisible: boolean =       false;
    error:              boolean =       false;
    solved:             boolean =       false;
    highlight:          boolean =       false;
    pencilMarks:        Array<number> = [];

    constructor(val: number){
        this.value = val;
    }

    //==============================================================
    // Value
    //==============================================================
    /**
     * Clear cell value.
     */
    clear():void{
        this.value = 0;
    }

    /**
     * Set cell value.
     * @param n Number between 1 and 9 (inclusive)
     */
    async setValue(n: number): Promise<void>{
        if((n < 1 || n > 9) && n){this.error = true;}
        else{
            this.value = n;
        }
    }

    //==============================================================
    // Pencil Marks
    //==============================================================

    /**
     * Add pencil mark n for cell.
     * @param n Pencil mark being added.
     */
    make_marks(n: number): void{
        this.pencilMarks.push(n);
    }

    /**
     * Indicate if cell's pencil marks contains specific value.
     * @param n Number being searched for
     * @returns True if cell contains pencil mark, False otherwise
     */
    has_mark(n: number): boolean{
        return this.pencilMarks.includes(n);
    }

    /**
     * Erase pencil mark n from cell.
     * @param n Pencil mark being erased
     */
    erase(n: number): void{
        this.pencilMarks.splice(this.pencilMarks.indexOf(n), 1);
    }

    //==============================================================
    // Highlight
    //==============================================================

    /**
     * Highlight cell.
     */
    async hilite(): Promise<void>{
        this.highlight = true;
        await this.delay(3000);
        this.highlight = false;
    }

    //==============================================================
    // AUXILIARY
    //==============================================================

    /**
     * Provide pseudo-sleep function.
     * @param millis Milliseconds to wait
     * @returns Pseudo-sleep object
     */
    delay(millis: number): Promise<void>{
        return new Promise(resolve => setTimeout(resolve, millis));
    }
}
