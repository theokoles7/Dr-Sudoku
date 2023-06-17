import { Component, ViewChild } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Puzzle } from 'src/app/classes/puzzle';
import { GridComponent } from 'src/app/components/grid/grid.component';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent {
  @ViewChild(GridComponent) grid!: GridComponent;

  puzzle: Puzzle = new Puzzle([
    [0, 1, 3, 0, 0, 1, 0, 0, 6],
    [0, 0, 0, 0, 0, 0, 0, 2, 4],
    [0, 5, 0, 8, 0, 0, 0, 7, 0],
    [0, 0, 0, 9, 0, 8, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 5, 0],
    [0, 0, 0, 6, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 9, 0, 2],
    [7, 0, 6, 0, 3, 0, 8, 0, 0],
    [0, 0, 1, 0, 2, 0, 0, 0, 0]
  ]);

  constructor(public themeService: ThemeService){}
}
