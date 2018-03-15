import { Component, OnInit ,OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AccessorService } from "../../../components/common/accessor.service";
import { SportsService } from '../../../components/services/sports.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playerstatus',
  templateUrl: './playerstatus.component.html',
  styleUrls: ['./playerstatus.component.css']
})
export class PlayerstatusComponent implements OnInit {

  pstatus; dtOptions; sptid;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;hasViewPerm;
  public subscription : Subscription;
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
  gotcha() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null,null, { "orderable": false }]
    }
    this.subscription = this.sportService.getPlayesStatusList().subscribe((res) => {
        this.pstatus = res;
    });
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportplayerstatus0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasViewPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportplayerstatus1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportplayerstatus2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportplayerstatus3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  deletemember(id) {
    var del = confirm("Delete this Player status?");
    if (del) {
        this.sportService.deletePlayerStatus(id);
    }
  }
  edit(id){
    this.sportService.getSinglePlayerStatusBySport(id);
  }

}
