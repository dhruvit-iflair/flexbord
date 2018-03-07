import { Component, OnInit, ViewEncapsulation ,OnDestroy} from '@angular/core';
import { fakedb } from "../../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router ,ActivatedRoute} from "@angular/router";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ClubService } from '../../../../components/services/club.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-manage-club-members',
  templateUrl: './manage-club-members.component.html',
  styleUrls: ['./manage-club-members.component.css']
})
export class ManageClubMembersComponent implements OnInit {
  public orgdata:any;
  public sub: any;
  public photo: any;
  public _id: any;
  public clubMemForm : FormGroup;
  public memberSince :any = Date.now();
  public maxDate = new Date();
  public bsConfig: Partial<BsDatepickerConfig>;
  public fileSupport:Boolean = false;
  public fileSizeMin:Boolean = false;
  public fileSizeMax:Boolean = false;
  public subscription :Subscription;

  constructor(public fb: FormBuilder,
              private http : Http,
              private toastr : ToastrService,
              private router: Router,
              public activeRouter:ActivatedRoute,
              public clubService:ClubService) {
    this.bsConfig = {
      containerClass: 'theme-orange',
      dateInputFormat :'DD/MM/YY',
      showWeekNumbers:false
    };
    this.clubMemForm = this.fb.group({
      firstname: ["",[Validators.required]],    
      lastname: ["",[Validators.required]],
      gender: [""],
      license: [""],  
      dob: ["",[Validators.required]],
      photo: [""],
      memberSince:  [this.memberSince],
      address:  [""],
      // building:  ["",[Validators.required]],
      street:  [""],
      country:  ["",[Validators.required]],
      state:  [""],
      city:  ["",[Validators.required]],
      zipcode:  [""],
      email:  [""],
      phonenumber:  [""],          
      usertype :  [""], 
      status:["Pending"],
      club :  [localStorage.getItem('clubid'),[Validators.required]]
    })
   }
   dateLessThan(memberSince: string, dob : string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls[memberSince];
     let t = group.controls[dob];
     if (t.value > f.value) {
       return {
         dates: "Member Since Date should be Greater than DOB Date"
       };
     }
     return {};
    }
  }
  ngOnInit() {
    this.subscription = this.clubService.getSingleMemberData().subscribe((res)=>{
        var fagdf = res;
        this.clubMemForm.patchValue(fagdf[0]);
        this.memberSince =  fagdf[0].memberSince;
        var src = environment.picpoint + 'clubMembersPhoto/' + fagdf[0].photo;
        this.photo = src;
        this._id = fagdf[0]._id;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.fileSupport = false;this.fileSizeMin = false; this.fileSizeMax = false; 
      if (file.type == 'image/jpeg' && file.size < 2000000 && file.size > 150000 || file.type == 'image/png' && file.size < 2000000 && file.size > 150000 ) {
      this.fileSupport = false;this.fileSizeMin = false; this.fileSizeMax = false; 
        let up = new FormData();
        up.append('photo', file);
        this.http.post(environment.api+"/clubmembers/photo",up)  
              .subscribe((res) => {  
                if (res) {
                  var log  = res.json();
                  this.clubMemForm.patchValue({photo: log});
                }
                else{
                  this.toastr.error('Error!! Something went wrong! try to upload image again', 'Error');                 
                }
              })
        var reader = new FileReader();
          reader.onload = (event:any) => {     
          this.photo = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      } 
      else {
        if (file.type == 'image/jpeg' &&  file.size > 2000000 || file.type == 'image/png'   &&  file.size > 2000000) {
          this.fileSizeMax = true; 
          this.toastr.warning('Image should be less than 2 Mb!! ', 'Warning');                        
        } 
        else if (file.type == 'image/jpeg' && file.size < 150000 || file.type == 'image/png' && file.size < 150000) {
          this.toastr.warning('Image should be more than 150Kb!! ', 'Warning');                        
          this.fileSizeMin = true;           
        }
        else {
          this.fileSupport = true;
          this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');                                  
        }
      }
    }
  }
  reset(){
    this._id = false;
    this.clubMemForm.reset();
  }
  addClubMem(){      
      if (this._id) {
        this.clubService.updateMember(this._id,this.clubMemForm.value);
        this.reset();
      } 
      else {
        this.clubService.saveMember(this.clubMemForm.value);
        this.reset();        
      }
  }
  setAdd(e){
    this.clubMemForm.patchValue({address:e.formatted_address});
    this.clubMemForm.patchValue({phonenumber:e.formatted_phone_number});
    this.clubMemForm.patchValue({website:e.website});
    e.address_components.forEach((add)=>{
      if (add.types[0] == "postal_code") {
        this.clubMemForm.patchValue({zipcode:add.long_name});
      } 
      if (add.types[0] == "country") {
        this.clubMemForm.patchValue({country:add.long_name});
      } 
      if (add.types[0] == "administrative_area_level_1") {
        this.clubMemForm.patchValue({state:add.long_name});
      }
      if (add.types[0] == "administrative_area_level_2") {
        this.clubMemForm.patchValue({city:add.long_name});
      } 
      if (add.types[0] == "route") {
        this.clubMemForm.patchValue({street:add.long_name});
      } 
    });
    // this.clubMemForm.value.address = e.formatted_address;
    // this.clubMemForm.value.phonenumber = e.formatted_phone_number;
  }
}
