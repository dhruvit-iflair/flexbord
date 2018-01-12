import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment'
import { Router, ActivatedRoute,Params } from "@angular/router";
@Component({
  selector: 'app-old-resetpassword',
  templateUrl: './old.resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class oldResetpasswordComponent implements OnInit {
  public R = {username:'',password:'',cpassword:''};
  constructor(private router: Router, private http: HttpClient, private ar:ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.R.username=this.ar.snapshot.queryParams["ref"];
    var xdt = {username: this.R.username};
    this.http.post(environment.api + '/users/checkexplink', xdt)
        .subscribe(data => {
          this.toastr.error('Your reset password link expired.', 'Error');
          this.router.navigate(['/resetpassword']);
        },error => {this.toastr.error('Contact your Administrator!', 'Server Error!!');});
  }
  resetpwd(data) {
    if (data.password != '') {
      var xdt = {username: this.R.username,npd:data.password};
      this.http.post(environment.api + '/users/setpwd', xdt)
        .subscribe(data => {
          this.R.username = '';
          this.R.password = '';
          this.R.cpassword = '';
          if(data!='Password Reset Successfully.'){
            this.toastr.error('Your reset password link expired.', 'Error');
            this.router.navigate(['/resetpassword']);
          }
          else{
            this.toastr.success('Password Reset Successfully.', 'Success');
            this.router.navigate(['/login']);
          }
        },error => {
          console.log(error);
          this.toastr.error('Contact your Administrator!', 'Server Error!!');
        });
    }
    else {
      this.toastr.warning('Fields Can not be Empty', 'Email/Password');
    }
  }

}
