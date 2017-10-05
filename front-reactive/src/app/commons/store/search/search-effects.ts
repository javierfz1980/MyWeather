import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpService} from '../../services/http.service';
import {ApplicationState} from '../application-state';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {SearchActions, SearchRequest, SearchSucceed} from './search-actions';
import {CustomResponse} from '../../models/http/CustomResponse';
import {Weather} from '../../models/data/weather';

@Injectable()
export class SearchEffects {

  constructor(private actions$: Actions,
              private store$: Store<ApplicationState>,
              private httpService: HttpService){
  }

  // 3rd attempt
  @Effect()
  private searchrequestAction$: Observable<Action> = this.actions$
    .ofType(SearchActions.SEARCH_REQUEST)
    .switchMap((action: SearchRequest) => {
      return this.httpService
        .requestApi(HttpService.WEATHER_PATH, HttpService.POST, action.payload)
        .map((response: CustomResponse) => new SearchSucceed(response.data))
        .catch((error: CustomResponse) => Observable.of(error))
    })

  // 2nd attempt
  /*
  @Effect()
  private searchrequestAction$: Observable<Action> = this.actions$
    .ofType(SearchActions.SEARCH_REQUEST)
    .switchMap((action: SearchRequest) => {
      return this.httpService
        .requestApi(HttpService.WEATHER_PATH, HttpService.POST, action.payload)
        .withLatestFrom(this.store$.select('dashboards'))
        .flatMap(([response, dashboardsState]) => {
          return response.data
            .map((weather: Weather) => {
              const newWeather: WeatherSearchResult = {isOnCurrentDashboard: false, weather: weather};
              if(dashboardsState.dashboards) {
                const weathersOnCurrentDashboard: string[] = dashboardsState.dashboards[dashboardsState.currentDashboard].weathers.map(weather => weather.id);
                if(weathersOnCurrentDashboard.indexOf(weather.id) >= 0) newWeather.isOnCurrentDashboard = true;
              }
              return newWeather;
            })
        })
        .toArray()
    })
    .do((data) => // console.log("1 **************", data))
    .map((data:WeatherSearchResult[]) => new SearchSucceed(data))*/

  // 1st attempt
  /*@Effect()
  private searchrequestAction$: Observable<Action> = this.actions$
    .ofType(SearchActions.SEARCH_REQUEST)
    .switchMap((action: SearchRequest) => {
      return this.httpService
        .requestApi(HttpService.WEATHER_PATH, HttpService.POST, action.payload)
        .flatMap((response: CustomResponse) => {
          return response.data.map((weather: Weather) => {
            let newWeather: WeatherSearchResult = {isOnCurrentDashboard: false, weather: weather};
            if(["28407413"].indexOf(weather.id) >= 0) newWeather.isOnCurrentDashboard = true;
            return newWeather;
          })
        })
        .toArray()
    })
    .do((data) => // console.log("1 **************", data))
    .map((data:WeatherSearchResult[]) => new SearchSucceed(data))*/

}
