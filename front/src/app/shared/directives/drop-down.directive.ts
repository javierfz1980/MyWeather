import {
  Directive, HostBinding, HostListener
} from '@angular/core';

@Directive({
  selector: '[dropDown]'
})
export class DropDownDirective {
  @HostBinding('class.open') isOpen: boolean;

  @HostListener('mouseenter') mouseEnter (event: Event) {
    this.isOpen = true;
  }

  @HostListener('mouseleave') mouseLeave (event: Event) {
    this.isOpen = false;
  }

}
