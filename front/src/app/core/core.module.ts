import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import {HeaderComponent} from "./header/header/header.component";
import {FooterComponent} from "./footer/footer/footer/footer.component";
import {SharedModule} from "../shared/shared.module";
import {TranslateService} from "@ngx-translate/core";
import {AppRoutingModule} from "../app-routing.module";
import {LanguageService} from "../shared/services/language.service";
import {HttpService} from "../shared/services/http.service";
import {AuthModule} from "../auth/auth.module";

@NgModule({
  imports: [
    AppRoutingModule,
    SharedModule,
    AuthModule
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
    AppRoutingModule,
    AuthModule
  ],
  providers: [
    TranslateService,
    LanguageService,
    HttpService
  ],
})
export class CoreModule { }
