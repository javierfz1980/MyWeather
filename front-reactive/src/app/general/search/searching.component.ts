import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../commons/services/auth.service';
import {Weather} from '../../commons/models/data/weather';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../commons/store/application-state';
import {
  AddWeatherRequested,
  RemoveWeatherRequested
} from '../../commons/store/dashboards/dashboards-actions';
import {SearchRequest} from '../../commons/store/search/search-actions';
import {SearchState} from '../../commons/store/search/search-state';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit, OnDestroy {

  @ViewChild('inputSearch')
  inputSearch: ElementRef;

  internalState: SearchState = {
    isLoading: false,
    showResults: false,
    results: []
  }

  private subscriptions: Subscription[] = [];
  private isAuthorized$: Observable<boolean>;
  private weathersOnCurrentDashboard$: Observable<Weather[]>

  constructor(private store$: Store<ApplicationState>,
              private authService: AuthService){
  }

  ngOnInit() {
    this.subscriptions.push(this.searchSubscription());
    this.subscriptions.push(this.storeSubscription());

    this.isAuthorized$ = this.authService.isAuthorized$();
    this.weathersOnCurrentDashboard$ = this.store$
      .select('dashboards')
      .map(state => state.dashboards[state.currentDashboard].weathers)
  }

  private searchSubscription(): Subscription {
    return Observable
      .fromEvent(this.inputSearch.nativeElement, "keyup")
      .debounceTime(250)
      .map((event: KeyboardEvent) => event.target['value'])
      .distinctUntilChanged()
      .subscribe((str) => this.store$.dispatch(new SearchRequest(str)));
  }

  private storeSubscription(): Subscription {
    return this.store$
      .select('search')
      .skip(1)
      .filter((state: SearchState) => state != undefined)
      .subscribe((state: SearchState) => this.refreshInternalView(state));
  }

  private refreshInternalView(state: SearchState) {
    this.internalState = state;
  }



  // add / remove

  removeFromDashboard(weather: Weather) {
    this.store$.dispatch(new RemoveWeatherRequested(weather.id));
  }

  addToDashboard(weather: Weather) {
    this.store$.dispatch(new AddWeatherRequested(weather));
  }



  trackByWeatherId(index, item: Weather): string {
    return item.id;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
