import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { AccessorService } from "../../../components/common/accessor.service";

declare var jQuery:any;
@Component({
  selector: 'app-organizer-competitions',
  templateUrl: './organizer-competitions.component.html',
  styleUrls: ['./organizer-competitions.component.css']
})
export class OrganizerCompetitionsComponent implements OnInit {
  public dtOptions;orgid;
  public rows :Array<any>;
  public dataRenderer = false;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;

  constructor(private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute,private accr: AccessorService) { }

  ngOnInit() {
    this.initializer();
  }
  initializer(){
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{"visible":false},null,null,null,null,{ "orderable": false }]
    };
    this.orgid=localStorage.getItem('orgid');
    this.http.get(environment.api+'/orgCompetitions/byorg/'+this.orgid)
              .subscribe((res)=>{
                this.rows = res.json();
                   this.dataRenderer = true;                
              },(error)=>{
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
            });  
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizercompetitions1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizercompetitions2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizercompetitions3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
    }
  }
  delComp(id){
      var del = confirm("Confirm to delete this Competition!");
      if (del) {
        this.http.delete(environment.api +"/orgCompetitions/"+id)
                .subscribe((res)=>{
                  var d = res.json();
                  // jQuery("#cmpt").dataTable().fnDestroy();
                   //jQuery("#cmpt").dataTable(this.dtOptions).fnClearTable();
                  if (d._id) {
                    this.dataRenderer = false;
                    this.toastr.success('Competition Deleted Successfully', 'Success');
                    this.initializer();
                  }
                },(error)=>{
                  this.toastr.error('Something went wrong !! Please try again later', 'Error');
                }) 
      }
    }

}
