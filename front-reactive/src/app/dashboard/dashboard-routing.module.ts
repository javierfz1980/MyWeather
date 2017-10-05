import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent} from "./dahsboard.component";
import {AuthGuard} from '../commons/guards/auth.guard';

const boardsRoutes: Routes = [
  {path: 'dashboards', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: ':id', component: DashboardComponent, canActivateChild: [AuthGuard]},
    {path: '', redirectTo: '/dashboards', pathMatch: 'full'}
  ]}
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
