import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fakedb } from "../../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-manageplayerstatus',
  templateUrl: './manageplayerstatus.component.html',
  styleUrls: ['./manageplayerstatus.component.css']
})
export class ManageplayerstatusComponent implements OnInit {
  public paramdetails = false;
  public userId;
  public former = { nameofpoint: '', valueofpoint: 0, valueofpointopt: '', colorbtnup: '', colorbtndown: '', hidefromscoreboard: false };
  public items = ['Subtracted', 'Apply to contender', 'Fault'];
  constructor(private http: Http, private toastr: ToastrService, private router: Router, public activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/sportplayerstatus/' + this.userId)
          .subscribe(res => {
            var x = res.json();
            this.former=x[0];
          });
      }
    });
  }

  savedata(gotcha) {
    var sptid = localStorage.getItem('sptid');
    var janudata = gotcha;
    janudata.sports = sptid;
    if (this.paramdetails) {
      this.http.patch(environment.api + "/sportplayerstatus/" + this.userId, janudata)
        .subscribe(res => {
          this.toastr.success('Player status Updated Successfully', 'Success');
          this.router.navigate(['/sports/playerstatus']);
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
    else {
      this.http.post(environment.api + "/sportplayerstatus", janudata)
        .subscribe(res => {
          this.toastr.success('Player status added successfully', 'Success');
          this.router.navigate(['/sports/playerstatus']);
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
  }
}
