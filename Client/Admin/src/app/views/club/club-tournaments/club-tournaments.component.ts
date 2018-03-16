import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../../components/services/club.service';
import { AccessorService } from "../../../components/common/accessor.service";


@Component({
  selector: 'app-club-tournaments',
  templateUrl: './club-tournaments.component.html',
  styleUrls: ['./club-tournaments.component.css']
})
export class ClubTournamentsComponent implements OnInit {

  public dtOptions;clubid;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;hasViewPerm;
  public rows :Array<any>;
  public dataRenderer = true;
  public subscription:Subscription;
  constructor(private http : Http, private toastr : ToastrService,private accr: AccessorService, private router: Router,public activeRouter:ActivatedRoute,public clubService:ClubService) { }

  ngOnInit() {
    this.initializer();
    this.subscription = this.clubService.getTournamentsList().subscribe(res=>{ 
      this.rows = res; 
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
       if (Object.keys(perms[z]).toString().toLowerCase() == "clubtournaments0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasViewPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubtournaments1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubtournaments2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubtournaments3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  initializer(){
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{"visible":false},null,null,null,null,{ "orderable": false }]
    };
    this.clubid=localStorage.getItem('clubid');
  }
  delTour(id){
      var del = confirm("Confirm to delete this Tournament!");
      if (del) {
        this.clubService.deleteTournaments(id);
      }
  }
  edit(id){
    this.clubService.getSingleTournaments(id);
  }
}
