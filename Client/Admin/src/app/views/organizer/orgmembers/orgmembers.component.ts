import { Component, OnInit ,OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AccessorService } from "../../../components/common/accessor.service";
import { Subscription } from 'rxjs/Subscription';
import { OrganizerService } from '../../../components/services/organizer.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-orgmembers',
  templateUrl: './orgmembers.component.html',
  styleUrls: ['./orgmembers.component.css']
})
export class OrgmembersComponent implements OnInit {
  members; dtOptions; orgid;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;hasViewPerm;
  public subscription: Subscription;
  dtTrigger: Subject<any> = new Subject();

  constructor(public http: HttpClient, private router: Router, private aroute: ActivatedRoute, private toastr: ToastrService, private accr: AccessorService,public orgService:OrganizerService) { }

  ngOnInit() {
    this.orgid = localStorage.getItem('orgid');
    this.subscription = this.orgService.getMembersList().subscribe(res =>{  
      this.members = res.json(); 
      this.dataRenderer =false;
      setTimeout(() => {
        this.dataRenderer =true;        
      }, 50)  
    });
    this.gotcha();
  }
  gotcha() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, { "orderable": false }]
    }
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizermembers0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasViewPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizermembers1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizermembers2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizermembers3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  deletemember(id) {
    var del = confirm("Delete this Member?");
    if (del) {
      this.orgService.deleteMember(id);
    }
  }
  editMember(id){
    this.orgService.setSingleMemberData(id);
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
