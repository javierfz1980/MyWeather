import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent} from "./dahsboard.component";
import {AuthGuard} from '../commons/guards/auth.guard';

const boardsRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
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
