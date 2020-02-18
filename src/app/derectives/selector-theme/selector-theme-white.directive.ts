import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSelectorThemeWhite]'
})
export class SelectorThemeWhiteDirective {

  @HostBinding('class') classSelectorTheme: string;

  constructor() {
    this.classSelectorTheme = 'white-theme';
  }
}
