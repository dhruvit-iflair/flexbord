import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { AccessorService } from "../accessor.service";
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Auth24Guard implements CanActivate {
  public perm;
  constructor(public reoter:Router, private toastr:ToastrService, private accr:AccessorService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem('uToken'))
      {
        var alford = JSON.parse(localStorage.getItem('uToken'));
        if (alford.user.isVerified == true) {
          if (alford.user.isProfileSet == true) {
            return true;   
          } else { 
            this.reoter.navigate(['/profilesetup']);
            this.toastr.warning('Profile not set ', 'Please set your profile.');    
            return true;
          }          
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
