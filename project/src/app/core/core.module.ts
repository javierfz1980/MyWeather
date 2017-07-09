import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import {HeaderComponent} from "./header/header/header.component";
import {FooterComponent} from "./footer/footer/footer/footer.component";
import {SharedModule} from "../shared/shared.module";
import {TranslateService} from "@ngx-translate/core";
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppRoutingModule
  ],
  providers: [
    TranslateService
  ],
})
export class CoreModule { }
