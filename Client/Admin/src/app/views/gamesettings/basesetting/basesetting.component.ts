import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { GamesettingsService } from "../gamesettings.service";
import { AccessorService } from "../../../components/common/accessor.service";

@Component({
  selector: 'app-basesetting',
  templateUrl: './basesetting.component.html',
  styleUrls: ['./basesetting.component.css']
})
export class BasesettingComponent implements OnInit {

  constructor(public http: HttpClient,private accr: AccessorService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute,public settingservice:GamesettingsService) { }
  public mForm = { sports: '', settings: '', settingname: '' };
  public sportsdata; settingsdata;paramdetails;userId;
  public hastimesettingPerm; hasconsequencesPerm; hasstructurePerm; hasplaylistPerm; hasscoreboardPerm;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.settingservice.getAllScoreBordsByGameSetting(this.userId);
        this.paramdetails = true;
        this.http.get(environment.api + '/gamesettings/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
            this.mForm.sports = res[0].sports._id;
            if(res[0].settings && res[0].settings!=null){
              this.mForm.settings = res[0].settings._id;
            }
            else{
              this.mForm.settings='';
            }
          });
      }
    });
    this.initializedata();
    this.checkpermissions();
  }
  initializedata() {
    this.http.get(environment.api + '/sports').subscribe(res => {
      this.sportsdata = res;
    });
    this.http.get(environment.api + '/gamesettings').subscribe(resp => {
      this.settingsdata = resp;
    });
  }
    checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingtimesetting0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hastimesettingPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingstructure0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasstructurePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingscoreboard0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasscoreboardPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingconsequences0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasconsequencesPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingplaylist0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasplaylistPerm = true;
      }
    }
  }
  managesetting(gotdata){
        if (this.paramdetails) {
      this.http.patch(environment.api + '/gamesettings/' + this.userId, gotdata)
        .subscribe(result => {
          this.toastr.success('Game Setting', 'Updated Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
    else {
      this.http.post(environment.api + '/gamesettings', gotdata)
        .subscribe(dt => {
          this.toastr.success('Game Setting', 'Added Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
  }
}
