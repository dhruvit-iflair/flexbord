import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment'
import { Router } from "@angular/router";


@Component({
    selector: 'register',
    templateUrl: 'register.template.html'
})
export class registerComponent {
    public matched=true;
  public Ruser = {
    username: '',
    password: '',
    cpassword: '',
    isAgreemented:false
  }
constructor(private router: Router, private http: HttpClient, private toastr:ToastrService) { }

pwdchecker(){
    if(this.Ruser.password===this.Ruser.cpassword){
        this.matched=false;
    }
    else{
        this.matched=true;
    }
}
   Registeration(data){
       if(this.matched){
           this.toastr.error('Password & Confirm Password not matched', 'Incorrect');
           return;
       }
       if(data.username!='' && data.password!='' && data.cpassword!='' && data.isAgreemented!==false){
           this.http.post(environment.api+'/users',data)
           .subscribe(dt=>{
               this.toastr.success('User Registered Successfully. Please Check your mailbox..', 'Verify your Account!');
               this.router.navigate(['/login']);
           });

       }
       else{
           this.toastr.error('Fields Can not be Empty', 'Incorrect');
       }
    }
 }