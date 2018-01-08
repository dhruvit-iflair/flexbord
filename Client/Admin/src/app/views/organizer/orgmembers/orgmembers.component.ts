import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute,Params } from "@angular/router";

@Component({
  selector: 'app-orgmembers',
  templateUrl: './orgmembers.component.html',
  styleUrls: ['./orgmembers.component.css']
})
export class OrgmembersComponent implements OnInit {
  members;dtOptions;orgid;
  public dataRenderer=false;
  constructor(public http: HttpClient,private router: Router,private aroute:ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.orgid=localStorage.getItem('orgid');
    this.gotcha();
  }
  gotcha(){
    this.dtOptions={
      pagingType:'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{ "visible":false },null,null,null,{ "orderable": false }]
    }
    this.http.get(environment.api + '/orgmembers/byorg/'+this.orgid)
      .subscribe((res) => {
        this.members = res;
        this.dataRenderer=true;
      });
  }
  deletemember(id){
    var del = confirm("Delete this Member?");
    if (del) {
      this.http.delete(environment.api +"/orgmembers/"+id)
              .subscribe((res)=>{
                if (res) {
                  this.dataRenderer=false;
                  this.toastr.success('Member Deleted Successfully', 'Success');
                }
                this.gotcha();
              },(error)=>{
                this.toastr.error('Something went wrong !! Please try again later', 'Error');
              });
    }
  }

}
