import { NgModule } from '@angular/core';
import {BoardsComponent} from "./boards/boards.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/home/home.component";

const appRoutes:Routes = [
  {path: '', component: HomeComponent}
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
