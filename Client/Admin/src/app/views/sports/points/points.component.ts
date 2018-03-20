import { Component, OnInit , OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AccessorService } from "../../../components/common/accessor.service";
import { Subscription } from 'rxjs/Subscription';
import { SportsService } from '../../../components/services/sports.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  points; dtOptions; sptid;
  public dataRenderer = true;
  public subscription:Subscription;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;hasViewPerm;

  constructor(public http: HttpClient, 
              private router: Router, 
              private aroute: ActivatedRoute, 
              private toastr: ToastrService, 
              private accr: AccessorService,
              public sportService:SportsService) { }

  ngOnInit() {
    this.sptid = localStorage.getItem('sptid');
    this.gotcha();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  edit(id){
    this.sportService.getSinglePoint(id);
  }
  gotcha() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null,null, null, { "orderable": false }]
    }
    this.subscription = this.sportService.getPointsList().subscribe((res) => { 
      this.dataRenderer = false;
      this.points = res; 
      setTimeout(() => {
        this.dataRenderer = true;
      }, 150);
    });
    this.checkpermissions();
  }

  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
       if (Object.keys(perms[z]).toString().toLowerCase() == "sportpoints0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasViewPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportpoints1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportpoints2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportpoints3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  deletemember(id) {
    var del = confirm("Delete this Points?");
    if (del) {
      this.sportService.deletePoint(id);
    }
  }

}
