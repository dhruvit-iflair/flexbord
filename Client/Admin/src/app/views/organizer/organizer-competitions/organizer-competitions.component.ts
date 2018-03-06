import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { AccessorService } from "../../../components/common/accessor.service";
import { OrganizerService } from '../../../components/services/organizer.service';
import { Subscription } from 'rxjs/Subscription';

// declare var jQuery:any;
@Component({
  selector: 'app-organizer-competitions',
  templateUrl: './organizer-competitions.component.html',
  styleUrls: ['./organizer-competitions.component.css']
})
export class OrganizerCompetitionsComponent implements OnInit {
  public dtOptions;orgid;
  public rows :Array<any>;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public subscription :Subscription
  constructor(private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute,private accr: AccessorService,public orgService:OrganizerService) { }

  ngOnInit() {
    this.subscription = this.orgService.getCompetitionsList().subscribe(res=>{
        this.rows = res;
    })
    this.initializer();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  edit(id){
    this.orgService.editCompetition(id);
  }
  initializer(){
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{"visible":false},null,null,null,null,{ "orderable": false }]
    };
    this.orgid=localStorage.getItem('orgid');
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizercompetitions1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizercompetitions2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizercompetitions3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  delComp(id){
      var del = confirm("Confirm to delete this Competition!");
      if (del) {
          this.orgService.deleteCompetition(id);
      }
    }

}
