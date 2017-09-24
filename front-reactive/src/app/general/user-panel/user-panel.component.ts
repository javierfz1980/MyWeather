import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../commons/store/application-state';
import {UserState} from '../../commons/store/user/user-state';
import {User} from '../../commons/models/data/user';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../commons/services/auth.service';
import {DeviceState} from '../../commons/store/device/device-state';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit, OnDestroy {

  @Input()
  showLabelIcon: boolean = true;

  @ViewChild('dropDownMenu')
  dropDownMenu: ElementRef;

  showMenu: boolean = true;
  isMobile: boolean;
  isLoggedIn: boolean = false;
  user: User;
  private subscriptions: Subscription[] = [];

  constructor(private store$: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store$
        .select('device')
        .filter(deviceState => deviceState.isMobile !== undefined)
        .subscribe(deviceState => this.refreshMobileLayout(deviceState))
    );

    this.subscriptions.push(
      this.store$
        .select('user')
        .skip(1)
        .do((state: UserState) => console.log("do: ",state)) // debug
        .subscribe((state: UserState) => this.refreshInternalState(state))
    );
  }

  refreshInternalState(state: UserState) {
    this.user = state.user;
    this.isLoggedIn = state.user !== undefined;
  }

  refreshMobileLayout(state: DeviceState) {
    console.log(state)
    this.isMobile = state.isMobile;
    this.showMenu = true;
    const isOpened: boolean = this.dropDownMenu && this.dropDownMenu.nativeElement.classList.contains('open');
    if (isOpened && this.isMobile) this.showMenu = state.vScrollPosition === 0;
  }

  // destroy
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
