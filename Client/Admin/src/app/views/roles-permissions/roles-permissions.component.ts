import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment'
import { Router } from "@angular/router";

@Component({
  selector: 'app-roles-permissions',
  templateUrl: './roles-permissions.component.html',
  styleUrls: ['./roles-permissions.component.css']
})
export class RolesPermissionsComponent implements OnInit {
public roleList;
public pages=[{_id:1,title:'page1'},{_id:2,title:'page2'},{_id:3,title:'page3'},{_id:4,title:'page4'}];
public rUser={role:''};
public rolesperms=[{role:'admin',perms:{a:1,r:0}}];

  constructor(private router: Router, private http: HttpClient, private toastr:ToastrService) { }

  ngOnInit() {
    this.http.get(environment.api+'/roles')
           .subscribe(dt=>{
             this.roleList=dt;
           });
  }
  fired(gotcha){
    console.log(gotcha);
  }
}
