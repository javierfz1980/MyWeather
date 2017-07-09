import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const authRoutes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
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
