import {Component} from '@angular/core';
import {LanguageService} from '../../commons/services/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {

  constructor(private language:LanguageService) {}

  changeLang(lang: string): void {
    this.language.translateTo(lang);
  }

}
