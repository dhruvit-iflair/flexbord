import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Router,ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { AccessorService } from "../../../components/common/accessor.service";
import { GamesettingsService } from "../gamesettings.service";
import { ManagestructureComponent } from "./managestructure/managestructure.component";

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public dtOptions;settingid;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public modules = this.accr.getmodules();
  
  constructor(public http: Http, private router: Router, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private accr: AccessorService,private settingservice: GamesettingsService,public compodata: ManagestructureComponent) { }
  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null,null,null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
//    this.settingid = localStorage.getItem('setting');
    this.activatedRoute.params.subscribe(params => {
       this.settingid = params._id;
    this.http.get(environment.api + "/structures/bysetting/" + this.settingid)
      .subscribe((res) => {
        this.rows = res.json();
          this.length = this.rows.length;
          this.dataRenderer = true;
      });
    this.checkpermissions();
        });

  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingstructure1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingstructure2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "gamesettingstructure3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }

edtStr(id){
this.settingservice.editstructure(id).subscribe(res=>{
      var x=res.json();
      this.compodata.assigndata(x[0]);
      //this.compodata.mForm.playerconseq.name=x[0].playerconseq.name;
    });
}
  delClub(id){
      var del = confirm("Confirm to delete this Structure?");
      if (del) {
        this.http.delete(environment.api + "/structures/" + id)
          .subscribe((res) => {
            var d = res.json();
            if (d._id) {
              this.dataRenderer = false;
              this.toastr.success('Structure Deleted Successfully', 'Success');
              this.ngOnInit();
            }
          }, (error) => {
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
          });
      }
    }

}
