import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AccessorService } from "../../../components/common/accessor.service";
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../../components/services/club.service';

@Component({
  selector: 'app-club-members',
  templateUrl: './club-members.component.html',
  styleUrls: ['./club-members.component.css']
})
export class ClubMembersComponent implements OnInit {
  public members; 
  public dtOptions;
  public clubid;
  public dataRenderer = true;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;hasViewPerm;
  public subscription :Subscription;
  public picEnv = environment.picpoint+"clubMembersPhoto/";

  constructor(public http: HttpClient, 
              private router: Router, 
              private aroute: ActivatedRoute, 
              private toastr: ToastrService, 
              private accr: AccessorService,
              public clubService:ClubService) { }

  ngOnInit() {
    this.clubid = localStorage.getItem('clubid');
    this.subscription = this.clubService.getMembersList().subscribe((res) => { 
      this.members = res; 
      this.dataRenderer = false;
        setTimeout(() => {
          this.dataRenderer = true;
        }, 50);
    });    
    this.gotcha();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  gotcha(){
    this.dtOptions={
      pagingType:'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{ "visible":false },{ "orderable": false },null,null,null,null,null,{ "orderable": false }]
    }
    this.checkpermissions();
  }
  deletemember(id) {
    var del = confirm("Delete this Member?");
    if (del) {
      this.clubService.deleteMember(id);
    }
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubmembers0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasViewPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubmembers1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubmembers2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubmembers3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  changeStatusA(id) {
    this.clubService.changeStatusA(id);
  }
  changeStatusP(id) {
    this.clubService.changeStatusP(id);    
  }
  editMember(id){
    this.clubService.getSingleMember(id);
  }
}
