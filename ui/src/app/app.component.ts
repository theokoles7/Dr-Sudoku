import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Dr. Sudoku';

  constructor(private elementRef: ElementRef, public themeService: ThemeService){}

  ngAfterViewInit(){
    window.setTimeout((_: any) => {
      const savedTheme = localStorage.getItem('theme');
      if(savedTheme){
        this.setTheme(savedTheme);
      }
    });
  }

  setTheme(theme: string): void{
    this.themeService.setTheme(theme);
    localStorage.setItem('theme', theme);

    if(theme == 'lite'){
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#EEE';
    }else{
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#111';
    }
  }
}
