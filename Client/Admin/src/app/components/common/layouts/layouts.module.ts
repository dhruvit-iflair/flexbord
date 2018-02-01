import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";

import {blankComponent} from "./blank.component";
import {basicComponent} from "./basic.component";

import {NavigationModule} from "../navigation/navigation.module";
import {TopnavbarModule} from "../topnavbar/topnavbar.module";
import {FooterModule} from "../footer/footer.module";
import { BreadCrumbModule } from "../bread-crumb/bread-crumb.module";
import {LoadingComponent} from '../loading/loading.component'
@NgModule({
    declarations: [blankComponent,basicComponent,LoadingComponent],
    imports     : [BrowserModule, RouterModule, NavigationModule, TopnavbarModule, FooterModule,BreadCrumbModule],
    exports     : [blankComponent,basicComponent,LoadingComponent]
})

export class LayoutsModule {}
