import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetpasswordComponent} from "./resetpassword.component";
import {oldResetpasswordComponent} from "./old.resetpassword.component";
import { FormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [ResetpasswordComponent,oldResetpasswordComponent]
})
export class ResetpasswordModule { }
