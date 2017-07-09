import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationComponent } from './locations/location/location.component';
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
