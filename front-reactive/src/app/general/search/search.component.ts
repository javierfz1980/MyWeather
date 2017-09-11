import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Weather} from "../../commons/models/data/weather";
import {Observable, Subscription} from "rxjs";
import {CustomResponse} from "../../commons/models/http/CustomResponse";
import {HttpService} from '../../commons/services/http.service';
import {ApplicationState} from '../../commons/store/application-state';
import {Store} from '@ngrx/store';
import {
  AddWeatherRequested,
  RemoveWeatherRequested
} from '../../commons/store/dashboards/dashboards-actions';
import {AuthService} from '../../commons/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild('inputSearch')
  inputSearch: ElementRef;

  @ViewChild('container')
  container: ElementRef;

  private showSubMenu: boolean = false;
  private isLoading: boolean;
  private searchResults: Weather[] = [];
  private isAuthorized$: Observable<boolean>;
  private subscriptions: Subscription[] = [];

  constructor(private store$: Store<ApplicationState>,
              private httpService: HttpService,
              private authService: AuthService){}

  ngOnInit() {
    this.subscriptions.push(this.searchSubscription());
    this.subscriptions.push(...this.submenuSubscription());
    this.isAuthorized$ = this.authService.isAuthorized$();
  }

  private searchSubscription(): Subscription {
    return Observable
      .fromEvent(this.inputSearch.nativeElement, "keyup")
      .debounceTime(500)
      .map((event: KeyboardEvent) => event.target['value'])
      .distinctUntilChanged()
      .switchMap((str) => {
        this.isLoading = true;
        return this.httpService
          .requestApi(HttpService.WEATHER_PATH, HttpService.POST, str)
          .map((response: CustomResponse) => {
            this.isLoading = false;
            this.searchResults = response.data;
            console.log("0000000000")
          })
      })
      .catch((error: CustomResponse) => Observable.of(error))
      .subscribe();
  }

  private submenuSubscription(): Subscription[] {
    return [
    Observable.fromEvent(this.container.nativeElement, 'click')
      .subscribe(() => this.showSubMenu = true)
    ,
    Observable.fromEvent(this.container.nativeElement, 'mouseleave')
      .subscribe(() => {
        this.inputSearch.nativeElement.blur();
        this.showSubMenu = false;
      })
    ]
  }

  showResults(): boolean {
    return this.showSubMenu && !this.isLoading;
  }

  weatherIsOnCurrentDashboard(weather: Weather, event): boolean {
    console.log("11111111", event,  this.searchResults);
    let res: boolean = false;
    //this.subscriptions.push(
      this.store$
        .select('dashboards')
        .take(1)
        .flatMap(state => state.dashboards[state.currentDashboard].weathers)
        .filter(stateWeather => stateWeather.id === weather.id)
        .do(data => {
          console.log("22222222", data)
        })
        .subscribe(() => res = true)
        .unsubscribe();
    //);
    console.log("---------------------------");
    return res;
  }

  trackByWeatherId(index, item: Weather): string {
    console.log("trackby:", index);
    return item.id;
  }

  // add / remove

  removeFromDashboard(weather: Weather) {
    this.store$.dispatch(new RemoveWeatherRequested(weather.id));
  }

  addToDashboard(weather?: Weather) {
    this.store$.dispatch(new AddWeatherRequested(weather));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
