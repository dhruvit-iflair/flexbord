import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-managestructure',
  templateUrl: './managestructure.component.html',
  styleUrls: ['./managestructure.component.css']
})
export class ManagestructureComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService,private accr: AccessorService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public settingid;paramdetails;userId;hasCreatePerm;

public sForm={altname:{point:0,name:''},level:''};

  ngOnInit() {
     this.activatedRoute.params.subscribe(params => {
       this.settingid = params._id;
     });
     this.checkpermissions();
    // this.settingid = localStorage.getItem('setting');
    //   this.activatedRoute.params.subscribe(params => {
    //   this.userId = params._id;
    //   if (this.userId) {
    //     this.paramdetails = true;
    //     this.http.get(environment.api + '/structures/' + this.userId)
    //       .subscribe(res => {
    //         this.sForm = res[0];
    //       });
    //   }
    // });
  }

    assigndata(xd){
    this.sForm=xd;
    (document.getElementById("aname") as HTMLInputElement).value=xd.altname.name;
    (document.getElementById("point") as HTMLInputElement).value=xd.altname.point;
    (document.getElementById("level") as HTMLInputElement).value=xd.level;

    localStorage.setItem('editmode','true');
    localStorage.setItem('uid',xd._id);
  }
checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingstructure1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
  }
  managesetting(gotdata){
     var mode=localStorage.getItem('editmode');
    var uid=localStorage.getItem('uid');
    gotdata.gamesettings=this.settingid;
    if (mode) {
      this.http.patch(environment.api + '/structures/' + uid, gotdata)
        .subscribe(result => {
          localStorage.removeItem('editmode');
          localStorage.removeItem('uid');
          this.toastr.success('Structures', 'Updated Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
    else {
      this.http.post(environment.api + '/structures', gotdata)
        .subscribe(dt => {
          this.toastr.success('Structures', 'Added Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
  }
}
