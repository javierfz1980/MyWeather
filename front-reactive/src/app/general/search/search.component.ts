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

  @ViewChild('input')
  input: ElementRef;

  private isFocus: boolean = false;
  private keepMenuOpen: boolean = false;
  private isLoading: boolean;
  private subscriptions: Subscription[] = [];
  private searchResults: Weather[] = [];
  private isAuthorized$: Observable<boolean>;

  constructor(private store$: Store<ApplicationState>,
              private httpService: HttpService,
              private authService: AuthService){}

  ngOnInit() {
    this.subscriptions.push(this.search());
    this.isAuthorized$ = this.authService.isAuthorized$();
  }

  private search(): Subscription {
    return Observable
      .fromEvent(this.input.nativeElement, "keyup")
      .debounceTime(100)
      .map((event: KeyboardEvent) => event.target['value'])
      .distinctUntilChanged()
      .switchMap((str) => {
        this.isLoading = true;
        return this.httpService
          .requestApi(HttpService.WEATHER_PATH, HttpService.POST, str)
          .map((response: CustomResponse) => {
            this.isLoading = false;
            this.searchResults = response.data
          })
      })
      .catch((error: CustomResponse) => Observable.of(error))
      .subscribe();
  }

  weatherIsOnCurrentDashboard(weather: Weather): boolean {
    let res: boolean = false;
    this.subscriptions.push(
      this.store$
        .select('dashboards')
        .map(state => {
          return state.dashboards[state.currentDashboard].weathers
            .filter(stateWeather => stateWeather.id === weather.id)
            .map(weather => res = weather.id.length > 0)
        })
        .subscribe()
    );
    return res;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  // add / remove

  removeFromDashboard(weather: Weather) {
    this.store$.dispatch(new RemoveWeatherRequested(weather.id));
  }

  addToDashboard(weather: Weather) {
    this.store$.dispatch(new AddWeatherRequested(weather));
  }


  // Show / Hide menu helpers...

  closeSubMenu(): void{
    setTimeout(() => {
        if(this.isFocus && !this.keepMenuOpen) {
          this.input.nativeElement.blur();
          this.isFocus = false;
        }
      }, 50
    );
  }

  openSubMenu() {
    this.isFocus = true;
  }

  mouseOver() {
    this.keepMenuOpen = true;
  }

  mouseOut() {
    this.keepMenuOpen = false;
    this.closeSubMenu();
  }

}
