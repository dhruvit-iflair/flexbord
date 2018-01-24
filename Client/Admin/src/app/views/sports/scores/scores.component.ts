import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AccessorService } from "../../../components/common/accessor.service";

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  scores; dtOptions; sptid;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;

  constructor(public http: HttpClient, private router: Router, private aroute: ActivatedRoute, private toastr: ToastrService, private accr: AccessorService) { }

  ngOnInit() {
    this.sptid = localStorage.getItem('sptid');
    this.gotcha();
  }
  gotcha() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, { "orderable": false }]
    }
    this.http.get(environment.api + '/sportscores/bysport/' + this.sptid)
      .subscribe((res) => {
        this.scores = res;
        this.dataRenderer = true;
      });
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "scores1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "scores2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "scores3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  deletemember(id) {
    var del = confirm("Delete this ranking score?");
    if (del) {
      this.http.delete(environment.api + "/sportscores/" + id)
        .subscribe((res) => {
          if (res) {
            this.dataRenderer = false;
            this.toastr.success('Score Deleted Successfully', 'Success');
          }
          this.gotcha();
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
  }

}
