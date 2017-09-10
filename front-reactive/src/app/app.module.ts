import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Http, HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import {GeneralModule} from "./general/general.module";
import {LoginModule} from "./login/login.module";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CommonsModule} from "./commons/commons.module";
import {applicationStateImports} from './commons/store/application-state';
import {applicationEffectImports} from './commons/store/application-effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonsModule,
    DashboardModule,
    LoginModule,
    GeneralModule,
    ...applicationStateImports,
    ...applicationEffectImports,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
