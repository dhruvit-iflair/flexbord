import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { dateFormatPipe } from "../../../components/pipes/dateFormate";

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
  public dtOptions;
  public seasons : Array<any>;
  public dataRenderer=false;
  constructor(public http: Http,private toastr : ToastrService, ) { }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{"visible":false},null,null,null,{ "orderable": false }]
    };
    this.http.get(environment.api+'/seasons')
             .subscribe((res)=>{
               this.seasons = res.json();
               this.dataRenderer=true;
             })
  }
  delOrg(_id){
    var del = confirm("Confirm to delete this Season!");
    if (del) {
      this.http.delete(environment.api +"/seasons/"+_id)
              .subscribe((res)=>{
                var d = res.json();
                if (d._id) {
                  this.dataRenderer=false;
                  this.toastr.success('Season Deleted Successfully', 'Success');
                  // this.router.navigate(['/organizer']);
                  this.ngOnInit();
                }
              },(error)=>{
                this.toastr.error('Something went wrong !! Please try again later', 'Error');
              }) 
    }
  }

}
