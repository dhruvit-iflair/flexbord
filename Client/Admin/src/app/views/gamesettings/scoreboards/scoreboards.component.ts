import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { AccessorService } from "../../../components/common/accessor.service";
import { GamesettingsService } from "../gamesettings.service";
import { ManagescoreboardComponent } from "./managescoreboard/managescoreboard.component";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-scoreboards',
  templateUrl: './scoreboards.component.html',
  styleUrls: ['./scoreboards.component.css']
})
export class ScoreboardsComponent implements OnInit {

  public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public dtOptions; settingid;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public modules = this.accr.getmodules();
  public subscription:Subscription;

  constructor(public http: Http, private router: Router, private toastr: ToastrService, private accr: AccessorService, private activatedRoute: ActivatedRoute, private settingservice: GamesettingsService, public compodata: ManagescoreboardComponent) { }

  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
    //this.settingid = localStorage.getItem('setting');
    // this.http.get(environment.api + "/scoreboards/bysetting/" + this.settingid)
    this.activatedRoute.params.subscribe(params => {
      this.settingid = params._id;
       this.settingservice.getAllScoreBordsByGameSetting(this.settingid);
      this.subscription=this.settingservice.getScoreBordList()
        .subscribe((res) => {
          this.rows = res.json();
          this.length = this.rows.length;
          this.dataRenderer = true;
          console.log(this.rows);
        });
      this.checkpermissions();
    });
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingscoreboard1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingscoreboard2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingscoreboard3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  editboard(id){
    // this.settingservice.editsboard(id).subscribe(res=>{
    //   var x=res.json();
    //   this.compodata.assigndata(x[0]);
    // });
    this.settingservice.getSingleScoreBord(id);
  }
  delClub(id) {
    var del = confirm("Confirm to delete this Setting?");
    if (del) {
      this.http.delete(environment.api + "/scoreboards/" + id)
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
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
