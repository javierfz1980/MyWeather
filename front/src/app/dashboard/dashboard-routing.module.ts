import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent} from "./dahsboard.component";

const boardsRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(boardsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRouting {

}
