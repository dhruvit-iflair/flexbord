import { Component, OnInit, ViewEncapsulation ,OnDestroy} from '@angular/core';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { SportsService } from '../../../../components/services/sports.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-managefouls',
  templateUrl: './managefouls.component.html',
  styleUrls: ['./managefouls.component.css']
})
export class ManagefoulsComponent implements OnInit {
  public _id:any;
  public userId;
  public subscription : Subscription;
  public former = { nameoffoul:'',valueoffoul:'',isplayer:false,iscoach:false,isteam:false,istimepenalty:false,isscoringdependable:false,ispossessiondependable:false,duration:'',minustime:'',colorbtndown:'',colorbtnup:'' };
  
  constructor(private http: Http, 
              private toastr: ToastrService, 
              private router: Router, 
              public activeRouter: ActivatedRoute,
              public sportService:SportsService) { }

  ngOnInit() {
    this.subscription = this.sportService.getSingleFoulData().subscribe(res=>{
      this.former=res[0];
      this._id = res[0]._id;
    })
    // this.activeRouter.params.subscribe(params => {
    //   this.userId = params._id;
    //   if (this.userId) {
    //     this.paramdetails = true;
    //     this.http.get(environment.api + '/sportfouls/' + this.userId)
    //       .subscribe(res => {
    //         var x = res.json();
    //         this.former=x[0];
    //       });
    //   }
    // });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  savedata(gotcha) {
    var sptid = localStorage.getItem('sptid');
    var janudata = gotcha;
    janudata.sports = sptid;
    if (this._id) {
      this.sportService.updateFoul(this._id,janudata);
      this._id = false;
      this.former = { nameoffoul:'',valueoffoul:'',isplayer:false,iscoach:false,isteam:false,istimepenalty:false,isscoringdependable:false,ispossessiondependable:false,duration:'',minustime:'',colorbtndown:'',colorbtnup:'' };
      
    }
    else {
      this.sportService.saveFoul(janudata);
      this._id = false;
      this.former = { nameoffoul:'',valueoffoul:'',isplayer:false,iscoach:false,isteam:false,istimepenalty:false,isscoringdependable:false,ispossessiondependable:false,duration:'',minustime:'',colorbtndown:'',colorbtnup:'' };
    }
  }
}
