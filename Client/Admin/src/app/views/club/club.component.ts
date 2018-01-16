import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public dtOptions;
  public dataRenderer = false;

  constructor(public http: Http, private router: Router, private toastr: ToastrService, 
    // public confirmBox:ConfirmService 
  ) {
    // this.dtOptions={
    //   pagingType:'simple_numbers',
    //   order:[[ 0, 'desc' ]],
    //   columns: [{"visible":false},null,null,null,null,null,{ "orderable": false }]
    // }
  }
  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
    this.http.get(environment.api + "/club")
      .subscribe((res) => {
        this.rows = res.json();
        if (this.rows) {
          this.rows.forEach(item => {
            var src = environment.picpoint + 'clublogos/' + item.logo;
            item['logo'] = src;
            // item['button'] = '<a class="btn btn_green tab_btn" style="background-color: #089468;color: #fff;"  [routerLink]="["/organizer/manage/'+item+']");" ><i class="fa fa-pencil" aria-hidden="true"></i></a><a [routerLink]="["/organizer/manage/'+item+']");" class="btn btn_red tab_btn"  style="background-color: #f55f5f;color: #fff;  margin-left:10px" (click)="delete('+item+');" ><i class="fa fa-trash" aria-hidden="true"></i></a>';
            item['button'] = item._id;
          });
          this.length = this.rows.length;
          this.dataRenderer = true;
        }
      })
  }
  movetomember(idx) {
    localStorage.setItem('clubid', idx);
    this.router.navigate(['/club/members']);
  }
  movetoteam(idx){
    localStorage.setItem('clubid', idx);
    this.router.navigate(['/club/clubteam']);
  }
  delClub(id){
      var del = confirm("Confirm to delete this Club!");
      if (del) {
        this.http.delete(environment.api + "/club/" + id)
          .subscribe((res) => {
            var d = res.json();
            if (d._id) {
              this.dataRenderer = false;
              this.toastr.success('Organizer Deleted Successfully', 'Success');
              this.ngOnInit();
            }
          }, (error) => {
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
          })
      }
    }
}
