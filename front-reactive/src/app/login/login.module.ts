import {NgModule} from '@angular/core';
import {CommonsModule} from "../commons/commons.module";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginRoutingModule} from "./login-routing.module";
import {SignInWrapperComponent} from './sign-in/sign-in-wrapper.component';
import {SignInComponent} from './sign-in/sign-in/sign-in.component';
import {ForgotComponent} from './sign-in/forgot/forgot.component';

@NgModule({
  imports: [
    CommonsModule,
    LoginRoutingModule,
  ],
  declarations: [
    SignInWrapperComponent,
    SignInComponent,
    SignUpComponent,
    ForgotComponent
  ],
  exports: [
    SignUpComponent,
    SignInWrapperComponent
  ]
})
export class LoginModule { }
