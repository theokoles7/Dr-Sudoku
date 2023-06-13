import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme:string = 'dark';
  themeChanged: EventEmitter<string> = new EventEmitter;

  constructor() { }

  getTheme():string{return this.theme;}

  setTheme(theme: string):void{
    this.theme = theme;}
}