import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {LanguageService} from '../../commons/services/language.service';
import {ApplicationState} from '../../commons/store/application-state';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {DeviceState} from '../../commons/store/device/device-state';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {

  @ViewChild('dropDownMenu')
  dropDownMenu: ElementRef;

  isMobile$: Observable<boolean>;
  showMenu: boolean = true;

  constructor(private store$: Store<ApplicationState>,
              private language:LanguageService) {

    this.isMobile$ = this.store$
      .select('device')
      .filter(deviceState => deviceState.isMobile !== undefined)
      .map(deviceState => {
        const isOpened: boolean = this.dropDownMenu && this.dropDownMenu.nativeElement.classList.contains('open');
        this.showMenu = (isOpened && deviceState.isMobile) ? deviceState.vScrollPosition === 0 : true;
        return deviceState.isMobile;
      });
  }

  changeLang(lang: string): void {
    this.language.translateTo(lang);
  }


}
