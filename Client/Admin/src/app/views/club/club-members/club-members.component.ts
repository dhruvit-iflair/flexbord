import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute,Params } from "@angular/router";

@Component({
  selector: 'app-club-members',
  templateUrl: './club-members.component.html',
  styleUrls: ['./club-members.component.css']
})
export class ClubMembersComponent implements OnInit {
  members;dtOptions;clubid;
  public dataRenderer=false;
  constructor(public http: HttpClient,private router: Router,private aroute:ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.clubid=localStorage.getItem('clubid');
    this.gotcha();
  }
  gotcha(){
    this.dtOptions={
      pagingType:'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{ "visible":false },{ "orderable": false },null,null,null,null,null,{ "orderable": false }]
    }
    this.http.get(environment.api + '/clubmembers/getByClub/'+this.clubid)
      .subscribe((res) => {

        this.members = res;
        this.members.forEach(item => {
          var src = environment.picpoint + 'clubMembersPhoto/' + item.photo;
          item.photo = src;
        });
        this.dataRenderer=true;
      });
  }
  deletemember(id){
    var del = confirm("Delete this Member?");
    if (del) {
      this.http.delete(environment.api +"/clubmembers/"+id)
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
  changeStatusA(id){
   this.http.get(environment.api +"/clubmembers/statusA/"+id)
              .subscribe((res)=>{
                if (res) {
                  this.dataRenderer=false;
                  this.toastr.success('Member Status Changed Successfully', 'Success');
                }
                this.gotcha();
              },(error)=>{
                this.toastr.error('Something went wrong !! Please try again later', 'Error');
              });
  }
  changeStatusP(id){
    this.http.get(environment.api +"/clubmembers/statusP/"+id)
              .subscribe((res)=>{
                if (res) {
                  this.dataRenderer=false;
                  this.toastr.success('Member Status Changed Successfully', 'Success');
                }
                this.gotcha();
              },(error)=>{
                this.toastr.error('Something went wrong !! Please try again later', 'Error');
              });
  }
}
