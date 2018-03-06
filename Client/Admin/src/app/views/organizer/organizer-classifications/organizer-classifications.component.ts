import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { AccessorService } from "../../../components/common/accessor.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { Subscription } from 'rxjs/Subscription';
import { OrganizerService } from '../../../components/services/organizer.service';

@Component({
  selector: 'app-organizer-classifications',
  templateUrl: './organizer-classifications.component.html',
  styleUrls: ['.././organizer.component.css']
})
export class OrganizerClassificationsComponent implements OnInit {
  public dtOptions;
  public rows: Array<any>;
  public dataRenderer = false; orgid;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public subscribe : Subscription;
  constructor(private http: Http,
              private toastr: ToastrService,
              private router: Router,
              public activeRouter: ActivatedRoute,
              private accr: AccessorService,
              public orgService : OrganizerService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, { "orderable": false }]
    };
    this.subscribe = this.orgService.getClassificationList().subscribe(res=>{
      this.rows = res;
    })
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerclassifications1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerclassifications2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerclassifications3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  edit(id){
    this.orgService.setClassificationData(id);
  }
  delClas(id) {
    var del = confirm("Confirm to delete this Classification!");
    if (del) {
      this.orgService.deleteClassificationData(id);
    }
  }

}
