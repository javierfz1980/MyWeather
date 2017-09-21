import {NgModule} from '@angular/core';
import {ErrorComponent} from './error/error.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer/footer/footer.component";
import {CommonsModule} from "../commons/commons.module";
import {AppRoutingModule} from "../app-routing.module";
import {LoginModule} from "../login/login.module";
import {HomeComponent} from './home/home.component';
import {UserPanelComponent} from './user-panel/user-panel.component';
import {SearchingComponent} from './search/searching.component';
import {SearchResult} from './search/search-result/search-result.component';
import {LanguageComponent} from './language/language.component';

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
    SearchingComponent,
    SearchResult,
    UserPanelComponent,
    LanguageComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppRoutingModule
  ]
})
export class GeneralModule { }
