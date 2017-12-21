import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {mainViewComponent} from "./main-view.component";

@NgModule({
    declarations: [mainViewComponent],
    imports     : [BrowserModule,RouterModule,FormsModule],
})

export class MainViewModule {}