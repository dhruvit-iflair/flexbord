import { Component, OnInit,OnDestroy } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../../../components/services/club.service';
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-manage-club-classifications',
  templateUrl: './manage-club-classifications.component.html',
  styleUrls: ['./manage-club-classifications.component.css']
})
export class ManageClubClassificationsComponent implements OnInit {

 
  public claForm : FormGroup;
  public value : Array<any> = [''];
  public sub : any;
  public my_Class :string = "form-control ng-untouched ng-pristine ng-invalid ";
  public _id : any;orgid;
  public subscription:Subscription;
    public hasCreatePerm;
  public click :Boolean=true;

  constructor(public fb: FormBuilder,private http : Http,private accr: AccessorService, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute,public clubService:ClubService){
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
    this.subscription = this.clubService.getSingleClassificationsData().subscribe(res=>{
      var data = res[0];
      this.claForm.patchValue({
          name: data.name,
          value: data.value
      })
      this.value = data.value;
      this._id = res[0]._id;
    });
    this.checkpermissions();
  }
  ngOnDestroy() {
     this.subscription.unsubscribe();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubclassifications1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
  }
  reset(){
    this.claForm.reset();
    this.value = [''];
    setTimeout(() => {
      this.click = true;
    }, 100);
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
    if(this.click){
        if (this.claForm.valid && p) {
          this.click =false;
          var clubid=localStorage.getItem('clubid');
          this.claForm.value.club=clubid;
          if (this._id) {
            this.clubService.updateClassifications(this._id,this.claForm.value);
            this.reset();
          } 
          else if (this.claForm.value.value[0] == ''){
            this.toastr.warning('One values is required', 'Warning');    
          }
          else {
            this.clubService.saveClassifications(this.claForm.value);        
            this.reset();        
          }
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
    //console.log(index);
  }
}
