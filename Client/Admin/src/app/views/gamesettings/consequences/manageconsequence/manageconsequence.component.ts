import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-manageconsequence',
  templateUrl: './manageconsequence.component.html',
  styleUrls: ['./manageconsequence.component.css']
})
export class ManageconsequenceComponent implements OnInit {

  constructor(public http: HttpClient,private accr: AccessorService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public settingid; paramdetails; userId; settingsfouldata;hasCreatePerm;
  public mForm = { playerconseq: { name: '', color: '', type: '', value: 0 }, teamfaults: { faulttype: '', type: '', value: 0 } }

  ngOnInit() {
    //this.settingid = localStorage.getItem('setting');
     this.activatedRoute.params.subscribe(params => {
       this.settingid = params._id;
    //   if (this.userId) {
    //     this.paramdetails = true;
    //     this.http.get(environment.api + '/consequences/' + this.userId)
    //       .subscribe(res => {
    //         this.mForm = res[0];
    //       });
    //   }
    this.http.get(environment.api + '/gamesettings/' + this.settingid)
      .subscribe(sportsrespo => {
        if (sportsrespo) {
          this.http.get(environment.api + '/sportfouls/bysport/' + sportsrespo[0].sports._id)
            .subscribe(foulrespo => {
              this.settingsfouldata = foulrespo;
            });
        }
      });
     });
     this.checkpermissions();
  }
    checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingconsequences1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
  }
  assigndata(xd){
    // var vm=this;
    // //localStorage.setItem('editmodeconseq',xd);
    // vm.mForm.playerconseq.name=xd.playerconseq.name;
    this.mForm=xd;
    (document.getElementById("name") as HTMLInputElement).value=xd.playerconseq.name;
    (document.getElementById("color") as HTMLInputElement).value=xd.playerconseq.color;
    (document.getElementById("pctype") as HTMLInputElement).value=xd.playerconseq.type;
    (document.getElementById("pcvalue") as HTMLInputElement).value=xd.playerconseq.value;
    if(xd.teamfaults.faulttype=='game'){
      (document.getElementById("faulttype2") as HTMLInputElement).checked=true;
    }
    else{
      (document.getElementById("faulttype") as HTMLInputElement).checked=true;
    }
    
    (document.getElementById("tftype") as HTMLInputElement).value=xd.teamfaults.type._id;
    (document.getElementById("tfvalue") as HTMLInputElement).value=xd.teamfaults.value;
    localStorage.setItem('editmode','true');
    localStorage.setItem('uid',xd._id);
    // //this.mForm.playerconseq.type=xd.playerconseq.type._id;
    // console.log('form binders:'+JSON.stringify(this.mForm));
  }
  managesetting(gotdata) {
    var mode=localStorage.getItem('editmode');
    var uid=localStorage.getItem('uid')
    gotdata.gamesettings = this.settingid;
    if (mode) {
      this.http.patch(environment.api + '/consequences/' + uid, gotdata)
        .subscribe(result => {
          localStorage.removeItem('editmode');
          localStorage.removeItem('uid');
          this.toastr.success('Consequences', 'Updated Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
    else {
      this.http.post(environment.api + '/consequences', gotdata)
        .subscribe(dt => {
          this.toastr.success('Consequences', 'Added Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
  }

}
