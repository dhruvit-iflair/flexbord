import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { dateFormatPipe } from "../../../components/pipes/dateFormate";
import { AccessorService } from "../../../components/common/accessor.service";

@Component({
  selector: 'app-club-seasons',
  templateUrl: './club-seasons.component.html',
  styleUrls: ['./club-seasons.component.css']
})
export class ClubSeasonsComponent implements OnInit {
  public dtOptions; clubid;
  public seasons: Array<any>;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  constructor(public http: Http, private toastr: ToastrService, private accr: AccessorService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, { "orderable": false }]
    };
    this.clubid = localStorage.getItem('clubid');
    this.http.get(environment.api + '/clubSeasons/byclub/' + this.clubid)
      .subscribe((res) => {
        this.seasons = res.json();
        this.dataRenderer = true;
      });
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
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
      this.http.delete(environment.api + "/clubSeasons/" + _id)
        .subscribe((res) => {
          var d = res.json();
          if (d._id) {
            this.dataRenderer = false;
            this.toastr.success('Season Deleted Successfully', 'Success');
            // this.router.navigate(['/organizer']);
            this.ngOnInit();
          }
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        })
    }
  }

}
