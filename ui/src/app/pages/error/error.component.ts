import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  context!:string;

  constructor(public themeService: ThemeService){}

  ngOnInit(): void {
    this.context = window.location.pathname;
  }
}
