import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  public membersList:Array<any> = [];
  public staffForm: any;
  constructor(public fb: FormBuilder, private http: Http) { 
    this.staffForm = this.fb.group({
      member: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.memberList()
  }

  addPlayer() {

  }

  memberList() {
    // this.http.get('http://flexbordiflair.westcentralus.cloudapp.azure.com:5002/api/clubmembers')
    this.http.get(environment.api + '/clubmembers')  
    .subscribe((res) => {
        this.membersList = res.json()
      })
  }

}
