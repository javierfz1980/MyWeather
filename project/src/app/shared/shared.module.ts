import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropDownClickDirective} from "./directives/drop-down-click.directive";
import {DropDownDirective} from "./directives/drop-down.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropDownClickDirective,
    DropDownDirective
  ],
  exports: [
    DropDownClickDirective,
    DropDownDirective
  ]
})
export class SharedModule { }
