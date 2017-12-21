import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment'
import { Router } from "@angular/router";
@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {
public sportlist;
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.http.get(environment.api + '/sports')
        .subscribe(data => {
          this.sportlist=data;
        },error => {});
  }

}
