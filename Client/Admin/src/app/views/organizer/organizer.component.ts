import { Component, OnInit } from '@angular/core';
import { fakedb } from "../../components/common/fakedb";
import { TableData } from '../../components/common/table-data';
import { Http } from "@angular/http";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
public rows:Array<any> = [];
public data:Array<any> =[] ;

public columns:Array<any> = [
  {title: 'Logo', name: 'logo', sort: false},
  {title: 'Name', name: 'name', sort: false},
  {title: 'Address', name: 'city', sort: false},
  {title: 'Registered', name: 'registered', sort: false},
  {title: 'Owner', name: 'email', sort: false},
  {title: 'Action', name: 'button', sort: false}
];
public page:number = 1;
public itemsPerPage:number = 10;
public maxSize:number = 5;
public numPages:number = 1;
public length:number = 0;
public dtOptions: any = {};
public config:any = {
  paging: true,
  sorting: {columns: this.columns},
  filtering: {filterString: '', columnName: 'position'}
};

constructor(public http:Http,private toastr : ToastrService,) {
    // this.http.get(environment.api + "/organizer")
    //        .subscribe((res)=>{
    //          this.rows= res.json();
    //           if (this.rows) {
    //             this.rows.forEach(item => {
    //               var src=environment.picpoint+'orglogos/' +item.logo;
    //               item['logo'] =src;
    //                item['button'] = item._id;
    //             });
    //             this.length = this.rows.length; 
    //         }
    //         this.data = res.json();
    //        })
  }

  ngOnInit():void {
    this.http.get(environment.api + "/organizer")
           .subscribe((res)=>{
             this.rows= res.json();
              if (this.rows) {
                this.rows.forEach(item => {
                  var src=environment.picpoint +'/orglogos/'+item.logo;
                  item['logo'] = src;
                  // item['button'] = '<a class="btn btn_green tab_btn" style="background-color: #089468;color: #fff;"  [routerLink]="["/organizer/manage/'+item+']");" ><i class="fa fa-pencil" aria-hidden="true"></i></a><a [routerLink]="["/organizer/manage/'+item+']");" class="btn btn_red tab_btn"  style="background-color: #f55f5f;color: #fff;  margin-left:10px" (click)="delete('+item+');" ><i class="fa fa-trash" aria-hidden="true"></i></a>';
                  item['button'] = item._id;
                });
                this.length = this.rows.length; 
            }
    })
  }
  // edit(orgData:any){
  //   console.log(orgData);
  // }
  // delete(orgData:any){
  //   console.log(orgData);
  // }
  delOrg(_id){
    var del = confirm("Confirm to delete this Organizer!");
    if (del) {
      this.http.delete(environment.api +"/organizer/"+_id)
              .subscribe((res)=>{
                var d = res.json();
                if (d._id) {
                  this.toastr.success('Organizer Deleted Successfully', 'Success');
                  // this.router.navigate(['/organizer']);
                  this.ngOnInit();
                }
              },(error)=>{
                this.toastr.error('Something went wrong !! Please try again later', 'Error');
              }) 
    }
  }
}

