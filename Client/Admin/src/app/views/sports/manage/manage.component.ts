import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public mForm = { name: '', typeofsport: '', typeofgame: '', typeofteam:'' };
  public paramdetails = false;
  public userId;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/sports/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
          });
      }
    });
  }
  addMember(gotdata) {
    if (this.paramdetails) {
      this.http.patch(environment.api + '/sports/' + this.userId, gotdata)
        .subscribe(result => {
          this.toastr.success('Updated Successfully.','Success');
          // this.router.navigate(['/sports']);
        });
    }
    else {
      this.http.post(environment.api + '/sports', gotdata)
        .subscribe(dt => {
          this.toastr.success('Added Successfully.','Success');
          this.router.navigate(['/sports/manage/'+dt['_id']]);
        });
    }
  }
}
