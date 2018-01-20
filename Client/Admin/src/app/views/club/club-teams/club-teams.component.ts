import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute,Params } from "@angular/router";
import { AccessorService } from "../../../components/common/accessor.service";

@Component({
  selector: 'app-club-teams',
  templateUrl: './club-teams.component.html',
  styleUrls: ['./club-teams.component.css']
})
export class ClubTeamsComponent implements OnInit {

teams;dtOptions;clubid;
  public dataRenderer=false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public picpoint=environment.picpoint+'clubteamlogos/';
  constructor(public http: HttpClient,private router: Router,private aroute:ActivatedRoute, private toastr: ToastrService, private accr: AccessorService) { }

  ngOnInit() {
    this.clubid=localStorage.getItem('clubid');
    this.gotcha();
  }
  gotcha(){
    this.dtOptions={
      pagingType:'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{ "visible":false },null,null,null,{ "orderable": false }]
    }
    this.http.get(environment.api + '/clubteams/byclub/'+this.clubid)
      .subscribe((res) => {
        this.teams = res;
        this.dataRenderer=true;
      });
    this.checkpermissions();
  }
  deleteteam(id){
    var del = confirm("Delete this Member?");
    if (del) {
      this.http.delete(environment.api +"/clubteams/"+id)
              .subscribe((res)=>{
                if (res) {
                  this.dataRenderer=false;
                  this.toastr.success('Member Deleted Successfully', 'Success');
                }
                this.gotcha();
              },(error)=>{
                this.toastr.error('Something went wrong !! Please try again later', 'Error');
              });
    }
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubteams1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubteams2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubteams3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
}
