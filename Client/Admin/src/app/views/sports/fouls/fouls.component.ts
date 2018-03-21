import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AccessorService } from "../../../components/common/accessor.service";
import { SportsService } from '../../../components/services/sports.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-fouls',
  templateUrl: './fouls.component.html',
  styleUrls: ['./fouls.component.css']
})
export class FoulsComponent implements OnInit {

  foulsdata; dtOptions; sptid;
  public dataRenderer = false;
  public subscription :Subscription;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;hasViewPerm;

  constructor(public http: HttpClient, 
              private router: Router, 
              private aroute: ActivatedRoute, 
              private toastr: ToastrService, 
              private accr: AccessorService,
              public sportService:SportsService) { }

  ngOnInit() {
    this.sptid = localStorage.getItem('sptid');
    this.gotcha();

  }
  gotcha() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null,null,null, { "orderable": false }]
    }
    this.subscription = this.sportService.getFoulssList().subscribe((res) => {
        this.dataRenderer = false;
        this.foulsdata = res;
        setTimeout(() => {
          this.dataRenderer = true;
        }, 200);
    });
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
       if (Object.keys(perms[z]).toString().toLowerCase() == "sportfouls0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasViewPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportfouls1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportfouls2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportfouls3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  edit(id){
    this.sportService.getSingleFoul(id);
  }
  deletemember(id) {
    var del = confirm("Delete this Foul?");
    if (del) {
      this.sportService.deleteFoul(id);
    }
  }
}
