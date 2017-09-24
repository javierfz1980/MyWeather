import {Component, HostListener, OnInit} from '@angular/core';
import {LanguageService} from '../../commons/services/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {

  isMobile: boolean = false;

  constructor(private language:LanguageService) {}


  changeLang(lang: string): void {
    this.language.translateTo(lang);
  }

  // TODO: Improve/change this behavior.
  @HostListener('window:scroll', ['$event'])
  autoHideDropDownOnMobiles(event?) {
    /*this.showDropDown = (window.pageYOffset === 0 && window.screen.width < 768) ||
      (window.screen.width >= 768);*/
  }

}
