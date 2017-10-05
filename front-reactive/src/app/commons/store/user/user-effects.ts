import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {CreateUserAction, GetUserInfoAction, UserActions} from './user-actions';
import {User} from '../../models/data/user';
import {HttpService} from '../../services/http.service';
import {CustomResponse} from '../../models/http/CustomResponse';
import {LoadDashboardsSucceed} from '../dashboards/dashboards-actions';
import {StartPollingAction} from '../polling/polling-actions';
import {AppRoutes} from "../../models/navigation/routing/app-routes";
import {Router} from "@angular/router";

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private httpService: HttpService,
              private router: Router) {}

  @Effect()
  private getUserInfoAction$: Observable<Action> = this.actions$
    .ofType(UserActions.GET_USER_INFO)
    .switchMap((action:GetUserInfoAction) => {
      const email: string = action.payload;
      return this.httpService.requestApi(HttpService.USER_PATH + email, HttpService.GET)
        .mergeMap((response: CustomResponse) => {
          const user: User = response.data;
          const actions: Action[] = [
            new CreateUserAction(user),
            new LoadDashboardsSucceed(user.dashboards),
            new StartPollingAction()
          ];
          const currentRoute: string = this.router.url;
          const destination: string = (currentRoute === '/') ? AppRoutes.boards + user.dashboards[0].id : currentRoute;
          this.router.navigate([destination]);
          return Observable.of(...actions);
        })
        .catch((error: CustomResponse) => Observable.of(error))
    })

}
