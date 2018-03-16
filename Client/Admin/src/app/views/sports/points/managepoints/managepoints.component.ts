import { Component, OnInit, ViewEncapsulation ,OnDestroy} from '@angular/core';
import { fakedb } from "../../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';
import { SportsService } from '../../../../components/services/sports.service';
import { Subscription } from 'rxjs/Subscription';
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-managepoints',
  templateUrl: './managepoints.component.html',
  styleUrls: ['./managepoints.component.css']
})
export class ManagepointsComponent implements OnInit {
  public _id:any = false;
  public subscripton : Subscription;
  public hasCreatePerm;
  public former = { nameofpoint: '', valueofpoint: 0, valueofpointopt: '', colorbtnup: '', colorbtndown: '', hidefromscoreboard: false };
  public myForm:any;
  public items = ['Subtracted', 'Apply to contender', 'Fault'];
  constructor(private http: Http, 
              private toastr: ToastrService, 
              private router: Router, 
              private accr: AccessorService,
              public activeRouter: ActivatedRoute,
              public sportsService:SportsService) { }

  ngOnInit() {
    this.subscripton = this.sportsService.getSinglePointsData().subscribe(res=>{
      this.former=res[0];
      this._id = res[0]._id;
    })
    this.checkpermissions();
  }
  minZero(e){
    if (this.former.valueofpoint < -1 || this.former.valueofpoint == -1) {
      this.former.valueofpoint = 0;
    }
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportpoints1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
  }
  ngOnDestroy() {
    this.subscripton.unsubscribe();
    this.former = { nameofpoint: '', valueofpoint: 0, valueofpointopt: '', colorbtnup: '', colorbtndown: '', hidefromscoreboard: false };
    
  }
  savedata(gotcha) {
    var sptid = localStorage.getItem('sptid');
    var janudata = gotcha;
    janudata.sports = sptid;
    if (this._id) {
        this.sportsService.updatePoint(this._id,janudata);
        this._id = false;
        this.former = { nameofpoint: '', valueofpoint: 0, valueofpointopt: '', colorbtnup: '', colorbtndown: '', hidefromscoreboard: false };
        // this.myForm.reset();
    }
    else {
        this.sportsService.savePoint(janudata);
        this._id = false;
        this.former = { nameofpoint: '', valueofpoint: 0, valueofpointopt: '', colorbtnup: '', colorbtndown: '', hidefromscoreboard: false };    
        // this.myForm.reset();
    }
  }
}
