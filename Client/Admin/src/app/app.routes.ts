import {Routes} from "@angular/router";
import {mainViewComponent} from "./views/main-view/main-view.component";
import {minorViewComponent} from "./views/minor-view/minor-view.component";
import {loginComponent} from "./views/login/login.component";
import {registerComponent} from "./views/register/register.component";
import {ResetpasswordComponent} from "./views/resetpassword/resetpassword.component";
import {oldResetpasswordComponent} from "./views/resetpassword/old.resetpassword.component";
import { SetupComponent } from './views/profile/setup/setup.component';
import {blankComponent} from "./components/common/layouts/blank.component";
import {basicComponent} from "./components/common/layouts/basic.component";
import { Auth24Guard } from "./components/common/guard/auth24.guard";
import { ManageOrganizerComponent } from './views/organizer/manage/manage.component';
import { OrganizerComponent } from "./views/organizer/organizer.component";
import { OrgmembersComponent } from "./views/organizer/orgmembers/orgmembers.component";
import { MemberComponent } from "./views/organizer/orgmembers/member/member.component";
import { SeasonsComponent } from './views/organizer/seasons/seasons.component';
import { ManageSeasonsComponent } from './views/organizer/seasons/manage-seasons/manage-seasons.component';
import { OrganizerClassificationsComponent } from './views/organizer/organizer-classifications/organizer-classifications.component';
import { ManageOrganizerClassificationsComponent } from './views/organizer/organizer-classifications/manage-organizer-classifications/manage-organizer-classifications.component';
import { OrganizerCompetitionsComponent } from './views/organizer/organizer-competitions/organizer-competitions.component';
import { ManageOrganizerCompetitionsComponent } from './views/organizer/organizer-competitions/manage-organizer-competitions/manage-organizer-competitions.component';
import { ClubComponent } from './views/club/club.component';
import { ClubTeamsComponent } from './views/club/club-teams/club-teams.component';
import { ManageClubComponent } from './views/club/manage-club/manage-club.component';
import { ClubMembersComponent } from './views/club/club-members/club-members.component';
import { ManageClubMembersComponent } from './views/club/club-members/manage-club-members/manage-club-members.component';
import { ClubSeasonsComponent } from './views/club/club-seasons/club-seasons.component';
import { ManageClubSeasonsComponent } from './views/club/club-seasons/manage-club-seasons/manage-club-seasons.component';


export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'organizer', pathMatch: 'full'},

  // App views
  {
    path: '', component: basicComponent,
    children: [
      // {path: 'mainView', component: mainViewComponent, canActivate: [Auth24Guard]},
      // {path: 'minorView', component: minorViewComponent, canActivate: [Auth24Guard]},
      {path: 'profilesetup', component: SetupComponent},
      // {path: 'organizer', component: ManageOrganizerComponent, canActivate: [Auth24Guard]}
      {path: 'organizer', component: OrganizerComponent,canActivate: [Auth24Guard]},
      {path: 'organizer/manage', component: ManageOrganizerComponent , canActivate: [Auth24Guard]},
      {path: 'organizer/manage/:_id', component: ManageOrganizerComponent , canActivate: [Auth24Guard]},
      
      {path: 'organizer/orgmembers', component: OrgmembersComponent, canActivate: [Auth24Guard]},      
      {path: 'organizer/orgmembers/member', component: MemberComponent, canActivate: [Auth24Guard]},      
      {path: 'organizer/orgmembers/member/:_id', component: MemberComponent, canActivate: [Auth24Guard]},      
      
      {path: 'seasons', component: SeasonsComponent , canActivate: [Auth24Guard]},
      {path: 'seasons/manage', component: ManageSeasonsComponent , canActivate: [Auth24Guard]},
      {path: 'seasons/manage/:_id', component: ManageSeasonsComponent , canActivate: [Auth24Guard]},
      
      {path: 'classifications', component: OrganizerClassificationsComponent , canActivate: [Auth24Guard]},
      {path: 'classifications/manage', component: ManageOrganizerClassificationsComponent , canActivate: [Auth24Guard]},
      {path: 'classifications/manage/:_id', component: ManageOrganizerClassificationsComponent , canActivate: [Auth24Guard]},
      
      {path: 'competitions', component: OrganizerCompetitionsComponent , canActivate: [Auth24Guard]},      
      {path: 'competitions/manage', component: ManageOrganizerCompetitionsComponent , canActivate: [Auth24Guard]},
      {path: 'competitions/manage/:_id', component: ManageOrganizerCompetitionsComponent , canActivate: [Auth24Guard]},

      {path: 'club', component: ClubComponent , canActivate: [Auth24Guard]},
      {path: 'club/manage', component: ManageClubComponent , canActivate: [Auth24Guard]},
      {path: 'club/manage/:_id', component: ManageClubComponent , canActivate: [Auth24Guard]},
      
      {path: 'club/seasons', component: ClubSeasonsComponent , canActivate: [Auth24Guard]},
      {path: 'club/seasons/manage', component: ManageClubSeasonsComponent , canActivate: [Auth24Guard]},
      {path: 'club/seasons/manage/:_id', component: ManageClubSeasonsComponent , canActivate: [Auth24Guard]},
      
      {path: 'club/members', component: ClubMembersComponent , canActivate: [Auth24Guard]},
      {path: 'club/members/manage', component: ManageClubMembersComponent , canActivate: [Auth24Guard]},
      {path: 'club/members/manage/:_id', component: ManageClubMembersComponent , canActivate: [Auth24Guard]},
      
      {path: 'club/clubteam', component: ClubTeamsComponent , canActivate: [Auth24Guard]},
      
      
    ]
  },
  {
    path: '', component: blankComponent,
    children: [
      { path: 'login', component: loginComponent },
      { path: 'register', component: registerComponent },
      { path: 'resetpassword', component: ResetpasswordComponent },
      { path: 'setpassword', component: oldResetpasswordComponent }
    ]
  },

  // Handle all other routes
  {path: '**',    component: mainViewComponent, canActivate: [Auth24Guard] }
];
