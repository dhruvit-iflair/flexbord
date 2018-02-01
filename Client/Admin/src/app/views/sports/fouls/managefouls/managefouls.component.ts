import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-managefouls',
  templateUrl: './managefouls.component.html',
  styleUrls: ['./managefouls.component.css']
})
export class ManagefoulsComponent implements OnInit {
  public paramdetails = false;
  public userId;
  public former = { nameoffoul:'',valueoffoul:'',isplayer:false,iscoach:false,isteam:false,istimepenalty:false,isscoringdependable:false,ispossessiondependable:false,duration:'',minustime:'',colorbtndown:'',colorbtnup:'' };
  
  constructor(private http: Http, private toastr: ToastrService, private router: Router, public activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/sportfouls/' + this.userId)
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
      this.http.patch(environment.api + "/sportfouls/" + this.userId, janudata)
        .subscribe(res => {
          this.toastr.success('Foul Updated Successfully', 'Success');
          this.router.navigate(['/sports/fouls']);
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
    else {
      this.http.post(environment.api + "/sportfouls", janudata)
        .subscribe(res => {
          this.toastr.success('Fouls added successfully', 'Success');
          this.router.navigate(['/sports/fouls']);
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
  }
}
