import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    SignUpComponent
  ],
  exports: [
    SignUpComponent
  ]
})
export class AuthModule { }
