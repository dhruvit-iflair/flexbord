import { Component, OnInit ,OnDestroy} from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { OrganizerService } from '../../../../components/services/organizer.service';
import { Subscription } from 'rxjs/Subscription';

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
  public subscription:Subscription;
  public click :Boolean = true;
  constructor(public fb: FormBuilder,
              private http : Http,
              private toastr : ToastrService,
              private router: Router,
              public activeRouter:ActivatedRoute,
              public orgService : OrganizerService){
    this.claForm = this.fb.group({
      name: ["",[Validators.required]],
      value: ["",[Validators.required]],
    })
    //console.log(this.value.length);
  }

  ngOnInit() {
    this.subscription = this.orgService.getSingleClassification().subscribe(res=>{
      console.log(res);
      this.claForm = this.fb.group({
        name: [res.name,[Validators.required]],
        value: [res['value'],[Validators.required]],
      })
      this.value = res.value;
      this._id = res._id;
    })
    this.sub = this.activeRouter.params.subscribe(params => {
      if (params._id) {
         this.orgid = params._id;
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
    for (let i = 0; i < this.value.length; i++) {
      const element = this.value[i];
      if(element == '' || element < 0){
          p = false;
      }
    }
    this.claForm.patchValue({value:this.value});
    if(this.click){
        if (this.claForm.valid && p && !isDuplicate) {
          this.claForm.value.organizer=this.orgid;
          this.click = false;
          if (this._id) {
            this.orgService.updateClassificationData(this._id,this.claForm.value);
            this._id = false;
            this.value = [""];
            this.claForm.reset();    
            setTimeout(() => {
              this.click = true;
            }, 1000);    
          }     
          else if (this.claForm.value.value[0] == ''){
            this.toastr.warning('One values is required', 'Warning');  
            setTimeout(() => {
              this.click = true;
            }, 100);      
          }
          else {
            this.orgService.saveClassification(this.claForm.value);
            this.claForm.reset();
            this.value = [""];
            setTimeout(() => {
              this.click = true;
            }, 1000);    
          }
        }
        else if(isDuplicate){
          this.toastr.warning('Duplicate Value not allowed', 'Warning');    
        }
        else{
          this.toastr.warning('Please fill up all the values', 'Warning');
        }
      }
  }
  trackByIndex(index: number, value: number) {
    return index;
  }
  delVal(index){
    var del = confirm("Confirm to delete this Value!");
    if (del) {
      if (this.value.length > 1) {
        this.value.splice(index,1);      
      }
    }      
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
