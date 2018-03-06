import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { dateFormatPipe } from "../../../components/pipes/dateFormate";
import { AccessorService } from "../../../components/common/accessor.service";
import { Subscription } from 'rxjs/Subscription';
import { OrganizerService } from '../../../components/services/organizer.service';
@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
  public dtOptions;
  public seasons: Array<any>;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public subscription: Subscription;
  constructor(public http: Http, private toastr: ToastrService, private accr: AccessorService,public orgService:OrganizerService ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, { "orderable": false }]
    };
    this.subscription = this.orgService.getSeasonList().subscribe(res=>{ this.seasons = res;})
    this.checkpermissions();
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  editSeason(id){
    this.orgService.setSingleSeasonData(id);
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerseasons1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerseasons2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerseasons3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  delOrg(_id) {
    var del = confirm("Confirm to delete this Season!");
    if (del) {
      this.orgService.deleteSeason(_id);
    }
  }

}
