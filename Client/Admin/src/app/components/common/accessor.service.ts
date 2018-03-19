import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { modulerstack } from "../services/modules";
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AccessorService {
  modules = modulerstack.modules;
  public perms; haspermission; checker = [];
  constructor(private http: HttpClient) { }

  getCurrentUserPerm(roler) {
    return this.http.get(environment.api + '/permissions/byrole/' + roler);
  }
  getmodules() {
    return this.modules;
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('uToken'));
  }
  getUserPermissions() {
    this.setUserPermissions();//aana vina bhi chale add karayeli che for parallel perm check
    var x = JSON.parse(localStorage.getItem('fullPerms'));
    return x;
  }
  setUserPermissions() {
    if (localStorage.getItem('uToken')) {
      var x = JSON.parse(localStorage.getItem('uToken'));
      this.getCurrentUserPerm(x.user.roles).subscribe(res => {
        this.perms = res[0];
        this.checker = [];
        for (var pelu = 0; pelu < this.modules.length; pelu++) {
          if (this.perms.permissions[pelu]) {
            for (var biju = 0; biju < this.perms.permissions[pelu][this.modules[pelu]].length; biju++) {
              this.checker.push({ [[this.modules[pelu]] + biju.toString()]: this.perms.permissions[pelu][this.modules[pelu]][biju] });
            }
          }
          else{
            if(localStorage.getItem('uToken')){
              alert('Something Wrong with Assigned Permissions, Please Contact Your Administrator..');
              setTimeout(()=>{
                window.location.reload();
              },1500);
            }
          }
        }
        localStorage.setItem('fullPerms', JSON.stringify(this.checker));
      });
    }
  }
}
