import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dahsboard.component';
import { WeathersComponent} from './weathers/weathers.component';
import { DashboardRouting} from "./dashboard-routing.module";
import { ForecastComponent } from './weathers/weather/forecast/forecast.component';
import { WeatherComponent} from "./weathers/weather/weather.component";

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting
  ],
  declarations: [
    DashboardComponent,
    WeathersComponent,
    WeatherComponent,
    ForecastComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
