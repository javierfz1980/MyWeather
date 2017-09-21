import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dahsboard.component';
import { WeathersComponent} from './weathers/weathers.component';
import { DashboardRouting} from "./dashboard-routing.module";
import { ForecastComponent } from './weathers/weather/forecast/forecast.component';
import { WeatherComponent} from "./weathers/weather/weather.component";
import {ResponsiveModule} from 'ng2-responsive';

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    ResponsiveModule
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
