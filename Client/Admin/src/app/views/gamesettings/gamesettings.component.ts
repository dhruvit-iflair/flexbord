import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { AccessorService } from "../../components/common/accessor.service";

@Component({
  selector: 'app-gamesettings',
  templateUrl: './gamesettings.component.html',
  styleUrls: ['./gamesettings.component.css']
})
export class GamesettingsComponent implements OnInit {

  public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public dtOptions;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public modules = this.accr.getmodules();
  public hastimesettingPerm; hasconsequencesPerm; hasstructurePerm; hasplaylistPerm; hasscoreboardPerm;
  constructor(public http: Http, private router: Router, private toastr: ToastrService, private accr: AccessorService) { }
  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
    this.http.get(environment.api + "/gamesettings")
      .subscribe((res) => {
        this.rows = res.json();
        this.length = this.rows.length;
        this.dataRenderer = true;
      });
    this.checkpermissions();
  }
  movetotimesetting(idx) {
    localStorage.setItem('setting', idx);
    this.router.navigate(['/game_settings/timesetting']);
  }
  movetoconsequences(ix) {
    localStorage.setItem('setting', ix);
    this.router.navigate(['/game_settings/consequences']);
  }
  movetostructures(idr) {
    localStorage.setItem('setting', idr);
    this.router.navigate(['/game_settings/structures']);
  }
  movetoplaylists(idd) {
    localStorage.setItem('setting', idd);
    this.router.navigate(['/game_settings/playlists']);
  }
  movetoscoreboards(iid) {
    localStorage.setItem('setting', iid);
    this.router.navigate(['/game_settings/scoreboards']);
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesetting1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesetting2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesetting3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingtimesetting0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hastimesettingPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingstructure0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasstructurePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingscoreboard0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasscoreboardPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingconsequences0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasconsequencesPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingplaylist0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasplaylistPerm = true;
      }
    }
  }

  delClub(id) {
    var del = confirm("Confirm to delete this Setting?");
    if (del) {
      this.http.delete(environment.api + "/gamesettings/" + id)
        .subscribe((res) => {
          var d = res.json();
          if (d._id) {
            this.dataRenderer = false;
            this.toastr.success('Setting Deleted Successfully', 'Success');
            this.ngOnInit();
          }
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
  }
}
