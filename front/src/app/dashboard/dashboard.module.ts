import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dahsboard.component';
import { LocationsComponent } from './weathers/weathers.component';
import { LocationComponent } from './weathers/weather/weather.component';
import { DashboardRouting} from "./dashboard-routing.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting
  ],
  declarations: [
    DashboardComponent,
    LocationsComponent,
    LocationComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
