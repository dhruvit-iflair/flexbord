import {Routes} from "@angular/router";
import {mainViewComponent} from "./views/main-view/main-view.component";
import {minorViewComponent} from "./views/minor-view/minor-view.component";
import {loginComponent} from "./views/login/login.component";
import {registerComponent} from "./views/register/register.component";
import {ResetpasswordComponent} from "./views/resetpassword/resetpassword.component";
import { SetupComponent } from './views/profile/setup/setup.component';
import {blankComponent} from "./components/common/layouts/blank.component";
import {basicComponent} from "./components/common/layouts/basic.component";
import { Auth24Guard } from "./components/common/guard/auth24.guard";
import { ManageOrganizerComponent } from './views/organizer/manage/manage.component';
import { OrganizerComponent } from "./views/organizer/organizer.component";
import { SeasonsComponent } from './views/organizer/seasons/seasons.component';
import { ManageSeasonsComponent } from './views/organizer/seasons/manage-seasons/manage-seasons.component';
import { OrganizerClassificationsComponent } from './views/organizer/organizer-classifications/organizer-classifications.component';
import { ManageOrganizerClassificationsComponent } from './views/organizer/organizer-classifications/manage-organizer-classifications/manage-organizer-classifications.component';

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  // App views
  {
    path: '', component: basicComponent,
    children: [
      // {path: 'mainView', component: mainViewComponent, canActivate: [Auth24Guard]},
      // {path: 'minorView', component: minorViewComponent, canActivate: [Auth24Guard]},
      {path: 'profilesetup', component: SetupComponent, canActivate: [Auth24Guard]},
      // {path: 'organizer', component: ManageOrganizerComponent, canActivate: [Auth24Guard]}
      {path: 'organizer', component: OrganizerComponent,canActivate: [Auth24Guard]},
      {path: 'organizer/manage', component: ManageOrganizerComponent , canActivate: [Auth24Guard]},
      {path: 'organizer/manage/:_id', component: ManageOrganizerComponent , canActivate: [Auth24Guard]},
      {path: 'seasons', component: SeasonsComponent , canActivate: [Auth24Guard]},
      {path: 'seasons/manage', component: ManageSeasonsComponent , canActivate: [Auth24Guard]},
      {path: 'seasons/manage/:_id', component: ManageSeasonsComponent , canActivate: [Auth24Guard]},
      {path: 'classifications', component: OrganizerClassificationsComponent , canActivate: [Auth24Guard]},
      {path: 'classifications/manage', component: ManageOrganizerClassificationsComponent , canActivate: [Auth24Guard]},
      {path: 'classifications/manage/:_id', component: ManageOrganizerClassificationsComponent , canActivate: [Auth24Guard]}
    ]
  },
  {
    path: '', component: blankComponent,
    children: [
      { path: 'login', component: loginComponent },
      { path: 'register', component: registerComponent },
      { path: 'resetpassword', component: ResetpasswordComponent }
    ]
  },

  // Handle all other routes
  {path: '**',    component: mainViewComponent, canActivate: [Auth24Guard] }
];
