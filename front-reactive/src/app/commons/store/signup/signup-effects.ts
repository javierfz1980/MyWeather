import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {
  EditUserFailed, EditUserSucceed, SignupActions, SignupFailed, SignupRequest,
  SignupSucceed
} from './signup-actions';
import {HttpService} from '../../services/http.service';
import {ApplicationState} from '../application-state';
import {User} from '../../models/data/user';

@Injectable()
export class SignupEffects {

  constructor(private actions$: Actions,
              private store$: Store<ApplicationState>,
              private httpService: HttpService){}

  @Effect()
  private signupAction$: Observable<Action> = this.actions$
    .ofType(SignupActions.SIGNUP_REQUEST)
    .switchMap((action: SignupRequest) => {
      return this.httpService.requestApi(HttpService.SESSION_PATH + "signup", HttpService.POST, (<SignupRequest>action).payload)
        .map(response => new SignupSucceed(response.data))
        .catch(error => Observable.of(new SignupFailed(error)))
    })

  @Effect()
  private editUserAction$: Observable<Action> = this.actions$
    .ofType(SignupActions.EDIT_USER_REUQEST)
    .withLatestFrom(this.store$.select('user'))
    .withLatestFrom(this.store$.select('dashboards'))
    .switchMap(([[action , userState], dashboardsState]) => {
      const user: User = (<SignupRequest>action).payload;
      user.id = userState.user.id;
      user.dashboards = dashboardsState.dashboards;
      const url = HttpService.USER_PATH + "/" + user.id;
      return this.httpService.requestApi(url, HttpService.PUT, user)
        .map(response => new EditUserSucceed(response.data))
        .catch(error => Observable.of(new EditUserFailed(error)))
    })
}
