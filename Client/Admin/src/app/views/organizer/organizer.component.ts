import { Component, OnInit, ViewChild } from '@angular/core';
import { fakedb } from "../../components/common/fakedb";
import { TableData } from '../../components/common/table-data';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { AccessorService } from "../../components/common/accessor.service";
import { OrganizerService } from '../../components/services/organizer.service';
import { Subscription } from 'rxjs/Subscription';

// import { ConfirmService } from "../../components/services/confirm.services";
@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public dtOptions;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public hasMembersPerm;hasSeasonsPerm;hasClassificationsPerm;hasCompetitionsPerm;
  public subscription :Subscription;
  public picEnv = environment.picpoint+"orglogos/";
  constructor(public http: Http, private router: Router, private toastr: ToastrService,private accr: AccessorService,public orgService:OrganizerService ) {  }
  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, { "orderable": false }, null, null, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
  this.orgService.getAllOrganizers();
  this.subscription = this.orgService.getSingleOrganizersList().subscribe((res) => {
        this.rows = res;
        this.length = this.rows.length;
        this.dataRenderer =false;
        setTimeout(() => {
          this.dataRenderer =true;        
        }, 50);
      });
    this.checkpermissions();
  }
  movetomember(idx) {
    localStorage.setItem('orgid', idx);
    this.router.navigate(['/organizer/orgmembers']);
  }
  movetoseason(idq) {
    localStorage.setItem('orgid', idq);
    this.router.navigate(['/organizer/seasons']);
  }
  movetoclassification(idw) {
    localStorage.setItem('orgid', idw);
    this.router.navigate(['/organizer/classifications']);
  }
  movetocompetition(id) {
    localStorage.setItem('orgid', id);
    this.router.navigate(['/organizer/competitions']);
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizer1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizer2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizer3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerseasons0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasSeasonsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerclassifications0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasClassificationsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizercompetitions0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCompetitionsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizermembers0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasMembersPerm = true;
      }
    }
  }
  delOrg(id, index) {
    // var d = this.rows.findIndex(r => r._id == id);
    // this.rows.splice(d, 1);
    // this.confirmBox.display();
    var del = confirm("Confirm to delete this Organizer!");
    if (del) {
      this.orgService.deleteOrganizer(id);
    }
  }
}

