import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  public membersList:Array<any> = [];
  public playerForm: any;
  constructor(public fb: FormBuilder, private http: Http) { 
    this.playerForm = this.fb.group({
      member: ['', [Validators.required]],
      shirt: ['', [Validators.required]],
      captain: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.memberList()
  }

  addPlayer() {
    
  }

  memberList() {
    this.http.get(environment.api + '/clubmembers')  
      .subscribe((res) => {
        this.membersList = res.json()
      })
  }

}
