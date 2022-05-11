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

  erase(n: number){
    delete this.pencilmarks[this.pencilmarks.indexOf(n)];
  }

  hilite(): void{
    this.highlight = true;
  }
}
