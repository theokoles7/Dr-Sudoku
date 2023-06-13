import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
  active_algo: string = 'backtrack';

  constructor(public themeService: ThemeService){}

  setAlgo(algo: string):void{
    this.active_algo = algo;
  }
}
