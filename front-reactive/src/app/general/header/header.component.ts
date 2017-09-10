import { Component, OnInit } from '@angular/core';
import {LanguageService} from "../../commons/services/language.service";
import {AuthService} from "../../commons/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(private language:LanguageService, private authService: AuthService) { }

  ngOnInit() {
  }

  changeLang(lang: string): void {
    this.language.translateTo(lang);
  }

  isAuthorized(): boolean {
    return this.authService.isAuthorized();
  }

}
