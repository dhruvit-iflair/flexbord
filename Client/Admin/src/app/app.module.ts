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
import { TabsModule,PaginationModule ,ModalModule,BsDatepickerModule,TimepickerModule} from "ngx-bootstrap";
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
import { AccessorService } from "./components/common/accessor.service";
import { BreadCrumbService } from "./components/services/bread-crumb";
import { EmailService } from "./components/services/email.service";
import { EmailTypeService } from './components/services/email-type.service';
import { OrganizerService } from "./components/services/organizer.service";
import {Ng5BreadcrumbModule,BreadcrumbService} from 'ng5-breadcrumb';
import { BackLocationDirective } from "./components/directive/backButton";
import { OrganizerClassificationsComponent } from './views/organizer/organizer-classifications/organizer-classifications.component';
import { ManageOrganizerClassificationsComponent } from './views/organizer/organizer-classifications/manage-organizer-classifications/manage-organizer-classifications.component';
import { OrderByPipe } from "./components/pipes/orderBy";
import { OrganizerCompetitionsComponent } from './views/organizer/organizer-competitions/organizer-competitions.component';
import { ManageOrganizerCompetitionsComponent } from './views/organizer/organizer-competitions/manage-organizer-competitions/manage-organizer-competitions.component';
import { ClubComponent } from './views/club/club.component';
import { ClubTeamsComponent } from './views/club/club-teams/club-teams.component';
import { TeamComponent } from './views/club/club-teams/team/team.component';
import { ManageClubComponent } from './views/club/manage-club/manage-club.component';
// import { ConfirmService } from "./components/services/confirm.services";
import { placeDirectiveWithModel } from "./components/directive/placeLookupWithModel";
import { ClubService } from "./components/services/club.services";
import { ClubMembersComponent } from './views/club/club-members/club-members.component';
import { ManageClubMembersComponent } from './views/club/club-members/manage-club-members/manage-club-members.component';
import { AccessorComponent } from './views/accessor/accessor.component';
import { ClubSeasonsComponent } from './views/club/club-seasons/club-seasons.component';
import { ManageClubSeasonsComponent } from './views/club/club-seasons/manage-club-seasons/manage-club-seasons.component';
import { ClubClassificationsComponent } from './views/club/club-classifications/club-classifications.component';
import { ManageClubClassificationsComponent } from './views/club/club-classifications/manage-club-classifications/manage-club-classifications.component';

