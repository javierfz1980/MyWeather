import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BoardsComponent} from "./boards.component";

const boardsRoutes: Routes = [
  {path: 'boards', component: BoardsComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(boardsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BoardsRouting {

}
