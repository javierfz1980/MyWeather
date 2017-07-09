import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropDownClickDirective} from "./directives/drop-down-click.directive";
import {DropDownDirective} from "./directives/drop-down.directive";
import {TranslateModule} from "@ngx-translate/core";
import {CollapseDirective} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule
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
    CollapseDirective
  ]
})
export class SharedModule { }
