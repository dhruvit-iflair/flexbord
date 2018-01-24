import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-managescore',
  templateUrl: './managescore.component.html',
  styleUrls: ['./managescore.component.css']
})
export class ManagescoreComponent implements OnInit {
  public paramdetails = false;
  public userId;
  public former = { wins: 0, draws: 0, losses: 0};

  constructor(private http: Http, private toastr: ToastrService, private router: Router, public activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/sportscores/' + this.userId)
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
      this.http.patch(environment.api + "/sportscores/" + this.userId, janudata)
        .subscribe(res => {
          this.toastr.success('Scores Updated Successfully', 'Success');
          this.router.navigate(['/sports/scores']);
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
    else {
      this.http.post(environment.api + "/sportscores", janudata)
        .subscribe(res => {
          this.toastr.success('Scores added successfully', 'Success');
          this.router.navigate(['/sports/scores']);
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
  }
}
