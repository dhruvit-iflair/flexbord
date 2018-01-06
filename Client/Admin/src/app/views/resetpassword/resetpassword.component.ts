import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment'
import { Router } from "@angular/router";
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public username = '';
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
  }
  resetpwd(data) {
    if (data != '') {
      var xdt = {username: data};
      this.http.post(environment.api + '/users/resetpwd', xdt)
        .subscribe(data => {
          this.toastr.success('Password Reset Successfully. Check Your Mailbox!', 'Success');
          this.username = '';
        },error => {this.toastr.error('Contact your Administrator!', 'Server Error!!');});
    }
    else {
      this.toastr.warning('Can not be Empty', 'Email');
    }
  }

}
