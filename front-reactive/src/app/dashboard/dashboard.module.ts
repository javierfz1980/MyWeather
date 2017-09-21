import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dahsboard.component';
import { WeathersComponent} from './weathers/weathers.component';
import { DashboardRouting} from "./dashboard-routing.module";
import { ForecastComponent } from './weathers/weather/forecast/forecast.component';
import { WeatherComponent} from "./weathers/weather/weather.component";
import {ResponsiveModule} from 'ng2-responsive';
import {TemperatureConverterPipe} from '../commons/pipes/temperature-converter.pipe';

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
    ForecastComponent,
    TemperatureConverterPipe
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
