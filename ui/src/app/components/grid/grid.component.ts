import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Puzzle } from 'src/app/classes/puzzle';
import { ThemeService } from 'src/app/services/theme.service';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() puzzle!: Puzzle;

  @ViewChildren(CellComponent) cells!: QueryList<CellComponent>;

  constructor(public themeService: ThemeService){}

  /**
   * Clear any and every value from the grid.
   */
  clearPuzzle(): void{
    for(let cell of this.cells){
      cell.cell.pencilMarksVisible = false;
    }
    this.puzzle.clearPuzzle();
  }

  /**
   * Reset any and every value from the grid that was not already present.
   */
  resetPuzzle(): void{
    for(let cell of this.cells){
      cell.cell.pencilMarksVisible = false;
    }
  }

  /**
   * Toggles edit mode for all cells in grid.
   */
  async toggleEditMode(): Promise<void>{
    if(this.cells.get(0)!.cell.pencilMarksVisible == true){
      for(let cell of this.cells){
        cell.cell.pencilMarksVisible = false;
      }
      await this.delay(500);
    }
    for(let cell of this.cells){
      cell.cell.editModeActive = !cell.cell.editModeActive;
    }
  }

  /**
   * Toggles pencil marks (visibility) for all cells in grid.
   */
  async togglePencilMarks():Promise<void>{
    if(this.cells.get(0)!.cell.editModeActive == true){
      for(let cell of this.cells){
        cell.cell.editModeActive = false;
      }
      await this.delay(500);
    }
    for(let cell of this.cells){
      cell.cell.pencilMarksVisible = !cell.cell.pencilMarksVisible;
    }
  }

  /**
     * Provide pseudo-sleep function.
     * @param millis Milliseconds to wait
     * @returns Pseudo-sleep object
   */
  delay(millis: number): Promise<void>{
    return new Promise(resolve => setTimeout(resolve, millis));
  }
}
