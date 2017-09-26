import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SessionCredentials} from "../models/sessionCredentials";
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
export class SignInWrapperComponent implements OnInit, OnDestroy {

  @Input()
  showLabelIcon: boolean = true;

  @ViewChild('dropDownMenu')
  dropDownMenu: ElementRef;

  showMenu: boolean = true;
  isMobile: boolean;
  isForgot: boolean = false;
  isLoggedIn: boolean = false;
  wrongCredentials: boolean = false;
  isLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private store$: Store<ApplicationState>,
              private router: Router,
              private localStorage: LocalStorageService) {

    const credentials: SessionCredentials = JSON.parse(this.localStorage.getItem('credentials'));
    if (credentials) {
      this.store$.dispatch(new SigninRequestedAction(credentials));
    }
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
        .select('signin')
        .filter(signinState => signinState.isLoggedIn !== undefined)
        .subscribe((state: SigninState) => this.refreshInternalState(state))
    )
  }

  refreshInternalState(state: SigninState) {
    console.log('signin state:',state);
    let signinSucceed: boolean = !this.isLoggedIn && state.isLoggedIn;
    let signoutSucced: boolean = this.isLoggedIn && !state.isLoggedIn;
    this.wrongCredentials = state.wrongCredentials;
    this.isForgot = state.isForgot;
    this.isLoggedIn = state.isLoggedIn;
    this.isLoading = state.isBusy;
    if(signinSucceed) this.router.navigate([AppRoutes.boards]);
    if(signoutSucced) this.router.navigate([AppRoutes.home]);
  }

  refreshMobileLayout(state: DeviceState) {
    this.isMobile = state.isMobile;
    this.showMenu = true;
    const isOpened: boolean = this.dropDownMenu && this.dropDownMenu.nativeElement.classList.contains('open');
    if (isOpened && this.isMobile) this.showMenu = state.vScrollPosition === 0;
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

  // destroy
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
