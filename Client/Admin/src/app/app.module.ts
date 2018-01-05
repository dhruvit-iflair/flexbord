import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy,CommonModule} from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Auth24Guard } from "./components/common/guard/auth24.guard";
import { PaginationModule } from "ngx-bootstrap";
import {Ng2TableModule} from 'ng2-table';
import { DataTablesModule } from 'angular-datatables';

// App views
import {MainViewModule} from "./views/main-view/main-view.module";
import {MinorViewModule} from "./views/minor-view/minor-view.module";
import {LoginModule} from "./views/login/login.module";
import {RegisterModule} from "./views/register/register.module";
import {ResetpasswordModule} from "./views/resetpassword/resetpassword.module";

// App modules/components/directives
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { ProfileModule } from "./views/profile/profile.module";
import { OrganizerComponent } from './views/organizer/organizer.component';
import { ManageOrganizerComponent } from './views/organizer/manage/manage.component';
import { Dir_select } from "./components/directive/select2";
import { BigTextDirective } from "./components/directive/testDir";
import { GoogleplaceDirective } from "./components/directive/placeLookup";
import { SeasonsComponent } from './views/organizer/seasons/seasons.component';
import { ManageSeasonsComponent } from './views/organizer/seasons/manage-seasons/manage-seasons.component';
import { DateValueAccessor } from "./components/directive/date-proper";
import { dateFormatPipe } from "./components/pipes/dateFormate";
import { OrgmembersComponent } from './views/organizer/orgmembers/orgmembers.component';
import { MemberComponent } from './views/organizer/orgmembers/member/member.component';

// import { OrganizerClassificationsComponent } from './views/organizer/organizer-classifications/organizer-classifications.component';
// import { ManageOrganizerClassificationsComponent } from './views/organizer/organizer-classifications/manage-organizer-classifications/manage-organizer-classifications.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    ManageOrganizerComponent,
    GoogleplaceDirective,
    BigTextDirective,
    Dir_select,
    SeasonsComponent,
    ManageSeasonsComponent,
    DateValueAccessor,
    dateFormatPipe,
    OrgmembersComponent,
     MemberComponent
    // OrganizerClassificationsComponent,
    // ManageOrganizerClassificationsComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng4GeoautocompleteModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3500,
    }),
    PaginationModule.forRoot(),
    Ng2TableModule,
    DataTablesModule,
    // Views
    MainViewModule,
    MinorViewModule,
    LoginModule,
    RegisterModule,
    ResetpasswordModule,
    ProfileModule,
    // Modules
    LayoutsModule,

    RouterModule.forRoot(ROUTES)
  ],
  providers: [Auth24Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
