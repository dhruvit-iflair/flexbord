import { Component, OnInit ,OnDestroy} from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { AccessorService } from "../../../components/common/accessor.service";
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../../components/services/club.service';

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
  public subscription:Subscription;

  constructor(private http: Http, private toastr: ToastrService, private router: Router, public activeRouter: ActivatedRoute, private accr: AccessorService,public clubService:ClubService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, { "orderable": false }]
    };
    this.clubid = localStorage.getItem('clubid');
    this.subscription = this.clubService.getClassificationsList().subscribe((res) => {
        this.rows = res;
    });
    this.checkpermissions();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      this.clubService.deleteClassifications(id);
    }
  }
  edit(id){
    this.clubService.getSingleClassifications(id);
  }

}
