import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class LanguageService {

  constructor(private translate:TranslateService) {}

  translateTo(lang: string): void {
    this.translate.use(lang);
  }
}
