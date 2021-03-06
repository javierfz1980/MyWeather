import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer/footer/footer.component";
import {SharedModule} from "../shared/shared.module";
import {TranslateService} from "@ngx-translate/core";
import {AppRoutingModule} from "../app-routing.module";
import {LanguageService} from "../shared/services/language.service";
import {HttpService} from "../shared/services/http.service";
import {AuthModule} from "../auth/auth.module";
import {AuthService} from "../auth/services/auth.service";
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './header/search/search.component';
import {WeatherService} from "../dashboard/services/weather.service";
import {DashboardService} from "../dashboard/services/dashboard.service";

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
    ErrorComponent,
    HomeComponent,
    SearchComponent
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
    HttpService,
    AuthService,
    WeatherService,
    DashboardService
  ],
})
export class CoreModule { }
