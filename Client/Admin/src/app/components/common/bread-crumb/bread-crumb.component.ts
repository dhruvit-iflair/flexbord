import { Component, OnInit } from "@angular/core";
import { Router,NavigationEnd,Event ,ActivatedRoute} from "@angular/router";
import { BreadCrumb } from "../../class/breadCrumb";
// import { BreadCrumbService } from "../../services/bread-crumb";
import { BreadCrumbList } from "../bread-crumb";
import { BreadcrumbService } from 'ng5-breadcrumb';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {
  public url :string;  
  // routeChange: Subject<BreadCrumb> = new Subject<BreadCrumb>();
  constructor(public breadcrumbService: BreadcrumbService,private router : Router,private activeRoute: ActivatedRoute){
    ///////////////////////
    // Organizer Modules //
    ///////////////////////
    this.breadcrumbService.addFriendlyNameForRoute('/', 'Organizer');
    this.breadcrumbService.addFriendlyNameForRoute('/organizer', 'Organizer');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/organizer/manage/[a-zA-Z0-9]', 'Update Organizer');    
    this.breadcrumbService.addFriendlyNameForRoute('/organizer/manage', 'Manage Organizer');    

    this.breadcrumbService.addFriendlyNameForRoute('/organizer/seasons', 'Seasons');
    this.breadcrumbService.addFriendlyNameForRoute('/organizer/seasons/manage', 'Manage Season');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/organizer/seasons/manage/[a-zA-Z0-9]', 'Update Season');
        
    this.breadcrumbService.addFriendlyNameForRoute('/organizer/orgmembers', 'Organizer Members');
    this.breadcrumbService.addFriendlyNameForRoute('/organizer/orgmembers/member', 'Manage Member');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/organizer/orgmembers/member/[a-zA-Z0-9]', 'Update Members');
    
    this.breadcrumbService.addFriendlyNameForRoute('/organizer/classifications', 'Classifications');
    this.breadcrumbService.addFriendlyNameForRoute('/organizer/classifications/manage', 'Manage Classification');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/organizer/classifications/manage/[a-zA-Z0-9]', 'Update Classifications');
    
    // this.breadcrumbService.addFriendlyNameForRoute('/classifications', 'Classifications');
    // this.breadcrumbService.addFriendlyNameForRoute('/classifications/manage', 'Manage Classifications');
    this.breadcrumbService.addFriendlyNameForRoute('/organizer/orgmembers/import', 'Import');
    
    this.breadcrumbService.addFriendlyNameForRoute('/organizer/competitions', 'Competitions');
    this.breadcrumbService.addFriendlyNameForRoute('/organizer/competitions/manage', 'Manage Competition');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/organizer/competitions/manage/[a-zA-Z0-9]', 'Update Competitions');
    
    //////////////////
    // Club Modules //
    //////////////////
    this.breadcrumbService.addFriendlyNameForRoute('/club', 'Club');
    this.breadcrumbService.addFriendlyNameForRoute('/club/manage', 'Manage Club');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/club/manage/[a-zA-Z0-9]', 'Update Club');

    this.breadcrumbService.addFriendlyNameForRoute('/club/seasons', 'Club Seasons');
    this.breadcrumbService.addFriendlyNameForRoute('/club/seasons/manage', 'Manage Club Season');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/club/seasons/manage/[a-zA-Z0-9]', 'Update Season');
    
    this.breadcrumbService.addFriendlyNameForRoute('/club/members', 'Club Members');
    this.breadcrumbService.addFriendlyNameForRoute('/club/members/manage', 'Manage Club Member');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/club/members/manage/[a-zA-Z0-9]', 'Update Members');
    
    this.breadcrumbService.addFriendlyNameForRoute('/club/classifications', 'Club Classifications');
    this.breadcrumbService.addFriendlyNameForRoute('/club/classifications/manage', 'Manage Club Classification');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/club/classifications/manage/[a-zA-Z0-9]', 'Update Classifications');
    
    this.breadcrumbService.addFriendlyNameForRoute('/club/clubteam', 'Club Teams');
    this.breadcrumbService.addFriendlyNameForRoute('/club/clubteam/team', 'Manage Club Team');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/club/clubteam/manage/[a-zA-Z0-9]', 'Update Teams');
    
    this.breadcrumbService.addFriendlyNameForRoute('/club/tournaments', 'Club Tournaments');
    this.breadcrumbService.addFriendlyNameForRoute('/club/tournaments/manage', 'Manage Club Tournament');
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/club/tournaments/manage/[a-zA-Z0-9]', 'Update Tournaments');
        
    //////////////////
    // User Modules //
    //////////////////
    this.breadcrumbService.addFriendlyNameForRoute('/users', 'Users');
    this.breadcrumbService.addFriendlyNameForRoute('/users/manage', 'Manage User');
   

    ////////////////////
    // Sports Modules //
    ////////////////////
    this.breadcrumbService.addFriendlyNameForRoute('/sports', 'Sports');
    this.breadcrumbService.addFriendlyNameForRoute('/sports/manage', 'Manage Sports');
    
    this.breadcrumbService.addFriendlyNameForRoute('/sports/points', 'Sports Points');
    this.breadcrumbService.addFriendlyNameForRoute('/sports/points/manage', 'Manage Sports Points');
    
    this.breadcrumbService.addFriendlyNameForRoute('/sports/playerstatus', 'Sports Playerstatus');
    this.breadcrumbService.addFriendlyNameForRoute('/sports/playerstatus/manage', 'Manage Sports Playerstatus');
    
    this.breadcrumbService.addFriendlyNameForRoute('/sports/scores', 'Sports Scores');
    this.breadcrumbService.addFriendlyNameForRoute('/sports/scores/manage', 'Manage Sports Scores');
    
    this.breadcrumbService.addFriendlyNameForRoute('/sports/fouls', 'Sports Fouls');
    this.breadcrumbService.addFriendlyNameForRoute('/sports/fouls/manage', 'Manage Sports Fouls');
    
    this.breadcrumbService.addFriendlyNameForRoute('/permissions', 'Permissions');
    

    /////////////////////
    // Profile Modules //
    /////////////////////

    this.breadcrumbService.hideRoute('/profile');
    this.breadcrumbService.addFriendlyNameForRoute('/profile/view', 'Edit Profile');
    
    /////////////////////
    // Email Modules   //
    /////////////////////
    this.breadcrumbService.addFriendlyNameForRoute('/email', 'Email');
    this.breadcrumbService.hideRoute('/email/manage');
    this.breadcrumbService.addFriendlyNameForRouteRegex('/email/manage/[a-zA-Z0-9]', 'Manage Email');        // 

    ////////////////////////////
    // Game Setting Modules   //
    ////////////////////////////
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings', 'Game Setting');
    
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/base', 'Base');
    

    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/timesetting', 'Time Setting');
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/timesetting/manage', 'Manage');
   
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/consequences', 'Consequences');
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/consequences/manage', 'Manage');
   

    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/structures', 'Structures');
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/structures/manage', 'Manage');
   
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/playlists', 'Playlist');
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/playlists/manage', 'Manage');
   
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/scoreboards', 'Scoreboards');
    this.breadcrumbService.addFriendlyNameForRoute('/game_settings/scoreboards/manage', 'Manage');
    
    this.breadcrumbService.addFriendlyNameForRoute('/games', 'Games');
    this.breadcrumbService.addFriendlyNameForRoute('/games/manage', 'Manage');
    
    // this.breadcrumbService.addFriendlyNameForRouteRegex('/home/users/[0-9]/info', 'Information');
  }   
  ngOnInit(){
    // this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event:NavigationEnd) => {
    //   var re = new RegExp("[a-zA-Z0-9]{}");
    //   var se = event.url.split('/');
    //   console.log(re.test(se[se.length-1]));
    //   console.log(se)
    // });
  }

}