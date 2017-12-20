import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RolesPermissionsComponent} from "./roles-permissions.component";
import { FormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [RolesPermissionsComponent]
})
export class RolesPermissionsModule { }
