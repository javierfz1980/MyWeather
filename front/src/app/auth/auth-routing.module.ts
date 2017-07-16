import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignUpComponent} from "./sign-up/sign-up.component";

const authRoutes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'account', component: SignUpComponent},
  {path: '**', redirectTo: '/'}
]

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
