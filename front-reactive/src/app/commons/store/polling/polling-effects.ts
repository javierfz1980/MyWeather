import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpService} from '../../services/http.service';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {
  PollingActions, PollingFailedAction, PollingRequestAction,
  PollingSuccedAction
} from './polling-actions';
import {ApplicationState} from '../application-state';
import {CustomResponse} from '../../models/http/CustomResponse';
import {RefreshDashboards} from '../dashboards/dashboards-actions';

@Injectable()
export class PollingEffect {

  constructor(private actions$: Actions,
              private store$: Store<ApplicationState>,
              private httpService: HttpService) {}

  @Effect()
  private startPollingAction$: Observable<Action> = this.actions$
    .ofType(PollingActions.START_POLLING)
    .switchMap(() => {
      return Observable.interval(5 * 60 * 1000)
        .map(() => new PollingRequestAction())
    })

  @Effect()
  private pollingRequestAction$: Observable<Action> = this.actions$
    .ofType(PollingActions.POLLING_REQUEST)
    .withLatestFrom(this.store$.select('user'))
    .switchMap(([action, userState]) => {
      // console.log("polling dashboards");
      const url: string = HttpService.USER_PATH + "/" + userState.user.id + "/dashboards";
      return this.httpService.requestApi(url, HttpService.GET)
        .mergeMap((response: CustomResponse) => {
          const actions: Action[] = [
            new PollingSuccedAction(),
            new RefreshDashboards(response.data)
          ];
          // console.log("dashboards retrieved");
          return Observable.of(...actions);
        })
        .catch((error: CustomResponse) => Observable.of(new PollingFailedAction()))
      //return Observable.of(new PollingSuccedAction())
    })
}
