import { Component, Input } from '@angular/core';
import { Puzzle } from 'src/app/classes/puzzle';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() puzzle!: Puzzle;

  constructor(public themeService: ThemeService){}
}
