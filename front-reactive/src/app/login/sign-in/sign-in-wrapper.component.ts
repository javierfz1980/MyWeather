import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SessionCredentials} from "../../commons/models/session/sessionCredentials";
import {Subscription} from "rxjs/Subscription";
import {Store} from '@ngrx/store';
import {
  SigninForgotSwitchAction,
  SigninRequestedAction, SigninSucceededAction, SignoutRequestedAction
} from '../../commons/store/login/signin-actions';
import {SigninState} from '../../commons/store/login/signin-state';
import {ApplicationState} from '../../commons/store/application-state';
import {AppRoutes} from '../../commons/models/navigation/routing/app-routes';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DeviceState} from '../../commons/store/device/device-state';
import {AuthService} from '../../commons/services/auth.service';
import {LocalStorageService} from '../../commons/services/local-storage.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sign-in-wrapper',
  templateUrl: './sign-in-wrapper.component.html',
  styleUrls: ['./sign-in-wrapper.component.css'],
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
export class SignInWrapperComponent implements OnInit {

  @Input()
  showLabelIcon: boolean = true;

  @ViewChild('dropDownMenu')
  dropDownMenu: ElementRef;

  isMobile$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  showMenu: boolean = true;
  state: SigninState = {
    isBusy: false,
    isLoggedIn: false,
    wrongCredentials: false,
    isForgot: false
  }

  constructor(private store$: Store<ApplicationState>,
              private router: Router,
              private localStorage: LocalStorageService) {

    const credentials: SessionCredentials = JSON.parse(this.localStorage.getItem('credentials'));
    if (credentials) {
      this.store$.dispatch(new SigninRequestedAction(credentials));
    }
  }

  ngOnInit() {
    this.isMobile$ = this.store$
      .select('device')
      .filter(deviceState => deviceState.isMobile !== undefined)
      .map(deviceState => {
        const isOpened: boolean = this.dropDownMenu && this.dropDownMenu.nativeElement.classList.contains('open');
        if (isOpened && deviceState.isMobile) this.showMenu = deviceState.vScrollPosition === 0;
        return deviceState.isMobile;
      });

    this.isLoggedIn$ = this.store$
      .select('signin')
      .filter(signinState => signinState.isLoggedIn !== undefined)
      .map(signinState => {
        this.state = signinState;
        if(signinState.loginRedirect) this.router.navigate([AppRoutes.boards]);
        if(signinState.logoutRedirect) this.router.navigate([AppRoutes.home]);
        return signinState.isLoggedIn;
      });
  }



  // actions
  signin(data: SessionCredentials): void {
    this.store$.dispatch(new SigninRequestedAction(data));
  }

  signout() {
    this.store$.dispatch(new SignoutRequestedAction());
  }

  switchForgot() {
    this.store$.dispatch(new SigninForgotSwitchAction());
  }


}
