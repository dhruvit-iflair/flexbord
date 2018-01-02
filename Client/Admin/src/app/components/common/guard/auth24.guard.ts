import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Auth24Guard implements CanActivate {
  constructor(public reoter:Router, private toastr:ToastrService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem('uToken'))
      {
        var alford = JSON.parse(localStorage.getItem('uToken'));
        if (alford.user.isVerified == true) {
          return true; 
        } else {
          this.reoter.navigate(['/login']);
          this.toastr.warning('Account Not Verified', 'Please verify your Account.');
          return false;   
        }
      }
      else{
        this.reoter.navigate(['/login']);
        return false;
      }
  }
}
