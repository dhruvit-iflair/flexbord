import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {registerComponent} from "./register.component";
import { FormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [registerComponent],
    imports     : [BrowserModule,FormsModule,RouterModule],
})

export class RegisterModule {}