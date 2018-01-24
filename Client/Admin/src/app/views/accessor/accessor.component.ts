import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AccessorService } from "../../components/common/accessor.service";

@Component({
  selector: 'app-accessor',
  templateUrl: './accessor.component.html',
  styleUrls: ['./accessor.component.css']
})
export class AccessorComponent implements OnInit {

  constructor(public http: HttpClient, private router: Router, private aroute: ActivatedRoute, private toastr: ToastrService, private accr:AccessorService ) { }
  public rolesdata; modules;
  public accessor={permissions:[],roles:''};
  
  ngOnInit() {
    this.http.get(environment.api + '/roles')
      .subscribe((res) => {
        this.rolesdata = res;
      });
      this.modules=this.accr.getmodules();
      for(var x=0;x<this.modules.length;x++){
        this.accessor.permissions.push({[this.modules[x]]:[false,false,false,false]});
      }
  }
  updatepermdata(data) {
    this.http.put(environment.api + "/permissions/byrole/"+this.accessor.roles, data)
      .subscribe((res) => {
        this.accr.setUserPermissions();
        this.toastr.success('Permissions Updated Successfully', 'Success');
        window.location.reload();
      }, (error) => {
        this.toastr.error('Something went wrong !! Please try again later', 'Error');
      });
  }
  getpermdata(getdata){
    this.http.get(environment.api+'/permissions/byrole/'+getdata)
    .subscribe(resp=>{
      this.accessor.permissions=resp[0].permissions;
    });
  }
}
