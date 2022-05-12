export class Cell {
  value!: number;
  solved: boolean = false;
  highlight: boolean = false;
  pencilmarks: Array<number> = [];

  constructor(n: number){
    this.value = n;
  }

  //==============================================================
  // Pencil Marks
  //==============================================================

  /**
   * Adds pencil mark for cell
   * @param n [umber] Pencil mark to add
   */
  mark(n: number){
    this.pencilmarks.push(n);
  }

  /**
   * Communicates existence of pencil mark
   * @param n [number] Pencil mark to check for
   * @returns [boolean] True if pencil mark is present, False otherwise
   */
  hasMark(n: number): boolean{
    return this.pencilmarks.includes(n);
  }

  /**
   * Erases pencil mark
   * @param n [number] Pencil mark value to erase
   */
  erase(n: number){
    if(this.pencilmarks.includes(n)){
      this.pencilmarks.splice(this.pencilmarks.indexOf(n), 1);
    }
  }

  //==============================================================
  // Highlight
  //==============================================================

  /**
   * Changes highlight value to true for 3 seconds so that it can be reused
   */
  async hilite(): Promise<void>{
    this.highlight = true;
    await this.delay(3000);
    this.highlight = false;
  }

  /**
   * Provides pseudo-sleep function
   * @param t [number] Milliseconds to wait
   * @returns [Promise] Pseudo-sleep object
   */
  delay(t: number): Promise<void>{
    return new Promise((resolve) => setTimeout(() => resolve(), t));
  }
}
