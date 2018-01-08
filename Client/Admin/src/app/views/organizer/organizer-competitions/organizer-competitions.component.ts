import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
declare var jQuery:any;
@Component({
  selector: 'app-organizer-competitions',
  templateUrl: './organizer-competitions.component.html',
  styleUrls: ['./organizer-competitions.component.css']
})
export class OrganizerCompetitionsComponent implements OnInit {
  public dtOptions;
  public rows :Array<any>;
  constructor(private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute) { }

  ngOnInit() {
    this.initializer();
  }
  initializer(){
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{"visible":false},null,null,null,null,{ "orderable": false }]
    };
    this.http.get(environment.api+'/orgCompetitions')
              .subscribe((res)=>{
                this.rows = res.json();
              },(error)=>{
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
            });  
  }
  delComp(id){
      var del = confirm("Confirm to delete this Season!");
      if (del) {
        this.http.delete(environment.api +"/orgCompetitions/"+id)
                .subscribe((res)=>{
                  var d = res.json();
                  if (d._id) {
                    this.toastr.success('Classifications Deleted Successfully', 'Success');
                    // this.router.navigate(['/organizer']);
                    this.initializer();
                  }
                },(error)=>{
                  this.toastr.error('Something went wrong !! Please try again later', 'Error');
                }) 
      }
    }

}
