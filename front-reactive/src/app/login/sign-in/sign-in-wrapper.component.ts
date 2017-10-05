import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SessionCredentials} from "../../commons/models/session/sessionCredentials";
import {Store} from '@ngrx/store';
import {
  SigninForgotSwitchAction,
  SigninRequestedAction, SignoutRequestedAction
} from '../../commons/store/login/signin-actions';
import {SigninState} from '../../commons/store/login/signin-state';
import {ApplicationState} from '../../commons/store/application-state';
import {animate, state, style, transition, trigger} from '@angular/animations';
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

  state$: Observable<SigninState>;
  isMobile$: Observable<boolean>;
  showMenu: boolean = true;

  constructor(private store$: Store<ApplicationState>,
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
        this.showMenu = (isOpened && deviceState.isMobile) ? deviceState.vScrollPosition === 0 : true;
        return deviceState.isMobile;
      });

    this.state$ = this.store$
      .select('signin')
      .filter(signinState => signinState.isLoggedIn !== undefined);
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
