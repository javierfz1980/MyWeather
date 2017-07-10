import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropDownClickDirective} from "./directives/drop-down-click.directive";
import {DropDownDirective} from "./directives/drop-down.directive";
import {TranslateModule} from "@ngx-translate/core";
import {CollapseDirective} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";

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
    CollapseDirective,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
