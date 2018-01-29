import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import { BreadCrumbComponent } from "./bread-crumb.component";
import {Ng5BreadcrumbModule,BreadcrumbService} from 'ng5-breadcrumb';

@NgModule({
    declarations: [BreadCrumbComponent],
    imports     : [BrowserModule, RouterModule,Ng5BreadcrumbModule.forRoot()],
    exports     : [BreadCrumbComponent],
    providers   : [BreadcrumbService]
})

export class BreadCrumbModule {}