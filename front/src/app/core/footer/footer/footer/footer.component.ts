import { Component, OnInit } from '@angular/core';
import {LanguageService} from "../../../../shared/services/language.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private language:LanguageService) { }

  ngOnInit() {
  }

  changeLang(lang: string): void {
    this.language.translateTo(lang);
  }

}
