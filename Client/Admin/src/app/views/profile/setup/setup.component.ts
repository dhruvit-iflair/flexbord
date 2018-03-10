import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { UserService } from '../../../components/services/users';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { AccessorService } from "../../../components/common/accessor.service";

declare var jQuery: any;

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  public items: Array<any>;
  public value: any;
  public check = true;
  public organizer: Array<any>;
  public roles;

  constructor(public http: Http,
    public tost: ToastrService,
    private router: Router,
    private ussr:UserService,
    private accr:AccessorService) {
  }

  ngOnInit() {
    this.http.get(environment.api + '/organizer')
      .subscribe((res) => {
        this.items = res.json();
        this.organizer = res.json();
      })
    this.http.get(environment.api + '/roles')
      .subscribe((resp) => {
        this.roles = resp.json();
      })
    jQuery(document).ready(function () {
      jQuery('.js-example-basic-single').select2({
        placeholder: 'Select an Organizer',
        allowClear: true
      });
    });

  }
  public selected() {
    var t = jQuery('.js-example-basic-single').val();
    //console.log(t);

  }
  change(event) {
    //console.log(this.check);
    if (event.target.checked) {
      // jQuery('.js-example-basic-single').val('').trigger('change');
      // if (this.organizer) {

      // } else {

      // }
    }
  }
  assign(e) {

    if (this.organizer.length) {
      this.items = this.organizer;
      //console.log(this.check);
    }
    else {
      this.check = true;
      //console.log(this.check);
    }
  }
  updateProfile(z) {
    var x = JSON.parse(localStorage.getItem('uToken'));
    var roler = [z];
    var fdata = {
      isProfileSet: true,
      roles: roler
    };
    this.http.patch(environment.api + '/users/' + x.user._id, fdata)
      .subscribe((res) => {
        if (res) {
          this.tost.success('Profile Set Successfully', 'Success');
          var x = JSON.parse(localStorage.getItem('uToken'));
          x.user.isProfileSet = true;
          x.user.roles=roler
          localStorage.setItem('uToken', JSON.stringify(x));
          this.ussr.getRolesById(z).subscribe(res => {
            localStorage.setItem('roles', JSON.stringify(res[0]));
            this.accr.setUserPermissions();
            window.location.href = '../';
          })
        }
      })
  }
}

