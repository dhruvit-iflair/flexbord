import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fakedb } from "../../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router ,ActivatedRoute} from "@angular/router";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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

  constructor(public fb: FormBuilder,private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute) {
    this.bsConfig = {
      containerClass: 'theme-orange',
      dateInputFormat :'DD/MM/YY',
      showWeekNumbers:false
    };
    this.clubMemForm = this.fb.group({
      firstname: ["",[Validators.required]],    
      lastname: ["",[Validators.required]],
      gender: ["",[Validators.required]],
      license: ["",[Validators.required]],  
      dob: ["",[Validators.required]],
      photo: ["",[Validators.required]],
      memberSince:  [this.memberSince,[Validators.required]],
      address:  ["",[Validators.required]],
      // building:  ["",[Validators.required]],
      street:  ["",[Validators.required]],
      country:  ["",[Validators.required]],
      state:  ["",[Validators.required]],
      city:  ["",[Validators.required]],
      zipcode:  ["",[Validators.required]],
      email:  ["",[Validators.required]],
      phonenumber:  ["",[Validators.required]],          
      usertype :  ["",[Validators.required]], 
      status:["Pending",[Validators.required]],
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
    // this.items = fakedb.org;
    this.sub = this.activeRouter.params.subscribe(params => {
      // //console.log(params._id);
      if (params._id) {
        this._id = params._id;
        this.http.get(environment.api + '/clubmembers/'+ params._id)
                 .subscribe((res)=>{
                   var fagdf = res.json();
                   this.clubMemForm.patchValue(fagdf[0]);
                   this.memberSince =  fagdf[0].memberSince;
                   var src = environment.picpoint + 'clubMembersPhoto/' + fagdf[0].photo;
                   this.photo = src;
                 },(error)=>{
                  this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                });
      }
   });
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

    addClubMem(){      
        if (this._id) {
          this.http.put(environment.api +"/clubmembers/"+this._id,this.clubMemForm.value)
                  .subscribe((res)=>{
                    var d = res.json();
                    if (d._id) {
                      this.toastr.success('Club Member Updated Successfully', 'Success');
                      this.router.navigate(['/club/members']);
                    }
                  },(error)=>{
                    this.toastr.error('Something went wrong !! Please try again later', 'Error');
                  })
        } 
        else {
          this.http.post(environment.api +"/clubmembers",this.clubMemForm.value)
                  .subscribe((res)=>{
                    var d = res.json();
                    if (d._id) {
                      this.toastr.success('Club Member Registered Successfully', 'Success');
                      this.router.navigate(['/club/members']);
                    }
                  },(error)=>{
                    this.toastr.error('Something went wrong !! Please try again later', 'Error');
                  })
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
