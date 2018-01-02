import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {loginComponent} from "./login.component";
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [loginComponent],
    imports     : [BrowserModule,FormsModule,RouterModule],
})

export class LoginModule {}