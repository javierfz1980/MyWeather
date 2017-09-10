import {NgModule} from '@angular/core';
import {ErrorComponent} from './error/error.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer/footer/footer.component";
import {CommonsModule} from "../commons/commons.module";
import {TranslateService} from "@ngx-translate/core";
import {AppRoutingModule} from "../app-routing.module";
import {LanguageService} from "../commons/services/language.service";
import {HttpService} from "../commons/services/http.service";
import {LoginModule} from "../login/login.module";
import {AuthService} from "../commons/services/auth.service";
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {UserPanelComponent} from './user-panel/user-panel.component';
import {AuthGuard} from '../commons/guards/auth.guard';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonsModule,
    LoginModule
  ],
  declarations: [
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    HomeComponent,
    SearchComponent,
    UserPanelComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppRoutingModule
  ]
})
export class GeneralModule { }
