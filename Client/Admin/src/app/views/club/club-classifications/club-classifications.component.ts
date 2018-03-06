import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { AccessorService } from "../../../components/common/accessor.service";

@Component({
  selector: 'app-club-classifications',
  templateUrl: './club-classifications.component.html',
  styleUrls: ['./club-classifications.component.css']
})
export class ClubClassificationsComponent implements OnInit {
  public dtOptions;
  public rows: Array<any>;
  public dataRenderer = false; clubid;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;

  constructor(private http: Http, private toastr: ToastrService, private router: Router, public activeRouter: ActivatedRoute, private accr: AccessorService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, { "orderable": false }]
    };
    this.clubid = localStorage.getItem('clubid');
    this.http.get(environment.api + '/clubClassifications/byclub/' + this.clubid)
      .subscribe((res) => {
        this.rows = res.json();
        this.dataRenderer = true;
      }, (error) => {
        this.toastr.error('Error!! Something went wrong! try again later', 'Error');
      });
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubclassifications1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubclassifications2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubclassifications3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  delClas(id) {
    var del = confirm("Confirm to delete this Classifications!");
    if (del) {
      this.http.delete(environment.api + "/clubClassifications/" + id)
        .subscribe((res) => {
          var d = res.json();
          if (d._id) {
            this.dataRenderer = false;
            this.toastr.success('Classifications Deleted Successfully', 'Success');
            // this.router.navigate(['/organizer']);
            this.ngOnInit();
          }
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        })
    }
  }

}
