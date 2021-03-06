import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public dtOptions; manipulateddata; sportdt;
  public dataRenderer = false;

  constructor(public http: Http, private router: Router, private toastr: ToastrService) { }

  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
    this.sportdt = localStorage.getItem('4tPatcher');
      if (this.sportdt) {
        this.http.get(environment.api + "/clubtournaments/bysetting/" + this.sportdt)
          .subscribe((res) => {
            var x;
            this.manipulateddata = res.json();
            this.length = this.manipulateddata.length;
            this.http.get(environment.api + '/gamesettings/bysport/' + this.sportdt)
              .subscribe(res => {
                x = res.json();
                for (var z = 0; z < this.length; z++) {
                  this.manipulateddata[z].setting = x[z];
                  this.rows = this.manipulateddata;
                }
                this.dataRenderer = true;
              });
          });
      }
    }, 100);
  }
  delClub(id) {
    // var del = confirm("Confirm to delete this Setting?");
    // if (del) {
    //   this.http.delete(environment.api + "/gamesettings/" + id)
    //     .subscribe((res) => {
    //       var d = res.json();
    //       if (d._id) {
    //         this.dataRenderer = false;
    //         this.toastr.success('Setting Deleted Successfully', 'Success');
    //         this.ngOnInit();
    //       }
    //     }, (error) => {
    //       this.toastr.error('Something went wrong !! Please try again later', 'Error');
    //     });
    // }
  }

}
