import { Component, OnInit ,Output,OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { OrganizerService } from '../../../../components/services/organizer.service';
import { Subscription } from 'rxjs/Subscription';
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  
  // public mForm = { emailAddress: '', status: 'pending', userType: 'organizeradmin' };
  public mForm = { emailAddress: '', userType: 'organizeradmin' };
  public paramdetails = false;
  public _id : any;
  public userId;
  public called = false;
  public hasCreatePerm;
  public subscription: Subscription;
  
  constructor(public http: HttpClient,private accr: AccessorService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute,public orgService:OrganizerService) { }

  ngOnInit() {
    this.subscription = this.orgService.getSingleMember().subscribe(res=>{ 
      this.mForm = res;
      this._id = res._id;
    });
    this.checkpermissions();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
      checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizermembers1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
  }
  addMember(gotdata) {
    if (!this.called) {
      this.called = true;
      var orid=localStorage.getItem('orgid');
      gotdata.organizer=orid;
      if (this._id) {
          this.orgService.updateMember(this._id,this.mForm);
          this.mForm.emailAddress = '';
          this.called = false;
          this._id = false;
      }
      else {
        this.orgService.saveMembers(gotdata);
        this.mForm.emailAddress = '';
        this.called = false;
      }
    }    
  }
}
