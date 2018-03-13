import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { AccessorService } from "../../components/common/accessor.service";
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../components/services/club.service';
import { ConfirmBoxService } from '../../components/services/confirm-box.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public subscription: Subscription;
  public dtOptions;
  public dataRenderer = true;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public modules = this.accr.getmodules();
  public picEnv = environment.picpoint + 'clublogos/' ;
  public hasTeamsPerm;hasMembersPerm;hasSeasonsPerm;hasClassificationsPerm;
  constructor(public http: Http, public clubService: ClubService, private router: Router, private toastr: ToastrService, private accr: AccessorService,public conformService:ConfirmBoxService) { }
  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, { "orderable": false }, null, null, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
    this.clubService.getAllClubList();
    this.subscription = this.clubService.getClubList().subscribe((res) => {
        this.rows = res;
        this.length = this.rows.length;
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
      if (Object.keys(perms[z]).toString().toLowerCase() == "club1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "club2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "club3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubteams0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasTeamsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubmembers0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasMembersPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubseasons0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasSeasonsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubclassifications0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasClassificationsPerm = true;
      }
    }
  }

  movetomember(idx) {
    localStorage.setItem('clubid', idx);
    this.router.navigate(['/club/members']);
  }

  movetoseason(idq) {
    localStorage.setItem('clubid', idq);
    this.router.navigate(['/club/seasons']);
  }
  movetoteam(idx){
    localStorage.setItem('clubid', idx);
    this.router.navigate(['/club/clubteam']);
  }
  movetoclassification(idw) {
    localStorage.setItem('clubid', idw);
    this.router.navigate(['/club/classifications']);
  }
  movetotournament(idw) {
    localStorage.setItem('clubid', idw);
    this.router.navigate(['/club/tournaments']);
  }
  editClub(id){
    this.clubService.collectData(id);
    this.clubService.getSingleClub(id);
    this.router.navigate(['/club/manage/'+id]);
  }
  delClub(data){
    this.conformService.confirm({title:"Delete",text:'Do you want to delete '+ data.name +'?'},function(){
        this.clubService.deleteClub(data._id);
      },function(){

      })
    }
  }
