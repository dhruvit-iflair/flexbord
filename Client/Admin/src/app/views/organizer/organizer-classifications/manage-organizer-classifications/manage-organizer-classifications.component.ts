import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';

@Component({
  selector: 'app-manage-organizer-classifications',
  templateUrl: './manage-organizer-classifications.component.html',
  styleUrls: ['./manage-organizer-classifications.component.css']
})
export class ManageOrganizerClassificationsComponent implements OnInit {

  public claForm : FormGroup;
  public value : Array<any> = [''];
  constructor(public fb: FormBuilder,private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute){
    this.claForm = this.fb.group({
      name: ["",[Validators.required]],
      value: [null,[Validators.required]]
    })
    console.log(this.value.length);
  }

  ngOnInit() {
  }

  addVal(){
    this.value.push('');
  }
  delVal(index){
    if (this.value.length > 1) {
      this.value.splice(index,1);      
    }
  }
}
