import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { GameService } from '../../../components/services/game.service';

@Component({
  selector: 'app-managegame',
  templateUrl: './managegame.component.html',
  styleUrls: ['./managegame.component.css']
})
export class ManagegameComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute,public gameService:GameService) { }
  public mForm = { sports: '', settings: '', gameType: '', competition: '', hometeam: '', visitorteam: '', gamenumber: '', round: '', gamedate: '', gametime: '', gamelocation: '', gameplace: '', referee: '', timer: '', umpire1: '', umpire2: '', scorer: '', shotclockoperator: '' };
  public sports; teams;
  public types = ['Division', 'Friendly', 'Tournament'];
  public settings=['Setting-1','Setting-2','Setting-3','Setting-4','Setting-5'];
  public competetions=['Competetion-1','Competetion-2','Competetion-3','Competetion-4','Competetion-5'];
  public paramdetails = false;
  public isInTeam = false;
  public userId;
  public subscription:Subscription;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if(window.location.pathname.indexOf('team') > -1){
         this.isInTeam = true
         this.gameService.getGameData().subscribe(res => {
            this.mForm = res[0];
            console.log(res[0]);
            this.userId = res[0]._id;
            this.paramdetails = true;
            if (res[0].gamedate) {
              var x = res[0].gamedate.split('T');
              this.mForm.gamedate = x[0];
            }
            this.mForm.hometeam = res[0].hometeam._id;
            this.mForm.visitorteam = res[0].visitorteam._id;
          });
      }
      else {
         this.isInTeam = false
      }
      if (!this.isInTeam) {
        this.userId = params._id;
        if (this.userId) {
          this.paramdetails = true;
          this.http.get(environment.api + '/games/' + this.userId)
            .subscribe(res => {
              this.mForm = res[0];
              if (res[0].gamedate) {
                var x = res[0].gamedate.split('T');
                this.mForm.gamedate = x[0];
              }
              this.mForm.hometeam = res[0].hometeam._id;
              this.mForm.visitorteam = res[0].visitorteam._id;
            });
        }
      }
    });
    this.initializedata();
  }
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
  reset(){
    this.mForm = { sports: '', settings: '', gameType: '', competition: '', hometeam: '', visitorteam: '', gamenumber: '', round: '', gamedate: '', gametime: '', gamelocation: '', gameplace: '', referee: '', timer: '', umpire1: '', umpire2: '', scorer: '', shotclockoperator: '' };
  }
  initializedata() {
    this.http.get(environment.api + '/sports').subscribe(res => {
      this.sports = res;
    });
    this.http.get(environment.api + '/clubteams').subscribe(resp => {
      this.teams = resp;
    });
  }
  managegames(gotdata) {
    if (this.paramdetails) {
      this.gameService.updateGame(this.userId,gotdata);
      this.reset();
    }
    else {
      this.gameService.saveGame(gotdata);
      this.reset();      
    }
    if (!this.isInTeam) {
      this.userId = '';
      this.paramdetails = false;
      this.router.navigate(['/games']);      
    }
  }

}
