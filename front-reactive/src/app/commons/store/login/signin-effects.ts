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
import {Headers} from '@angular/http';
import {CreateUserAction, DeleteUserAction} from '../user/user-actions';
import {User} from '../../models/data/user';
import {LoadDashboardsSucceed} from '../dashboards/dashboards-actions';

@Injectable()
export class SigningEffects {

  constructor(private actions$: Actions,
              private httpService: HttpService) {

  }

  @Effect()
  private signinAction$: Observable<Action> = this.actions$
    .ofType(SigninActions.SIGNIN_REQUESTED)
    .switchMap((action: SigninRequestedAction) => this.httpService
      .requestApi(HttpService.SESSION_PATH, HttpService.POST, action.payload, this.createAuthHeaders(action.payload))
      //.map((response) => new SigninSucceededAction(response))
      .mergeMap((response: CustomResponse) => {
        const user: User = response.data;
        const actions: Action[] = [
          new SigninSucceededAction(response),
          new CreateUserAction(user),
          new LoadDashboardsSucceed(user.dashboards)
        ]
        return Observable.of(...actions);
      })
      .catch((error: CustomResponse) => Observable.of(new SigninFailedtAction(error)))
    );

  @Effect()
  private signoutAction$: Observable<Action> = this.actions$
    .ofType(SigninActions.SIGNOUT_REQUESTED)
    /*.switchMap(() => {
      return Observable.of(new SignoutSucceededAction())
    })*/
    .switchMap((action: SignoutRequestedAction) => {
      const actions: Action[] = [
        new SignoutSucceededAction(),
        new DeleteUserAction()
      ];
      return Observable.of(...actions);
    });



  /**
   *
   * @param data
   * @returns {Headers}
   */
  private createAuthHeaders(data: SessionCredentials): Headers{
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", "Basic " + btoa(data.email + ":" + data.password));
    return headers;
  }
}
