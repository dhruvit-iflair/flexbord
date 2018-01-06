import { Component, OnInit ,ViewChild} from '@angular/core';
import { fakedb } from "../../components/common/fakedb";
import { TableData } from '../../components/common/table-data';
import { Http } from "@angular/http";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  public rows:Array<any> = [];
  public data:Array<any> =[] ;
  public length:number = 0;
  public dtOptions;


  constructor(public http:Http,private toastr : ToastrService,) {
    this.dtOptions={
      pagingType:'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{"visible":false},null,null,null,null,null,{ "orderable": false }]
    }
  }

  ngOnInit():void {
    this.http.get(environment.api + "/organizer")
           .subscribe((res)=>{
             this.rows= res.json();
              if (this.rows) {
                this.rows.forEach(item => {
                  var src=environment.picpoint +'orglogos/'+item.logo;
                  item['logo'] = src;
                  // item['button'] = '<a class="btn btn_green tab_btn" style="background-color: #089468;color: #fff;"  [routerLink]="["/organizer/manage/'+item+']");" ><i class="fa fa-pencil" aria-hidden="true"></i></a><a [routerLink]="["/organizer/manage/'+item+']");" class="btn btn_red tab_btn"  style="background-color: #f55f5f;color: #fff;  margin-left:10px" (click)="delete('+item+');" ><i class="fa fa-trash" aria-hidden="true"></i></a>';
                  item['button'] = item._id;
                });
                this.length = this.rows.length; 
            }
    })
  }
  delOrg(id,index){

    // console.log();
    var d = this.rows.findIndex(r =>r._id ==id);
    this.rows.splice(d,1);
                  
    var del = confirm("Confirm to delete this Organizer!");
    if (del && d) {
      this.http.delete(environment.api +"/organizer/"+id)
              .subscribe((res)=>{
                var d = res.json();
                if (d._id) {
                  this.toastr.success('Organizer Deleted Successfully', 'Success');
                  // this.router.navigate(['/organizer']);
                  // this.rows.splice(d,1);
                  this.ngOnInit();
                }
              },(error)=>{
                this.toastr.error('Something went wrong !! Please try again later', 'Error');
              }) 
    }
  }
}

