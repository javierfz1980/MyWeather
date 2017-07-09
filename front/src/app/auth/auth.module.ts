import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthRoutingModule} from "./auth-routing.module";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    SignUpComponent,
    ForgotPasswordComponent
  ],
  exports: [
    SignUpComponent
  ]
})
export class AuthModule { }
