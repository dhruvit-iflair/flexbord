import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-managetimesetting',
  templateUrl: './managetimesetting.component.html',
  styleUrls: ['./managetimesetting.component.css']
})
export class ManagetimesettingComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public settingid;paramdetails;userId;

public mForm={shotclock:0,foulshotclock:0,periodsclockdesc:false,timeouttype:"overall",pregameduration:0,pregamebreak:0,pregametimeoutamount:0,pregametimeoutduration:0,postgameduration:0,postgamebreak:0,postgametimeoutamount:0,postgametimeoutduration:0,
    periodx:{duration:0,break:0,autostop:false,amount:0,timeoutduration:0},overtimeclockdesc:false,pointsaccumulative:false,penalty:false,noofperiods:0,repeatable:false,overtimepregameduration:0,overtimepregamebreak:0,overtimepostgameduration:0,overtimepostgamebreak:0}

  ngOnInit() {
    this.settingid = localStorage.getItem('setting');
      this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/timesettings/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
            this.mForm.periodx=res[0].periodx[0];
          });
      }
    });
  }
  addpenalty(){
    this.toastr.warning("Add Penalties!!!","Added!");
  }
  addperiod(){
    this.toastr.error("Add Periods!!!","Added!");
  }
  managesetting(gotdata){
    gotdata.gamesettings=this.settingid;
        if (this.paramdetails) {
      this.http.patch(environment.api + '/timesettings/' + this.userId, gotdata)
        .subscribe(result => {
          this.toastr.success('Time Setting', 'Updated Successfully.');
          this.router.navigate(['/game_settings/timesetting']);
        });
    }
    else {
      this.http.post(environment.api + '/timesettings', gotdata)
        .subscribe(dt => {
          this.toastr.success('Time Setting', 'Added Successfully.');
          this.router.navigate(['/game_settings/timesetting']);
        });
    }
  }
}
