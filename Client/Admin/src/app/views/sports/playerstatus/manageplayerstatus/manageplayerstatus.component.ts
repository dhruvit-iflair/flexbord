import { Component, OnInit, ViewEncapsulation ,OnDestroy} from '@angular/core';
import { fakedb } from "../../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';
import { Subscription } from 'rxjs/Subscription';
import { SportsService } from '../../../../components/services/sports.service';

@Component({
  selector: 'app-manageplayerstatus',
  templateUrl: './manageplayerstatus.component.html',
  styleUrls: ['./manageplayerstatus.component.css']
})
export class ManageplayerstatusComponent implements OnInit {
  public _id :any;
  public userId;
  public former = { playerstatus: '', colorbtnup: '', colorbtndown: '', hidefromscoreboard: false };
  public items = ['Subtracted', 'Apply to contender', 'Fault'];
  public subscription:Subscription
  constructor(private http: Http, 
              private toastr: ToastrService, 
              private router: Router, 
              public activeRouter: ActivatedRoute,
              public sportService:SportsService) { }

  ngOnInit() {
    // this.activeRouter.params.subscribe(params => {
    //   this.userId = params._id;
    //   if (this.userId) {
    //     this.paramdetails = true;
    //     this.http.get(environment.api + '/sportplayerstatus/' + this.userId)
    //       .subscribe(res => {
    //         var x = res.json();
    //         this.former=x[0];
    //       });
    //   }
    // });
    this.subscription = this.sportService.getPlayesStatusData().subscribe(res=>{
      this.former=res[0];
      this._id = res[0]._id;
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  reset(){
    this.former = { playerstatus: '', colorbtnup: '', colorbtndown: '', hidefromscoreboard: false };
    this._id = false;
  }
  savedata(gotcha) {
    var sptid = localStorage.getItem('sptid');
    var janudata = gotcha;
    janudata.sports = sptid;
    if (this._id) {
      this.sportService.updatePlayerStatus(this._id,janudata);
      this.reset();
    }
    else {
      this.sportService.savePlayerStatus(janudata);
      this.reset();      
    }
  }
}
