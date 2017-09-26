import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {
  AddWeatherFailed,
  AddWeatherRequested, AddWeatherSucceed,
  DashboardActions, RemoveWeatherFailed,
  RemoveWeatherRequested, RemoveWeatherSucceed
} from './dashboards-actions';
import {HttpService} from '../../services/http.service';
import {CustomResponse} from '../../models/http/CustomResponse';
import {ApplicationState} from '../application-state';

@Injectable()
export class DashboardsEffects {

  constructor(private actions$: Actions,
              private store$: Store<ApplicationState>,
              private httpService: HttpService) {}

  /*@Effect()
  private loadDashboardsAction$: Observable<Action> = this.actions$
    .ofType(DashboardActions.LOAD_DASHBOARDS_SUCCEED)
    .switchMap((action: LoadDashboardsSucceed) => Observable.of(new LoadDashboardsSucceed(action.payload)))*/

  @Effect()
  private addWeatherAction$: Observable<Action> = this.actions$
    .ofType(DashboardActions.ADD_WEATHER_REQUEST)
    .withLatestFrom(this.store$.select('user'))
    .withLatestFrom(this.store$.select('dashboards'))
    .switchMap(([[action , userState], dashboardsState]) => {
      const url: string = HttpService.USER_PATH + userState.user.id + "/dashboards/" +
                          dashboardsState.dashboards[dashboardsState.currentDashboard].id + "/weathers";
      return this.httpService.requestApi(url, HttpService.POST, (<AddWeatherRequested>action).payload)
        .map(response => new AddWeatherSucceed(response))
        .catch(error => Observable.of(new AddWeatherFailed(error)))
    })


  @Effect()
  private removeWeatherAction$: Observable<Action> = this.actions$
    .ofType(DashboardActions.REMOVE_WEATHER_REQUEST)
    .withLatestFrom(this.store$.select('user'))
    .withLatestFrom(this.store$.select('dashboards'))
    .switchMap(([[action , userState], dashboardsState]) => {
      const url: string = HttpService.USER_PATH + userState.user.id + "/dashboards/" +
                          dashboardsState.dashboards[dashboardsState.currentDashboard].id + "/weathers/" +
                          (<RemoveWeatherRequested>action).payload;
      return this.httpService
        .requestApi(url, HttpService.DELETE)
        .map((response: CustomResponse) => new RemoveWeatherSucceed(response))
        .catch((error: CustomResponse) => Observable.of(new RemoveWeatherFailed(error)))
    })


}
