import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[dropDownClick]'
})
export class DropDownClickDirective {
  @HostBinding('class.open') isOpen: boolean = false

  constructor() { }

  @HostListener('click') onToogle() {
    this.isOpen = !this.isOpen;
  }
}
