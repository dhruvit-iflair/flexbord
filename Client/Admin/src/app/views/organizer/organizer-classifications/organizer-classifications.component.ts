import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';

@Component({
  selector: 'app-organizer-classifications',
  templateUrl: './organizer-classifications.component.html',
   styleUrls: ['.././organizer.component.css']
})
export class OrganizerClassificationsComponent implements OnInit {
  public dtOptions;
  public rows :Array<any>;
  public dataRenderer=false;
  constructor(private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{"visible":false},null,null,{ "orderable": false }]
    };
    this.http.get(environment.api+'/organizerClassifications')
              .subscribe((res)=>{
                this.rows = res.json();
                this.dataRenderer=true;
              },(error)=>{
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
            });  
    }
    delClas(id){
      var del = confirm("Confirm to delete this Season!");
      if (del) {
        this.http.delete(environment.api +"/organizerClassifications/"+id)
                .subscribe((res)=>{
                  var d = res.json();
                  if (d._id) {
                    this.dataRenderer=false;
                    this.toastr.success('Classifications Deleted Successfully', 'Success');
                    // this.router.navigate(['/organizer']);
                    this.ngOnInit();
                  }
                },(error)=>{
                  this.toastr.error('Something went wrong !! Please try again later', 'Error');
                }) 
      }
    }

}
