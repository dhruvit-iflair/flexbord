import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-manageconsequence',
  templateUrl: './manageconsequence.component.html',
  styleUrls: ['./manageconsequence.component.css']
})
export class ManageconsequenceComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public settingid; paramdetails; userId; settingsfouldata;
  public mForm = { playerconseq: { name: '', color: '', type: '', value: 0 }, teamfaults: { faulttype: '', type: '', value: 0 } }

  ngOnInit() {
    this.settingid = localStorage.getItem('setting');
    this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/consequences/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
          });
      }
    });
    this.http.get(environment.api + '/gamesettings/' + this.settingid)
      .subscribe(sportsrespo => {
        if (sportsrespo) {
          this.http.get(environment.api + '/sportfouls/bysport/' + sportsrespo[0].sports._id)
            .subscribe(foulrespo => {
              this.settingsfouldata = foulrespo;
            });
        }
      });
  }
  managesetting(gotdata) {
    gotdata.gamesettings = this.settingid;
    if (this.paramdetails) {
      this.http.patch(environment.api + '/consequences/' + this.userId, gotdata)
        .subscribe(result => {
          this.toastr.success('Consequences', 'Updated Successfully.');
          this.router.navigate(['/game_settings/consequences']);
        });
    }
    else {
      this.http.post(environment.api + '/consequences', gotdata)
        .subscribe(dt => {
          this.toastr.success('Consequences', 'Added Successfully.');
          this.router.navigate(['/game_settings/consequences']);
        });
    }
  }

}
