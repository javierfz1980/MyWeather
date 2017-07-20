import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards.component';
import { LocationsComponent } from './weathers/locations.component';
import { LocationComponent } from './weathers/weather/location.component';
import { BoardsRouting } from "./boards-routing.module";

@NgModule({
  imports: [
    CommonModule,
    BoardsRouting
  ],
  declarations: [
    BoardsComponent,
    LocationsComponent,
    LocationComponent
  ],
  exports: [
    BoardsComponent
  ]
})
export class BoardsModule { }
