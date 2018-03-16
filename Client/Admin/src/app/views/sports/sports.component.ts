import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { AccessorService } from "../../components/common/accessor.service";
import { Subscription } from 'rxjs/Subscription';
import { SportsService } from '../../components/services/sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public dtOptions;
  public dataRenderer = true;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public modules = this.accr.getmodules();
  public subscripton:Subscription
  public hasTeamsPerm;hasMembersPerm;hasSeasonsPerm;hasClassificationsPerm;hasPointsPerm;hasStatusPerm;hasScoresPerm;hasFoulsPerm;
  constructor(public http: Http,
              private router: Router,
              private toastr: ToastrService,
              private accr: AccessorService,
              public sportService:SportsService) { }
  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
    this.sportService.getAllSports();
    this.subscripton = this.sportService.getSportsList().subscribe((res) => {
        this.dataRenderer = false;
        this.rows = res;
        this.length = this.rows.length;
        setTimeout(() => {
          this.dataRenderer = true;
        }, 200);
    });
    this.checkpermissions();
  }
  edit(id){
    this.sportService.setSportsID(id);
    this.router.navigate(['/sports/manage/'+id]);
  };
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "sport1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sport2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sport3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportpoints0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasPointsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportplayerstatus0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasStatusPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportscores0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasScoresPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportfouls0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasFoulsPerm = true;
      }
    }
  }

  movetopoints(idx) {
    localStorage.setItem('sptid', idx);
    this.router.navigate(['/sports/points']);
  }

  movetostatus(idq) {
    localStorage.setItem('sptid', idq);
    this.router.navigate(['/sports/playerstatus']);
  }
  movetoscores(idx){
    localStorage.setItem('sptid', idx);
    this.router.navigate(['/sports/scores']);
  }
  movetofouls(idw) {
    localStorage.setItem('sptid', idw);
    this.router.navigate(['/sports/fouls']);
  }
  delClub(id){
      var del = confirm("Confirm to delete this Sport?");
      if (del) {
        this.sportService.deleteSport(id);
      }
    }
}
