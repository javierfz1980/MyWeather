import { NgModule } from '@angular/core';
import {BoardsComponent} from "./boards/boards.component";
import {RouterModule, Routes} from "@angular/router";

const appRoutes:Routes = [
  {path: '', component: BoardsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
