export class Cell {
  value!: number;
  solved: boolean = false;
  highlight: boolean = false;
  pencilmarks: Array<number> = [];

  constructor(n: number){
    this.value = n;
  }

  mark(n: number){
    this.pencilmarks.push(n);
  }

  hasMark(n: number): boolean{
    return this.pencilmarks.includes(n);
  }

  erase(n: number){
    if(this.pencilmarks.includes(n)){
      this.pencilmarks.splice(this.pencilmarks.indexOf(n), 1);
    }
  }

  hilite(): void{
    this.highlight = true;
  }
}
