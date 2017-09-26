import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpService} from '../../services/http.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {
  SigninActions, SigninRequestedAction, SigninFailedtAction,
  SignoutSucceededAction, SigninSucceededAction, SignoutRequestedAction
} from './signin-actions';
import {SessionCredentials} from '../../../login/models/sessionCredentials';
import {CustomResponse} from '../../models/http/CustomResponse';
import {DeleteUserAction, GetUserInfoAction} from '../user/user-actions';
import {StopPollingAction} from '../polling/polling-actions';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class SigningEffects {

  constructor(private actions$: Actions,
              private httpService: HttpService,
              private authService: AuthService) {

  }

  @Effect()
  private signinAction$: Observable<Action> = this.actions$
    .ofType(SigninActions.SIGNIN_REQUESTED)
    .switchMap((action: SigninRequestedAction) => this.httpService
      .requestApi(HttpService.SESSION_PATH + 'signin', HttpService.POST, action.payload/*, this.createAuthHeaders(action.payload)*/)
      .map((response: CustomResponse) => {
        const sessionCredentials: SessionCredentials = action.payload;
        this.authService.saveToken(response.headers.get('Authorization'), sessionCredentials.email);
        return new SigninSucceededAction(sessionCredentials.email);//,
      })
      .catch((error: CustomResponse) => Observable.of(new SigninFailedtAction(error)))
    );


  @Effect()
  private signinSucceedAction$: Observable<Action> = this.actions$
    .ofType(SigninActions.SIGNIN_SUCCEEDED)
    .map(action => new GetUserInfoAction((<SigninSucceededAction>action).payload))


  @Effect()
  private signoutAction$: Observable<Action> = this.actions$
    .ofType(SigninActions.SIGNOUT_REQUESTED)
    .switchMap((action: SignoutRequestedAction) => {
      const actions: Action[] = [
        new SignoutSucceededAction(),
        new DeleteUserAction(),
        new StopPollingAction()
      ];
      this.authService.deleteToken();
      return Observable.of(...actions);
    });

}
