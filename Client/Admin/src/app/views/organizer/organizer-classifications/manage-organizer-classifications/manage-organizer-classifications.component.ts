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
  public sub : any;
  public _id : any;orgid;
  constructor(public fb: FormBuilder,private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute){
    this.claForm = this.fb.group({
      name: ["",[Validators.required]],
      value: [null,[Validators.required]]
    })
    //console.log(this.value.length);
  }

  ngOnInit() {    
    this.sub = this.activeRouter.params.subscribe(params => {
      if (params._id) {
        this._id = params._id;
        this.http.get(environment.api + '/organizerClassifications/'+ params._id)
               .subscribe((res)=>{
                 var fagdf = res.json();
                 if(fagdf.length > 0){
                      this.claForm = this.fb.group({
                        name: [fagdf[0].name,[Validators.required]],
                        value: [fagdf[0].value,[Validators.required]]
                      })
                      this.value = [];
                      fagdf[0].value.forEach(element => {
                          this.value.push(element);
                      });
                 }
                 else {
                      this.toastr.error('Error!! No Classifications found!', 'Error');
                      this.router.navigate(['/organizer/classifications']);
                  }
                 },(error)=>{
                      this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                });
      }
      else{
        this.claForm = this.fb.group({
          name: ["",[Validators.required]],
          value: [null,[Validators.required]]
        })
      }
   });
  }

  addVal(){
    this.value.push('');
  }
  maxLengthCheck(object,i)
  {
    if (object.value[i] > 999){
      object.value[i] = 0;
    }
  }
  saveVal(){
    // //console.log(this.value);
    var p = true ;
    var valueArr = this.value.map(function(item){ return item });
    var isDuplicate = this.value.some(function(item, idx){ 
        return valueArr.indexOf(item) != idx 
    });
    console.log(isDuplicate);
    for (let i = 0; i < this.value.length; i++) {
      const element = this.value[i];
      if(element == '' || element < 0){
          p = false;
      }
    }
    this.claForm.patchValue({value:this.value});
    if (this.claForm.valid && p && !isDuplicate) {
      var orid=localStorage.getItem('orgid');
    this.claForm.value.organizer=orid;
      if (this._id) {
        this.http.put(environment.api+'/organizerClassifications/'+this._id,this.claForm.value)
                 .subscribe((res)=>{
                    var fagdf = res.json();
                    if(res){
                      this.toastr.success('Classifications updated successfully', 'Success');
                      this.router.navigate(['/organizer/classifications']);
                    }
                    else {
                        this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
                        // this.router.navigate(['/seasons']);
                    }
                  },(error)=>{
                  this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                });
      }     
      else if (this.claForm.value.value[0] == ''){
        this.toastr.warning('One values is required', 'Warning');    
      }
      else {
        this.http.post(environment.api+'/organizerClassifications',this.claForm.value)
                .subscribe((res)=>{
                  var fagdf = res.json();
                  if(res){
                    this.toastr.success('Classifications saved successfully', 'Success');
                    this.router.navigate(['/organizer/classifications']);
                  }
                  else {
                      this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
                      // this.router.navigate(['/seasons']);
                  }
                },(error)=>{
                this.toastr.error('Error!! Something went wrong! try again later', 'Error');
              });  
      }
    }
    else if(isDuplicate){
      this.toastr.warning('Duplicate Value not allowed', 'Warning');    
    }
    else{
      this.toastr.warning('Please fill up all the values', 'Warning');
    }
  }
  trackByIndex(index: number, value: number) {
    return index;
  }
  delVal(index){
    if (this.value.length > 1) {
      this.value.splice(index,1);      
    }
    //console.log(index);
  }
}
