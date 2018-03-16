import { Component, OnInit, ViewEncapsulation ,OnDestroy} from '@angular/core';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Subscription } from 'rxjs/Subscription';
import { SportsService } from '../../../../components/services/sports.service';
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-managescore',
  templateUrl: './managescore.component.html',
  styleUrls: ['./managescore.component.css']
})
export class ManagescoreComponent implements OnInit {
  public _id:any;
  public userId;
  public hasCreatePerm;
  public former = { wins: 0, draws: 0, losses: 0};
  public subscription : Subscription;
  constructor(private http: Http, 
              private toastr: ToastrService, 
              private router: Router, 
              private accr: AccessorService,
              public activeRouter: ActivatedRoute,
              public sportService:SportsService) { }

  ngOnInit() {
    this.subscription = this.sportService.getScoreList().subscribe(res=>{
      if (res) {
        this.former = res[0];
        this._id = res[0]._id; 
      }
    })
    this.checkpermissions();
  }
  reset(){
    this.former = { wins: 0, draws: 0, losses: 0};
    this._id = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportscores2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
  }
  savedata(gotcha) {
    var sptid = localStorage.getItem('sptid');
    var janudata = gotcha;
    janudata.sports = sptid;
    if (this._id) {
        this.sportService.updateScore(this._id,janudata);
        this.reset();
    }
    else {
      this.sportService.saveScore(janudata);
      this.reset();      
    }
  }
}
