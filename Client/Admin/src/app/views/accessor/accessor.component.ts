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

  constructor(public http: HttpClient, private router: Router, private aroute: ActivatedRoute, private toastr: ToastrService, private accr: AccessorService) { }
  public rolesdata; modules;
  public accessor = { permissions: [], roles: '' };
  public checkview = false; checkdel = false; checkedit = false; checkcreate = false;
  ngOnInit() {
    this.http.get(environment.api + '/roles')
      .subscribe((res) => {
        this.rolesdata = res;
      });
    this.modules = this.accr.getmodules();
    for (var x = 0; x < this.modules.length; x++) {
      this.accessor.permissions.push({ [this.modules[x]]: [false, false, false, false] });
    }
  }
  checkviewperm() {
    var tp;
    if (this.checkview == true) {
      tp = false;
    }
    else {
      tp = true;
    }
    this.checkview = tp;
    for (var p = 0; p < this.modules.length; p++) {
      this.accessor.permissions[p][Object.keys(this.accessor.permissions[p]).toString()][0] = tp;
    }
  }
  checkcreateperm() {
    var tp;
    if (this.checkcreate == true) {
      tp = false;
    }
    else {
      tp = true;
    }
    this.checkcreate = tp;
    for (var p = 0; p < this.modules.length; p++) {
      this.accessor.permissions[p][Object.keys(this.accessor.permissions[p]).toString()][1] = tp;
    }
  }
  checkeditperm() {
    var tp;
    if (this.checkedit == true) {
      tp = false;
    }
    else {
      tp = true;
    }
    this.checkedit = tp;
    for (var p = 0; p < this.modules.length; p++) {
      this.accessor.permissions[p][Object.keys(this.accessor.permissions[p]).toString()][2] = tp;
    }
  }
  checkdelperm() {
    var tp;
    if (this.checkdel == true) {
      tp = false;
    }
    else {
      tp = true;
    }
    this.checkdel = tp;
    for (var p = 0; p < this.modules.length; p++) {
      this.accessor.permissions[p][Object.keys(this.accessor.permissions[p]).toString()][3] = tp;
    }
  }
  updatepermdata(data) {
    this.http.put(environment.api + "/permissions/byrole/" + this.accessor.roles, data)
      .subscribe((res) => {
        this.accr.setUserPermissions();
        this.toastr.success('Permissions Updated Successfully', 'Success');
        window.location.reload();
      }, (error) => {
        this.toastr.error('Something went wrong !! Please try again later', 'Error');
      });
  }
  getpermdata(getdata) {
    var viewer = 0, creater = 0, editer = 0, deleter = 0;
    this.checkcreate=false;this.checkdel=false;this.checkview=false;this.checkedit=false;
    this.http.get(environment.api + '/permissions/byrole/' + getdata)
      .subscribe(resp => {
        this.accessor.permissions = resp[0].permissions;
        for (var p = 0; p < this.modules.length; p++) {
          if (this.accessor.permissions[p][Object.keys(this.accessor.permissions[p]).toString()][0] == true) {
            viewer++;
          }
          if (this.accessor.permissions[p][Object.keys(this.accessor.permissions[p]).toString()][1] == true) {
            creater++;
          }
          if (this.accessor.permissions[p][Object.keys(this.accessor.permissions[p]).toString()][2] == true) {
            editer++;
          }
          if (this.accessor.permissions[p][Object.keys(this.accessor.permissions[p]).toString()][3] == true) {
            deleter++;
          }
        }
        if (this.accessor.permissions.length == viewer) {
          this.checkview = true;
        }
        if (this.accessor.permissions.length == creater) {
          this.checkcreate = true;
        }
        if (this.accessor.permissions.length == editer) {
          this.checkedit = true;
        }
        if (this.accessor.permissions.length == deleter) {
          this.checkdel = true;
        }
      });
  }
}
