import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Users } from "../../components/class/users";
import { UserService } from "../../components/services/users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public rows: Array<Users> = [];
  public dtOptions;
  public dataRenderer = false;

  constructor(public http: Http, private router: Router, private toastr: ToastrService, public userService: UserService) {
  }
  ngAfterContentInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, { "orderable": false },null, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
   this.userService.getUsers()
      .subscribe((res) => {
        this.rows = res;
        if (this.rows) {
          var u = JSON.parse(localStorage.getItem('uToken'));
          var r = this.rows.indexOf(this.rows.find(x => x._id == u.user._id));
          this.rows.splice(r,1);
          this.rows.forEach(item => {
            if(item.person_photo){
              var src = environment.picpoint + item.person_photo;
              item['person_photo'] = src;
            }
            else {
              var src ='assets/defaultUser.png';
              item['person_photo'] = src;
            }
          });
          this.dataRenderer = true;
        }
      })
  }
  delUser(id): void{
      var del = confirm("Confirm to delete this User!");
      if (del) {
       this.userService.delUsers(id).subscribe((res) => {
            var d = res;
            if (d._id) {
              this.dataRenderer = false;
              this.toastr.success('User Deleted Successfully', 'Success');
              this.ngOnInit();
            }
          })
      }
    }
}
