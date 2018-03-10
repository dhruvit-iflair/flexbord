import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { AccessorService } from "../../../components/common/accessor.service";
import { GamesettingsService } from "../gamesettings.service";

@Component({
  selector: 'app-scoreboards',
  templateUrl: './scoreboards.component.html',
  styleUrls: ['./scoreboards.component.css']
})
export class ScoreboardsComponent implements OnInit {

  public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public dtOptions; settingid;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public modules = this.accr.getmodules();
  public paramdetails; userId; addTeam = false;
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
  temp = [];

  constructor(public http: Http, private router: Router, private toastr: ToastrService, private accr: AccessorService, private activatedRoute: ActivatedRoute, private settingservice: GamesettingsService) { }

  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
    //this.settingid = localStorage.getItem('setting');

    this.activatedRoute.params.subscribe(params => {
      this.settingid = params._id;
      this.http.get(environment.api + "/scoreboards/bysetting/" + this.settingid)
        .subscribe((res) => {
          this.rows = res.json();
          this.length = this.rows.length;
          this.dataRenderer = true;
        });
      this.checkpermissions();
    });
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingscoreboard1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingscoreboard2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingscoreboard3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  editboard(id) {
    this.settingservice.editsboard(id).subscribe(res => {
      var x = res.json();
      this.assigndata(x[0]);
    });
    // this.settingservice.getSingleScoreBord(id);
  }
  delClub(id) {
    var del = confirm("Confirm to delete this Setting?");
    if (del) {
      this.http.delete(environment.api + "/scoreboards/" + id)
        .subscribe((res) => {
          var d = res.json();
          if (d._id) {
            this.dataRenderer = false;
            this.toastr.success('Setting Deleted Successfully', 'Success');
            this.ngOnInit();
          }
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
  }
  structurepusher() {
    this.temp = [];
    for (var x = 0; x < this.mForm.pointstructure.blocksize; x++) {
      this.temp.push(x + 1);
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
  checkpointstructureenable() {
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
  checkfoulsenable() {
    if (this.mForm.fouls.isEnable) {
      this.setfoulsvaluestyler();
      this.setfoulstitlestyler();
    }
  }
  checkstatisticsenable() {
    if (this.mForm.statistics.isEnable) {
      this.setstatisticsvaluestyler();
      this.setstatisticstitlestyler();
    }
  }
  checktimeoutsenable() {
    if (this.mForm.timeouts.isEnable) {
      this.settimeoutsvaluestyler();
      this.settimeoutstitlestyler();
    }
  }
  checkplayerpenltyenable() {
    if (this.mForm.playerpenlty.isEnable) {
      this.setplayerpenltyvaluestyler();
      this.setplayerpenltytitlestyler();
    }
  }

  setpointstructuretitlestyler() {
    if (document.getElementById('teampointstructuretitle'))
      document.getElementById('teampointstructuretitle').setAttribute('style', this.mForm.pointstructure.titlestyle);
  }
  setpointstructurevaluestyler() {
    if (document.getElementById('teampointstructurevalue'))
      document.getElementById('teampointstructurevalue').setAttribute('style', this.mForm.pointstructure.valuestyle);
  }
  setstructuralblock() {
    if (document.getElementById('pointstructural'))
      document.getElementById('pointstructural').style.setProperty('height', ((35 + this.mForm.pointstructure.blockheight).toString() + "%"));
  }
  setplayerpenltyvaluestyler() {

  }
  setplayerpenltytitlestyler() {
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
  setfoulsvaluestyler() {
    if (document.getElementById('teamfoulsvalue'))
      document.getElementById('teamfoulsvalue').setAttribute('style', this.mForm.fouls.valuestyle);
  }
  setfoulstitlestyler() {
    if (document.getElementById('teamfoulstitle'))
      document.getElementById('teamfoulstitle').setAttribute('style', this.mForm.fouls.titlestyle);
  }
  setperiodtitlestyler() {
    if (document.getElementById('periodtitle'))
      document.getElementById('periodtitle').setAttribute('style', this.mForm.gameperiodtitle.titlestyle);
  }

  setstatisticstitlestyler() {
    if (document.getElementById('teamstatisticstitle'))
      document.getElementById('teamstatisticstitle').setAttribute('style', this.mForm.statistics.titlestyle);
  }
  setstatisticsvaluestyler() {
    if (document.getElementById('teamstatisticsvalue'))
      document.getElementById('teamstatisticsvalue').setAttribute('style', this.mForm.statistics.valuestyle);
  }

  settimeoutstitlestyler() {
    if (document.getElementById('teamtimeoutstitle'))
      document.getElementById('teamtimeoutstitle').setAttribute('style', this.mForm.timeouts.titlestyle);
  }
  settimeoutsvaluestyler() {
    if (document.getElementById('teamtimeoutsvalue'))
      document.getElementById('teamtimeoutsvalue').setAttribute('style', this.mForm.timeouts.valuestyle);
  }
  assigndata(xd) {
    this.userId = xd._id;
    this.addTeam = true;
    //localStorage.setItem('editmode', 'true');
    //   mForm = {
    //   dispName: '', dispStyle: '', dispShownOn: { timeouts: false, break: false, period: false },
    //   gameclock: { isEnable: false, titlestyle: '', valuestyle: '', value: '00:00', titlevalue: '' },
    //   gameshotclock: { isEnable: false, titlestyle: '', valuestyle: '', value: '0', titlevalue: '' },
    //   gameperiodtitle: { isEnable: false, titlestyle: '', valuestyle: '', value: '', titlevalue: '' },
    //   teamslogo: { isEnable: true, titlestyle: '', valuestyle: '', value: '', titlevalue: '' },
    //   points: { isEnable: true, titlestyle: '', valuestyle: '', value: '00', titlevalue: '' },
    //   bonus: { isEnable: true, titlestyle: '', valuestyle: '', value: 'bonus', titlevalue: '' },
    //   fouls: { isEnable: true, titlestyle: '', valuestyle: '', value: '00', titlevalue: '' },
    //   timeouts: { isEnable: true, titlestyle: '', valuestyle: '', value: '00', titlevalue: '' },
    //   statistics: { isEnable: true, titlestyle: '', valuestyle: '', value: 'statistics', titlevalue: '' },
    //   playerpenlty: { isEnable: false, titlestyle: '', valuestyle: '', value: '', titlevalue: '' },
    //   directions: { isEnable: true, titlestyle: '', valuestyle: '', value: '', titlevalue: '' },
    //   pointstructure: { isEnable: false, titlestyle: '', valuestyle: '', value: '', titlevalue: '', blocksize: 3, blockheight: 0 }
    // };
    this.mForm = xd;
    setTimeout(() => {
      this.editimplies();
    }, 1500);
    // this.mForm.dispName = xd.dispName;
    // this.mForm.dispStyle = xd.dispStyle;
    // this.mForm.dispStyle = xd.dispStyle;
    // this.mForm.dispShownOn = xd.dispShownOn;
    // this.mForm.gameclock = xd.gameclock;
    // this.mForm.gameshotclock = xd.gameshotclock;
    // this.mForm.gameperiodtitle = xd.gameperiodtitle;
    // if (xd.teamslogo) {
    //   this.mForm.teamslogo = xd.teamslogo;
    // }
    // if (xd.points) {
    //   this.mForm.points = xd.points;
    // }
    // if (xd.bonus) {
    //   this.mForm.bonus = xd.bonus;
    // }
    // if (xd.fouls) {
    //   this.mForm.fouls = xd.fouls;
    // }
    // if (xd.timeouts) {
    //   this.mForm.timeouts = xd.timeouts;
    // }
    // if (xd.statistics) {
    //   this.mForm.statistics = xd.statistics;
    // }
    // if (xd.playerpenlty) {
    //   this.mForm.playerpenlty = xd.playerpenlty;
    // }
    // if (xd.directions) {
    //   this.mForm.directions = xd.directions;
    // }
    // if (xd.pointstructure) {
    //   this.mForm.pointstructure = xd.pointstructure;
    // }
    // (document.getElementById("dispname") as HTMLInputElement).value = xd.dispName;
    // (document.getElementById("dispstyle") as HTMLInputElement).value = xd.dispStyle;

    // if (xd.dispShownOn.break == true) {
    //   (document.getElementById("dispshownonbreak") as HTMLInputElement).checked = true;
    // }
    // if (xd.dispShownOn.period == true) {
    //   (document.getElementById("dispshownonperiod") as HTMLInputElement).checked = true;
    // }
    // if (xd.dispShownOn.timeouts == true) {
    //   (document.getElementById("dispshownontimeout") as HTMLInputElement).checked = true;
    // }

    // if (xd.gameclock.isEnable == true) {
    //   (document.getElementById("gameclockenable") as HTMLInputElement).checked = true;
    // }
    // (document.getElementById("gameclocktitlestyle") as HTMLInputElement).value = xd.gameclock.titlestyle;
    // (document.getElementById("gameclockvaluestyle") as HTMLInputElement).value = xd.gameclock.valuestyle;
    // (document.getElementById("gameclocktitle") as HTMLInputElement).value = xd.gameclock.titlevalue;
    // (document.getElementById("gameclockvalue") as HTMLInputElement).value = xd.gameclock.value;
    // localStorage.setItem('editmode', 'true');
    // localStorage.setItem('uid', xd._id);
  }

  managesetting(gotdata) {
    gotdata.gamesettings = this.settingid;
    //var mode = localStorage.getItem('editmode');
    if (this.userId) {
      this.http.patch(environment.api + '/scoreboards/' + this.userId, gotdata)
        .subscribe(result => {
          localStorage.removeItem('editmode');
          this.toastr.success('Scoreboard', 'Updated Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
    else {
      this.http.post(environment.api + '/scoreboards', gotdata)
        .subscribe(dt => {
          this.toastr.success('Scoreboard', 'Added Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
  }
}
