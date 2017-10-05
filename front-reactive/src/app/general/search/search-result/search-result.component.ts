import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Weather} from '../../../commons/models/data/weather';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResult implements OnInit{

  @Input()
  weather: Weather;

  @Input()
  isAuthorized: Observable<boolean>;

  @Input()
  weathersOnCurrentDashboard: Observable<Weather[]>;

  @Output('addClick')
  addToCurrentDashboardEvent: EventEmitter<Weather> = new EventEmitter();

  @Output('removeClick')
  removeFromCurrentDashboardEvent: EventEmitter<Weather> = new EventEmitter();

  private isInCurrentStore$: Observable<boolean>;

  ngOnInit() {
    this.isInCurrentStore$ = this.weathersOnCurrentDashboard
      .switchMap((weathers: Weather[]) => {
          const weathersId: string[] = weathers.map(weather => weather.id);
          const res: boolean = weathersId.indexOf(this.weather.id) >= 0;
          return Observable.of(res);
      })
  }

  addToDashboard(weather: Weather) {
    this.addToCurrentDashboardEvent.emit(weather);
  }

  removeFromDashboard(weather: Weather) {
    this.removeFromCurrentDashboardEvent.emit(weather);
  }
}
