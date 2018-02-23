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
  public settingid; paramdetails; userId; addTeam = false;
  public mForm = {
    dispName: '', dispStyle: '', dispShownOn: { timeouts: false, break: false, period: false },
    gameclock: { isEnable: false, titlestyle: '', valuestyle: '', value: '00:00', titlevalue: '' },
    gameshotclock: { isEnable: false, titlestyle: '', valuestyle: '', value: '0', titlevalue: '' },
    gameperiodtitle: { isEnable: false, titlestyle: '', valuestyle: '', value: '', titlevalue: '' },
    teamslogo: { isEnable: true, titlestyle: '', valuestyle: '', value: '', titlevalue: '' },
    points: { isEnable: true, titlestyle: '', valuestyle: '', value: '00', titlevalue: '' },
    bonus: { isEnable: true, titlestyle: '', valuestyle: '', value: 'bonus', titlevalue: '' },
    fouls: { isEnable: true, titlestyle: '', valuestyle: '', value: '00', titlevalue: '' },
    timeouts: { isEnable: true, titlestyle: '', valuestyle: '', value: '00', titlevalue: '' },
    statistics: { isEnable: true, titlestyle: '', valuestyle: '', value: 'statistics', titlevalue: '' },
    playerpenlty: { isEnable: false, titlestyle: '', valuestyle: '', value: '', titlevalue: '' },
    directions: { isEnable: true, titlestyle: '', valuestyle: '', value: '', titlevalue: '' },
    pointstructure: { isEnable: false, titlestyle: '', valuestyle: '', value: '', titlevalue: '', blocksize: 3, blockheight: 0 }
  };
  temp=[];
  // gameperiod:{isEnable:false,titlestyle:'',valuestyle:'',value:'2',titlevalue:'Period'},
  // gameclockbanner:{isEnable:false,titlestyle:'',valuestyle:'',value:'',titlevalue:''}
  ngOnInit() {
    this.settingid = localStorage.getItem('setting');
    this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/scoreboards/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
            setTimeout(() => {
              this.editimplies();
            }, 500);
          });
      }
    });
  }
  structurepusher(){
    this.temp=[];
    for(var x=0;x<this.mForm.pointstructure.blocksize;x++){
      this.temp.push(x+1);
    }
  }
  editimplies() {
    this.checkenable();
    this.shotcheckenable();
    this.checkteamslogoenable();
    // this.periodcheckenable();
    this.checkpointsenable();
    this.checkfoulsenable();
    this.checkstatisticsenable();
    this.checktimeoutsenable();
    this.checkplayerpenltyenable();
    this.checkpointstructureenable();
  }
  checkenable() {
    if (this.mForm.gameclock.isEnable) {
      this.setgametitlestyler();
      this.setgamevaluestyler();
    }
  }
  shotcheckenable() {
    if (this.mForm.gameshotclock.isEnable) {
      this.setshotvaluestyler();
      this.setshottitlestyler();
    }
  }
  checkpointstructureenable(){
    if (this.mForm.pointstructure.isEnable) {
      this.structurepusher();
      this.setpointstructurevaluestyler();
      this.setpointstructuretitlestyler();
      this.setstructuralblock();
    }
  }
  checkteamslogoenable() {
    if (this.mForm.teamslogo.isEnable) {
      this.setteamslogovaluestyler();
      this.setteamslogotitlestyler();
    }
  }
  checkpointsenable() {
    if (this.mForm.points.isEnable) {
      this.setpointsvaluestyler();
      this.setpointstitlestyler();
    }
  }
  checkfoulsenable(){
    if (this.mForm.fouls.isEnable) {
      this.setfoulsvaluestyler();
      this.setfoulstitlestyler();
    }
  }
  checkstatisticsenable(){
    if (this.mForm.statistics.isEnable) {
      this.setstatisticsvaluestyler();
      this.setstatisticstitlestyler();
    }
  }
  checktimeoutsenable(){
    if (this.mForm.timeouts.isEnable) {
      this.settimeoutsvaluestyler();
      this.settimeoutstitlestyler();
    }
  }
  checkplayerpenltyenable(){
    if (this.mForm.playerpenlty.isEnable) {
      this.setplayerpenltyvaluestyler();
      this.setplayerpenltytitlestyler();
    }
  }
  // periodcheckenable(){
  //   if(this.mForm.gameperiod.isEnable){
  //     this.setperiodvaluestyler();
  //     this.setperiodtitlestyler();
  //   }
  // }
  // ngDoCheck(){
  //   this.setgametitlestyler();
  //   this.setgamevaluestyler();
  // }
  setpointstructuretitlestyler(){
    if (document.getElementById('teampointstructuretitle'))
      document.getElementById('teampointstructuretitle').setAttribute('style', this.mForm.pointstructure.titlestyle);
  }
  setpointstructurevaluestyler(){
    if (document.getElementById('teampointstructurevalue'))
      document.getElementById('teampointstructurevalue').setAttribute('style', this.mForm.pointstructure.valuestyle);
  }
  setstructuralblock(){
    if (document.getElementById('pointstructural'))
      document.getElementById('pointstructural').style.setProperty('height', ((35+this.mForm.pointstructure.blockheight).toString()+"%"));
  }
  setplayerpenltyvaluestyler(){

  }
  setplayerpenltytitlestyler(){
    if (document.getElementById('teamplayerpenltytitle'))
      document.getElementById('teamplayerpenltytitle').setAttribute('style', this.mForm.playerpenlty.titlestyle);
  }
  setpointsvaluestyler() {
    if (document.getElementById('teampointsvalue'))
      document.getElementById('teampointsvalue').setAttribute('style', this.mForm.points.valuestyle);
  }
  setpointstitlestyler() {
    if (document.getElementById('teampointstitle'))
      document.getElementById('teampointstitle').setAttribute('style', this.mForm.points.titlestyle);
  }

  setteamslogovaluestyler() {
    // if(document.getElementById('gameclockvalue')) not found in staging for reflect styles
    // document.getElementById('gameclockvalue').setAttribute('style',this.mForm.gameclock.valuestyle);
  }
  setteamslogotitlestyler() {
    if (document.getElementById('teamlogotitle'))
      document.getElementById('teamlogotitle').setAttribute('style', this.mForm.teamslogo.titlestyle);
  }

  setbonustitlestyler() {
    if (document.getElementById('teambonustitle'))
      document.getElementById('teambonustitle').setAttribute('style', this.mForm.bonus.titlestyle);
  }
  setbonusvaluestyler() {
    // if (document.getElementById('teambonustitle'))
    //   document.getElementById('teambonustitle').setAttribute('style', this.mForm.bonus.titlestyle);
  }

  setgamevaluestyler() {
    if (document.getElementById('gameclockvalue'))
      document.getElementById('gameclockvalue').setAttribute('style', this.mForm.gameclock.valuestyle);
  }
  setgametitlestyler() {
    if (document.getElementById('gameclocktitle'))
      document.getElementById('gameclocktitle').setAttribute('style', this.mForm.gameclock.titlestyle);
  }

  setshotvaluestyler() {
    if (document.getElementById('shotclockvalue'))
      document.getElementById('shotclockvalue').setAttribute('style', this.mForm.gameshotclock.valuestyle);
  }
  setshottitlestyler() {
    if (document.getElementById('shotclocktitle'))
      document.getElementById('shotclocktitle').setAttribute('style', this.mForm.gameshotclock.titlestyle);
  }
  // setperiodvaluestyler(){
  //   if(document.getElementById('periodvalue'))
  //   document.getElementById('periodvalue').setAttribute('style',this.mForm.gameperiod.valuestyle);
  // }
  setfoulsvaluestyler(){
    if (document.getElementById('teamfoulsvalue'))
      document.getElementById('teamfoulsvalue').setAttribute('style', this.mForm.fouls.valuestyle);
  }
  setfoulstitlestyler(){
    if (document.getElementById('teamfoulstitle'))
      document.getElementById('teamfoulstitle').setAttribute('style', this.mForm.fouls.titlestyle);
  }
  setperiodtitlestyler() {
    if (document.getElementById('periodtitle'))
      document.getElementById('periodtitle').setAttribute('style', this.mForm.gameperiodtitle.titlestyle);
  }

  setstatisticstitlestyler(){
    if (document.getElementById('teamstatisticstitle'))
      document.getElementById('teamstatisticstitle').setAttribute('style', this.mForm.statistics.titlestyle);
  }
  setstatisticsvaluestyler() {
    if (document.getElementById('teamstatisticsvalue'))
      document.getElementById('teamstatisticsvalue').setAttribute('style', this.mForm.statistics.valuestyle);
  }

  settimeoutstitlestyler(){
    if (document.getElementById('teamtimeoutstitle'))
      document.getElementById('teamtimeoutstitle').setAttribute('style', this.mForm.timeouts.titlestyle);
  }
  settimeoutsvaluestyler(){
     if (document.getElementById('teamtimeoutsvalue'))
       document.getElementById('teamtimeoutsvalue').setAttribute('style', this.mForm.timeouts.valuestyle);
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
