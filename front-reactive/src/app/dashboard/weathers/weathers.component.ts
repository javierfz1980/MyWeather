import {Component, Input} from '@angular/core';
import {Weather} from "../../commons/models/data/weather";
import {Dashboard} from '../../commons/models/data/dashboard';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../commons/store/application-state';
import {RemoveWeatherRequested} from '../../commons/store/dashboards/dashboards-actions';

@Component({
  selector: 'app-weathers',
  templateUrl: './weathers.component.html',
  styleUrls: ['./weathers.component.css']
})
export class WeathersComponent {

  @Input('currentDashboard')
  private currentDashboard: Dashboard;

  constructor(private store$: Store<ApplicationState>) { }


  trackByWeatherId(index: number, weather: Weather): string {
    return weather.id;
  }

  removeWeatherById(weatherId: string) {
    this.store$.dispatch(new RemoveWeatherRequested(weatherId));
  }

}
