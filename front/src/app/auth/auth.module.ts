import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthRoutingModule} from "./auth-routing.module";
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  exports: [
    SignUpComponent,
    SignInComponent
  ]
})
export class AuthModule { }
