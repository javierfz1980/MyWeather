import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SessionCredentials} from "../models/sessionCredentials";
import {Subscription} from "rxjs/Subscription";
import {Store} from '@ngrx/store';
import {
  SigninForgotSwitchAction,
  SigninRequestedAction, SignoutRequestedAction
} from '../../commons/store/login/signin-actions';
import {SigninState} from '../../commons/store/login/signin-state';
import {ApplicationState} from '../../commons/store/application-state';
import {AppRoutes} from '../../commons/models/navigation/routing/app-routes';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  isForgot: boolean = false;
  isLoggedIn: boolean = false;
  wrongCredentials: boolean = false;
  isLoading: boolean = false;
  private subscription: Subscription;

  constructor(private store$: Store<ApplicationState>,
              private router: Router) { }


  ngOnInit() {
    this.subscription = this.store$
      .select('signin')
      .skip(1)
      .subscribe((state: SigninState) => this.refreshInternalState(state))
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
    if (this.subscription) this.subscription.unsubscribe();
  }

}
