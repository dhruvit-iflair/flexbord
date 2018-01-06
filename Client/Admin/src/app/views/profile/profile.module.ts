import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';

import { SetupComponent } from './setup/setup.component';
import { ProfileComponent } from "./profile.component";

const routes: Routes = [
  // {
  //   path: 'profile',
  //   redirectTo: 'setup',
  //   pathMatch: 'full',
  // },
  {
    path: 'profile',
    children: [{
      path: 'setup',
      component: SetupComponent
    }]
  }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes),BrowserModule,FormsModule],
    exports: [RouterModule],
    declarations: [SetupComponent,ProfileComponent]
})
export class ProfileModule {}
