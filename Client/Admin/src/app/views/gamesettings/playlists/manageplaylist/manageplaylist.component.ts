import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-manageplaylist',
  templateUrl: './manageplaylist.component.html',
  styleUrls: ['./manageplaylist.component.css']
})
export class ManageplaylistComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public settingid;paramdetails;userId;

public mForm={altname:{},level:''};

  ngOnInit() {
    this.settingid = localStorage.getItem('setting');
      this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/playlists/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
          });
      }
    });
  }
  managesetting(gotdata){
    gotdata.gamesettings=this.settingid;
        if (this.paramdetails) {
      this.http.patch(environment.api + '/playlists/' + this.userId, gotdata)
        .subscribe(result => {
          this.toastr.success('Playlists', 'Updated Successfully.');
          this.router.navigate(['/game_settings/playlists']);
        });
    }
    else {
      this.http.post(environment.api + '/playlists', gotdata)
        .subscribe(dt => {
          this.toastr.success('Playlists', 'Added Successfully.');
          this.router.navigate(['/game_settings/playlists']);
        });
    }
  }

}
