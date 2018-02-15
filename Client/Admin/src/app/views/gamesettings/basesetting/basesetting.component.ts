import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-basesetting',
  templateUrl: './basesetting.component.html',
  styleUrls: ['./basesetting.component.css']
})
export class BasesettingComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public mForm = { sports: '', settings: '', settingname: '' };
  public sportsdata; settingsdata;paramdetails;userId;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/gamesettings/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
            this.mForm.sports = res[0].sports._id;
            if(res[0].settings)
            this.mForm.settings = res[0].settings._id;
          });
      }
    });
    this.initializedata();
  }
  initializedata() {
    this.http.get(environment.api + '/sports').subscribe(res => {
      this.sportsdata = res;
    });
    this.http.get(environment.api + '/gamesettings').subscribe(resp => {
      this.settingsdata = resp;
    });
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
