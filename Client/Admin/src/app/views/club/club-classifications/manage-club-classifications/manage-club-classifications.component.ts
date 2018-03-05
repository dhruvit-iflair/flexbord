import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';

@Component({
  selector: 'app-manage-club-classifications',
  templateUrl: './manage-club-classifications.component.html',
  styleUrls: ['./manage-club-classifications.component.css']
})
export class ManageClubClassificationsComponent implements OnInit {

 
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
  // maxLengthCheck(object,i)
  // {
  //   if (object.value[i] > 999 || object.value[i] < 0 ){
  //     object.value[i] = 0;
  //   }
  // }

  ngOnInit() {    
    this.sub = this.activeRouter.params.subscribe(params => {
      if (params._id) {
        this._id = params._id;
        this.http.get(environment.api + '/clubClassifications/'+ params._id)
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
                      this.router.navigate(['/classifications']);
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
  saveVal(){
    // //console.log(this.value);
    var p = true ;
    for (let i = 0; i < this.value.length; i++) {
      const element = this.value[i];
      if(element == ''){
          p = false;
      }
    }
    this.claForm.patchValue({value:this.value});
    if (this.claForm.valid && p) {
      var clubid=localStorage.getItem('clubid');
    this.claForm.value.club=clubid;
      if (this._id) {
        this.http.put(environment.api+'/clubClassifications/'+this._id,this.claForm.value)
                 .subscribe((res)=>{
                    var fagdf = res.json();
                    if(res){
                      this.toastr.success('Classifications updated successfully', 'Success');
                      this.router.navigate(['/club/classifications']);
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
        this.http.post(environment.api+'/clubClassifications',this.claForm.value)
                .subscribe((res)=>{
                  var fagdf = res.json();
                  if(res){
                    this.toastr.success('Classifications saved successfully', 'Success');
                    this.router.navigate(['/club/classifications']);
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
