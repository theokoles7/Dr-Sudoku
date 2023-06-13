export class Cell {
    value!:         number;
    solved:         boolean =       false;
    highlight:      boolean =       false;
    pencilMarks:    Array<number> = [];

    constructor(val: number){
        this.value = val;
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
     * 
     * @param n Indicate existence of pencil mark.
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

    /**
     * Provide pseudo-sleep function.
     * @param millis Milliseconds to wait
     * @returns Pseudo-sleep object
     */
    delay(millis: number): Promise<void>{
        return new Promise((resolve) => setTimeout(() => resolve(), millis));
    }
}
