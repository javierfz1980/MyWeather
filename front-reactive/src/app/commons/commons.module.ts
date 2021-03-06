import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropDownClickDirective} from "./directives/drop-down-click.directive";
import {DropDownDirective} from "./directives/drop-down.directive";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {CollapseDirective} from "ngx-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from './guards/auth.guard';
import {LanguageService} from './services/language.service';
import {HttpService} from './services/http.service';
import {AuthService} from './services/auth.service';
import {ResponsiveModule} from 'ng2-responsive';
import {LocalStorageService} from './services/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    ResponsiveModule
  ],
  declarations: [
    DropDownClickDirective,
    DropDownDirective,
    CollapseDirective
  ],
  exports: [
    DropDownClickDirective,
    DropDownDirective,
    TranslateModule,
    CollapseDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ResponsiveModule
  ],
  providers: [
    AuthGuard,
    TranslateService,
    LanguageService,
    HttpService,
    AuthService,
    LocalStorageService
  ]
})
export class CommonsModule { }
