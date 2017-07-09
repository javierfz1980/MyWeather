import { NgModule } from '@angular/core';
import {BoardsComponent} from "./boards/boards.component";
import {RouterModule, Routes} from "@angular/router";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";

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
