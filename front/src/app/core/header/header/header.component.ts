import { Component, OnInit } from '@angular/core';
import {LanguageService} from "../../../shared/services/language.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('FormFadeIn', [
      state('*', style({
        opacity: '1'
      })),
      transition ('void => *', [
        style({
          opacity: '0'
        }),
        animate(300)
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  isCollapsed: boolean = true;
  isForgot: boolean = false;

  constructor(private language:LanguageService) { }

  ngOnInit() {
  }

  changeLang(lang: string): void {
    this.language.translateTo(lang);
  }

}