import { SportsComponent } from './views/sports/sports.component';
import { ManageComponent } from './views/sports/manage/manage.component';
import { PointsComponent } from './views/sports/points/points.component';
import { ManagepointsComponent } from './views/sports/points/managepoints/managepoints.component';
import { PlayerstatusComponent } from './views/sports/playerstatus/playerstatus.component';
import { ManageplayerstatusComponent } from './views/sports/playerstatus/manageplayerstatus/manageplayerstatus.component';
import { FirstcapitalizePipe } from './components/pipes/firstcapitalize.pipe';
import { ScoresComponent } from './views/sports/scores/scores.component';
import { ManagescoreComponent } from './views/sports/scores/managescore/managescore.component';
import { ClubTournamentsComponent } from './views/club/club-tournaments/club-tournaments.component';
import { ManageclubTournamentsComponent } from './views/club/club-tournaments/manageclub-tournaments/manageclub-tournaments.component';
import { UsersComponent } from './views/users/users.component';
import { ManageUsersComponent } from './views/users/manage-users/manage-users.component';
import { UserService } from "./components/services/users";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ProfileViewComponent } from './views/profile/profile-view/profile-view.component';
import { FoulsComponent } from './views/sports/fouls/fouls.component';
import { ManagefoulsComponent } from './views/sports/fouls/managefouls/managefouls.component';
import { GamesComponent } from './views/games/games.component';
import { ManagegameComponent } from './views/games/managegame/managegame.component';
import { GamesettingsComponent } from './views/gamesettings/gamesettings.component';
import { BasesettingComponent } from './views/gamesettings/basesetting/basesetting.component';
import { TimesettingsComponent } from './views/gamesettings/timesettings/timesettings.component';
import { ManagetimesettingComponent } from './views/gamesettings/timesettings/managetimesetting/managetimesetting.component';
import { ConsequencesComponent } from './views/gamesettings/consequences/consequences.component';
import { ManageconsequenceComponent } from './views/gamesettings/consequences/manageconsequence/manageconsequence.component';
import { StructureComponent } from './views/gamesettings/structure/structure.component';
import { ManagestructureComponent } from './views/gamesettings/structure/managestructure/managestructure.component';
import { PlaylistsComponent } from './views/gamesettings/playlists/playlists.component';
import { ManageplaylistComponent } from './views/gamesettings/playlists/manageplaylist/manageplaylist.component';
import { ScoreboardsComponent } from './views/gamesettings/scoreboards/scoreboards.component';
import { ManagescoreboardComponent } from './views/gamesettings/scoreboards/managescoreboard/managescoreboard.component';
import { MultiselectComponent } from './components/custom/multiselect/multiselect.component';
import { EmailComponent } from './views/email/email.component';
import { ManageEmailComponent } from './views/email/manage-email/manage-email.component';
import { CkEditorDirective } from './components/directive/ck-editor.directive';
import { ImportOrgMembersComponent } from './views/organizer/orgmembers/import-org-members/import-org-members.component';
import { ImportClubMembersComponent } from './views/club/club-members/import-club-members/import-club-members.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    ManageOrganizerComponent,
    GoogleplaceDirective,
    placeDirectiveWithModel,    
    BigTextDirective,
    BackLocationDirective,
    Dir_select,
    SeasonsComponent,
    ManageSeasonsComponent,
    DateValueAccessor,
    dateFormatPipe,
    OrderByPipe,
    OrgmembersComponent,
    MemberComponent,
    OrganizerClassificationsComponent,
    ManageOrganizerClassificationsComponent,
    OrganizerCompetitionsComponent,
    ManageOrganizerCompetitionsComponent,
    ClubComponent,
    ClubTeamsComponent,
    TeamComponent,
    ManageClubComponent,
    ClubMembersComponent,
    ManageClubMembersComponent,
    AccessorComponent,
    ClubSeasonsComponent,
    ManageClubSeasonsComponent,
    ClubClassificationsComponent,
    ManageClubClassificationsComponent,
    SportsComponent,
    ManageComponent,
    PointsComponent,
    ManagepointsComponent,
    PlayerstatusComponent,
    ManageplayerstatusComponent,
    FirstcapitalizePipe,
    ScoresComponent,
    ManagescoreComponent,
    ClubTournamentsComponent,
    ManageclubTournamentsComponent,
    UsersComponent,
    ManageUsersComponent,
    ProfileViewComponent,
    FoulsComponent,
    ManagefoulsComponent,
    GamesComponent,
    ManagegameComponent,
    GamesettingsComponent,
    BasesettingComponent,
    TimesettingsComponent,
    ManagetimesettingComponent,
    ConsequencesComponent,
    ManageconsequenceComponent,
    StructureComponent,
    ManagestructureComponent,
    PlaylistsComponent,
    ManageplaylistComponent,
    ScoreboardsComponent,
    ManagescoreboardComponent,
    MultiselectComponent,
    EmailComponent,
    ManageEmailComponent,
    CkEditorDirective,
    ImportOrgMembersComponent,
    ImportClubMembersComponent
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
    BsDatepickerModule.forRoot(),
    DataTablesModule.forRoot(),
    TimepickerModule.forRoot(),
    MultiselectDropdownModule,
    // Views
    MainViewModule,
    MinorViewModule,
    LoginModule,
    RegisterModule,
    ResetpasswordModule,
    ProfileModule,
    // Modules
    LayoutsModule,
    TabsModule.forRoot(),

    RouterModule.forRoot(ROUTES),
    Ng5BreadcrumbModule.forRoot(),
  ],
  providers: [Auth24Guard,ClubService,UserService,AccessorService,BreadCrumbService,BreadcrumbService,EmailService,EmailTypeService,OrganizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
