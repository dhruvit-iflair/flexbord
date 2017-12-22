import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

// App views
import {MainViewModule} from "./views/main-view/main-view.module";
import {MinorViewModule} from "./views/minor-view/minor-view.module";
import {LoginModule} from "./views/login/login.module";
import {RegisterModule} from "./views/register/register.module";
import {ResetpasswordModule} from "./views/resetpassword/resetpassword.module";

// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { ProfileModule } from "./views/profile/profile.module";
import { OrganizerComponent } from './views/organizer/organizer.component';
import { ManageOrganizerComponent } from './views/organizer/manage/manage.component';
import { SportsComponent } from './views/sports/sports.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    ManageOrganizerComponent,
    SportsComponent,
  ],
  imports: [
    // Angular modules
    BrowserModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng4GeoautocompleteModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3500,
    }),
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
