import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';


@Component({
  selector: 'app-club-tournaments',
  templateUrl: './club-tournaments.component.html',
  styleUrls: ['./club-tournaments.component.css']
})
export class ClubTournamentsComponent implements OnInit {

  public dtOptions;clubid;
  public rows :Array<any>;
  public dataRenderer = false;
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
    this.clubid=localStorage.getItem('clubid');
    this.http.get(environment.api+'/clubTournaments/byclub/'+this.clubid)
              .subscribe((res)=>{
                this.rows = res.json();
                   this.dataRenderer = true;                
              },(error)=>{
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
            });  
  }
  delTour(id){
      var del = confirm("Confirm to delete this Tournament!");
      if (del) {
        this.http.delete(environment.api +"/clubTournaments/"+id)
                .subscribe((res)=>{
                  var d = res.json();
                  // jQuery("#cmpt").dataTable().fnDestroy();
                   //jQuery("#cmpt").dataTable(this.dtOptions).fnClearTable();
                  if (d._id) {
                    this.dataRenderer = false;
                    this.toastr.success('Tournament Deleted Successfully', 'Success');
                    this.initializer();
                  }
                },(error)=>{
                  this.toastr.error('Something went wrong !! Please try again later', 'Error');
                }) 
      }
    }

}
