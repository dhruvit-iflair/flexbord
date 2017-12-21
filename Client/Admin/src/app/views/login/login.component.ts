import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'login',
    templateUrl: 'login.template.html'
})

export class loginComponent {
  public credential = {
    username: '',
    password: ''
  }
constructor(private router: Router, private http: HttpClient, private toastr:ToastrService) { }
ngOnInit(){
  if(localStorage.getItem('uToken')){
    localStorage.removeItem('uToken');
  }
}
    login(credential) {
    if (credential.username!=''||credential.password!='') {
      this.http.post(environment.api + '/login', credential)
        .subscribe(
        data => {
          this.toastr.success('Login Successfully.', 'Success');
          localStorage.setItem('uToken', JSON.stringify(data));
          this.router.navigate(['/profilesetup']);
        },
        error => {
          this.toastr.error('is incorrect', 'Email/Password');
        });
    }
    else {
      this.toastr.warning('Can not be Empty', 'Email/Password');
    }
  }
 }