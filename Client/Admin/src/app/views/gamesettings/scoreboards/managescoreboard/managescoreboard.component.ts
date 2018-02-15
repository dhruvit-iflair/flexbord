import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-managescoreboard',
  templateUrl: './managescoreboard.component.html',
  styleUrls: ['./managescoreboard.component.css']
})
export class ManagescoreboardComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public settingid; paramdetails; userId;
  public mForm = { dispName: '', dispStyle: '', dispShownOn: {timeouts:false,break:false,period:false},
  gameclock:{isEnable:false,titlestyle:'',valuestyle:'',value:'00:00',titlevalue:''},
  gameshotclock:{isEnable:false,titlestyle:'',valuestyle:'',value:'0',titlevalue:''},
  gameperiod:{isEnable:false,titlestyle:'',valuestyle:'',value:'2',titlevalue:'Period'},
  gameperiodtitle:{isEnable:false,titlestyle:'',valuestyle:'',value:'',titlevalue:''},
  gameclockbanner:{isEnable:false,titlestyle:'',valuestyle:'',value:'',titlevalue:''}
  };

  ngOnInit() {
    this.settingid = localStorage.getItem('setting');
    this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/scoreboards/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
            setTimeout(()=>{
               this.editimplies();
            },500);
          });
      }
    });
  }
  editimplies(){
    this.checkenable();
    this.shotcheckenable();
    this.periodcheckenable();
  }
  checkenable(){
    if(this.mForm.gameclock.isEnable){
      this.setgametitlestyler();
      this.setgamevaluestyler();
    }
  }
  shotcheckenable(){
    if(this.mForm.gameshotclock.isEnable){
      this.setshotvaluestyler();
      this.setshottitlestyler();
    }
  }
  periodcheckenable(){
    if(this.mForm.gameperiod.isEnable){
      this.setperiodvaluestyler();
      this.setperiodtitlestyler();
    }
  }
  // ngDoCheck(){
  //   this.setgametitlestyler();
  //   this.setgamevaluestyler();
  // }
  setgamevaluestyler(){
    if(document.getElementById('gameclockvalue'))
    document.getElementById('gameclockvalue').setAttribute('style',this.mForm.gameclock.valuestyle);
  }
  setgametitlestyler(){
    if(document.getElementById('gameclocktitle'))
    document.getElementById('gameclocktitle').setAttribute('style',this.mForm.gameclock.titlestyle);
  }
  setshotvaluestyler(){
    if(document.getElementById('shotclockvalue'))
    document.getElementById('shotclockvalue').setAttribute('style',this.mForm.gameshotclock.valuestyle);
  }
  setshottitlestyler(){
    if(document.getElementById('shotclocktitle'))
    document.getElementById('shotclocktitle').setAttribute('style',this.mForm.gameshotclock.titlestyle);
  }
  setperiodvaluestyler(){
    if(document.getElementById('periodvalue'))
    document.getElementById('periodvalue').setAttribute('style',this.mForm.gameperiod.valuestyle);
  }
  setperiodtitlestyler(){
    if(document.getElementById('periodtitle'))
    document.getElementById('periodtitle').setAttribute('style',this.mForm.gameperiod.titlestyle);
  }
  managesetting(gotdata) {
    gotdata.gamesettings = this.settingid;
    if (this.paramdetails) {
      this.http.patch(environment.api + '/scoreboards/' + this.userId, gotdata)
        .subscribe(result => {
          this.toastr.success('Scoreboard', 'Updated Successfully.');
          this.router.navigate(['/game_settings/scoreboards']);
        });
    }
    else {
      this.http.post(environment.api + '/scoreboards', gotdata)
        .subscribe(dt => {
          this.toastr.success('Scoreboard', 'Added Successfully.');
          this.router.navigate(['/game_settings/scoreboards']);
        });
    }
  }

}
