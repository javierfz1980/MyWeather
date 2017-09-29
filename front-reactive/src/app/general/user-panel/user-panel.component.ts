import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../commons/store/application-state';
import {UserState} from '../../commons/store/user/user-state';
import {User} from '../../commons/models/data/user';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../commons/services/auth.service';
import {DeviceState} from '../../commons/store/device/device-state';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  @Input()
  showLabelIcon: boolean = true;

  @ViewChild('dropDownMenu')
  dropDownMenu: ElementRef;

  userState$: Observable<UserState>;
  isMobile$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  showMenu: boolean = true;

  constructor(private store$: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.isMobile$ = this.store$
      .select('device')
      .filter(deviceState => deviceState.isMobile !== undefined)
      .map(deviceState => {
        const isOpened: boolean = this.dropDownMenu && this.dropDownMenu.nativeElement.classList.contains('open');
        this.showMenu = (isOpened && deviceState.isMobile) ? deviceState.vScrollPosition === 0 : true;
        return deviceState.isMobile;
      });

    this.userState$ = this.store$
      .select('user')
      .filter(userState => userState.user !== undefined)

    this.isLoggedIn$ = this.store$
      .select('signin')
      .filter(signinState => signinState.isLoggedIn !== undefined)
      .map(signinState => signinState.isLoggedIn);
  }


}
