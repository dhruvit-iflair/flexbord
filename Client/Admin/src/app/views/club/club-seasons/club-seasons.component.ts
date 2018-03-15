import { Component, OnInit,OnDestroy } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { dateFormatPipe } from "../../../components/pipes/dateFormate";
import { AccessorService } from "../../../components/common/accessor.service";
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../../components/services/club.service';

@Component({
  selector: 'app-club-seasons',
  templateUrl: './club-seasons.component.html',
  styleUrls: ['./club-seasons.component.css']
})
export class ClubSeasonsComponent implements OnInit {
  public dtOptions; clubid;
  public seasons: Array<any>;
  public dataRenderer = true;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;hasViewPerm;
  public subscription :Subscription
  constructor(public http: Http, private toastr: ToastrService, private accr: AccessorService,public clubService:ClubService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, { "orderable": false }]
    };
    this.clubid = localStorage.getItem('clubid');
    this.subscription = this.clubService.getSeasonList().subscribe((res) => { 
      this.seasons = res;
      this.dataRenderer = false;
        setTimeout(() => {
          this.dataRenderer = true;
        }, 50);
    });
    this.checkpermissions();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
       if (Object.keys(perms[z]).toString().toLowerCase() == "clubseasons0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasViewPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubseasons1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubseasons2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubseasons3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  delOrg(_id) {
    var del = confirm("Confirm to delete this Season!");
    if (del) {
      this.clubService.deleteSeason(_id);
    }
  }
  edit(id){
    this.clubService.getSingleSeason(id);
  }

}
