import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public mForm = { emailAddress: '', status: 'pending', userType: '' };
  public paramdetails = false;
  public userId;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/orgmembers/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
          });
      }
    });
  }
  addMember(gotdata) {
    if (this.paramdetails) {
      this.http.patch(environment.api+'/orgmembers/'+this.userId,gotdata)
      .subscribe(result=>{
        this.toastr.success('Organization Member', 'Updated Successfully.');
          this.router.navigate(['/organizer/orgmembers']);
      });
    }
    else {
      this.http.post(environment.api + '/orgmembers', gotdata)
        .subscribe(dt => {
          this.toastr.success('Organization Member', 'Added Successfully.');
          this.router.navigate(['/organizer/orgmembers']);
        });
    }
  }
}
