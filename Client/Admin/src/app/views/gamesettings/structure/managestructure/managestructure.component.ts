import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-managestructure',
  templateUrl: './managestructure.component.html',
  styleUrls: ['./managestructure.component.css']
})
export class ManagestructureComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public settingid;paramdetails;userId;

public mForm={altname:{point:0,name:''},level:''};

  ngOnInit() {
    this.settingid = localStorage.getItem('setting');
      this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/structures/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
          });
      }
    });
  }
  managesetting(gotdata){
    gotdata.gamesettings=this.settingid;
        if (this.paramdetails) {
      this.http.patch(environment.api + '/structures/' + this.userId, gotdata)
        .subscribe(result => {
          this.toastr.success('Structures', 'Updated Successfully.');
          this.router.navigate(['/game_settings/structures']);
        });
    }
    else {
      this.http.post(environment.api + '/structures', gotdata)
        .subscribe(dt => {
          this.toastr.success('Structures', 'Added Successfully.');
          this.router.navigate(['/game_settings/structures']);
        });
    }
  }
}
