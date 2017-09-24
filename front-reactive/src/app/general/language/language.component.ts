import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {LanguageService} from '../../commons/services/language.service';
import {ApplicationState} from '../../commons/store/application-state';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {DeviceState} from '../../commons/store/device/device-state';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnDestroy{

  @ViewChild('dropDownMenu')
  dropDownMenu: ElementRef;

  showMenu: boolean = true;
  isMobile: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private store$: Store<ApplicationState>,
              private language:LanguageService) {

    this.subscriptions.push(
      this.store$
        .select('device')
        .filter(deviceState => deviceState.isMobile !== undefined)
        .subscribe(deviceState => this.refreshMobileLayout(deviceState))
    );
  }

  refreshMobileLayout(state: DeviceState) {
    this.isMobile = state.isMobile;
    this.showMenu = true;
    const isOpened: boolean = this.dropDownMenu && this.dropDownMenu.nativeElement.classList.contains('open');
    if (isOpened && this.isMobile) this.showMenu = state.vScrollPosition === 0;
  }


  changeLang(lang: string): void {
    this.language.translateTo(lang);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
