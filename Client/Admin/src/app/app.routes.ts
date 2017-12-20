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

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  // App views
  {
    path: '', component: basicComponent,
    children: [
      {path: 'mainView', component: mainViewComponent, canActivate: [Auth24Guard]},
      {path: 'minorView', component: minorViewComponent, canActivate: [Auth24Guard]},
      {path: 'profilesetup', component: SetupComponent, canActivate: [Auth24Guard]}
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
