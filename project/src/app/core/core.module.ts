import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import {HeaderComponent} from "./header/header/header.component";
import {FooterComponent} from "./footer/footer/footer/footer.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
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
    FooterComponent
  ]
})
export class CoreModule { }
