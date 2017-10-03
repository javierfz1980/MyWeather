import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpService} from '../../services/http.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {
  SigninActions, SigninRequestedAction, SigninFailedtAction,
  SignoutSucceededAction, SigninSucceededAction, SignoutRequestedAction
} from './signin-actions';
import {SessionCredentials} from '../../models/session/sessionCredentials';
import {CustomResponse} from '../../models/http/CustomResponse';
import {DeleteUserAction, GetUserInfoAction} from '../user/user-actions';
import {StopPollingAction} from '../polling/polling-actions';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from "@angular/router";
import {AppRoutes} from "../../models/navigation/routing/app-routes";

@Injectable()
export class SigningEffects {

  constructor(private actions$: Actions,
              private httpService: HttpService,
              private authService: AuthService,
              private localStorageService: LocalStorageService,
              private router: Router) {

  }

  @Effect()
  private signinAction$: Observable<Action> = this.actions$
    .ofType(SigninActions.SIGNIN_REQUESTED)
    .switchMap((action: SigninRequestedAction) => this.httpService
      .requestApi(HttpService.SESSION_PATH + 'signin', HttpService.POST, action.payload/*, this.createAuthHeaders(action.payload)*/)
      .map((response: CustomResponse) => {
        const sessionCredentials: SessionCredentials = action.payload;
        this.authService.setToken(response.headers.get('Authorization'), sessionCredentials.email);
        this.localStorageService.setItem('credentials', JSON.stringify(sessionCredentials));
        return new SigninSucceededAction(sessionCredentials.email);//,
      })
      .catch((error: CustomResponse) => Observable.of(new SigninFailedtAction(error)))
    );


  @Effect()
  private signinSucceedAction$: Observable<Action> = this.actions$
    .ofType(SigninActions.SIGNIN_SUCCEEDED)
    .do(()=> this.router.navigate([AppRoutes.boards]))
    .map(action => new GetUserInfoAction((<SigninSucceededAction>action).payload))


  @Effect()
  private signoutAction$: Observable<Action> = this.actions$
    .ofType(SigninActions.SIGNOUT_REQUESTED)
    .switchMap((action: SignoutRequestedAction) => {
      return this.httpService.requestApi(HttpService.SESSION_PATH + 'signout', HttpService.POST)
        .map(response => new SignoutSucceededAction())
        .catch(error => Observable.throw(error));
    });

  @Effect()
  private signoutSucceedAction$: Observable<Action> = this.actions$
    .ofType(SigninActions.SIGNOUT_SUCCEEDED)
    .do(()=> this.router.navigate([AppRoutes.home]))
    .switchMap((action: SignoutSucceededAction) => {
      const actions: Action[] = [
        new DeleteUserAction(),
        new StopPollingAction()
      ];
      this.authService.deleteToken();
      this.localStorageService.removeItem('credentials');
      return Observable.of(...actions);
    });

}
