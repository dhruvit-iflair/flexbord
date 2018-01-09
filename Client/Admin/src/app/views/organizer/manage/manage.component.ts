import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fakedb } from "../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router ,ActivatedRoute} from "@angular/router";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-manage',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageOrganizerComponent implements OnInit {
  public orgdata:any;
  public items:Array<any> ;
  public spots:Array<any> ;
  public url:any;
  public placePic:any;
  public value : any;
  public value2 : Array<string>;
  public spotsIns : Array<any> = [];
  public spotsdInsText : Array<any> = [];
  public sub: any;
  public logo: any;
  public logo2: any;
  public _id: any;
  public orgForm : FormGroup;
  // public value : any = 9;
  // public value2 : Array<string> =["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"];
  constructor(public fb: FormBuilder,private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute) {
    this.orgForm = this.fb.group({
      name: ["",[Validators.required]],
      subDomain: ["",[Validators.required]],
      abbreviation: ["",[Validators.required]],
      logo: [""], 
      address: ["",[Validators.required]],
      building: [""],
      street: [""],
      city: [""],
      state: [""],
      country: [""],
      zipcode: [""],
      website: ["",[Validators.required]],
      email: ["",[Validators.email]],
      // phonenumber: [null,[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
      phonenumber: [null],
      sports: [null,[Validators.required]],
      capacity:  [null,[Validators.required]],
      placePic: [null],
      affilated:  ["",[Validators.required]],
      affilation:  ["",[Validators.required]],
      registered: [null]
    })
   }

  ngOnInit() {
    this.items = fakedb.org;
    this.spots = fakedb.sport;
    this.sub = this.activeRouter.params.subscribe(params => {
      // console.log(params._id);
      if (params._id) {
        this._id = params._id;
        this.http.get(environment.api + '/organizer/'+ params._id)
                 .subscribe((res)=>{
                   var fagdf = res.json();
                 if(fagdf.length > 0){
                    var comming = res.json();
                    this.orgdata = comming[0];
                    this.spotsIns = comming[0].sports;
                    for(var i=0; i<this.spotsIns.length;i++){
                      var y = this.spots.findIndex(r=>r.id == this.spotsIns[i]);
                      this.spotsdInsText.push(this.spots[y].name);
                    }
                    this.logo = environment.picpoint +'orglogos/'+ comming[0].logo;
                    var yaar = [];
                    if (comming[0].placePic) {
                      comming[0].placePic.forEach((asd)=>{
                        yaar.push(environment.picpoint +'orgplacepics/'+ asd);
                      })
                    }
                    this.logo2 = yaar;
                    this.spotsIns.sort();
                    this.spotsdInsText.sort();
                    this.orgForm.patchValue( comming[0]);
                    this.orgForm.controls['affilated'].setValue(fagdf[0].affilated, {onlySelf: true});
                    this.orgForm.controls['sports'].setValue(this.spotsdInsText, {onlySelf: true});
                     
                  }
                  else {
                    this.toastr.error('Error!! No Organizer found!', 'Error');
                    this.router.navigate(['/organizer']);
                  }
                 },(error)=>{
                  this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                });
      }
   });
  }
  selec(id){
      var d = this.spotsIns.findIndex(r =>r == id);
      var sf = this.spots.findIndex(r=> r.id == id);
      var y =this.spotsdInsText.findIndex(r=>r == this.spots[sf].name);
      if (d != -1) {
         this.spotsIns.splice(d,1);
         this.spotsdInsText.splice(y,1);  
      } else {
         this.spotsIns.push(id);
         this.spotsdInsText.push(this.spots[sf].name);     
      }
    this.spotsIns.sort();
    this.spotsdInsText.sort();
    this.orgForm.patchValue({sports :this.spotsdInsText});
  }
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type == 'image/jpeg' || file.type == 'image/png' && file.size < 2000000) {
        console.log(file);        
        let up = new FormData();
        up.append('logo', file);
        this.http.post(environment.api+"/organizer/logo",up)  
              .subscribe((res) => {  
                if (res) {
                  var log  = res.json();
                  this.orgForm.patchValue({logo: log});
                }
                else{
                  this.toastr.error('Error!! Something went wrong! try again later', 'Error');                 
                }
              })
        var reader = new FileReader();
          reader.onload = (event:any) => {     
          this.url = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      } 
      else {
        if ( file.size > 2000000) {
          this.toastr.warning('Image should be less than 2 Mb!! ', 'Warning');                        
          
        } else {
          this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');                                  
        }
      }    
      
    }
  }
  setAdd(e){
    this.orgForm.patchValue({address:e.formatted_address});
    this.orgForm.patchValue({phonenumber:e.formatted_phone_number});
    this.orgForm.patchValue({website:e.website});
    e.address_components.forEach((add)=>{
      if (add.types[0] == "postal_code") {
        this.orgForm.patchValue({zipcode:add.long_name});
      } 
      if (add.types[0] == "country") {
        this.orgForm.patchValue({country:add.long_name});
      } 
      if (add.types[0] == "administrative_area_level_1") {
        this.orgForm.patchValue({state:add.long_name});
      }
      if (add.types[0] == "administrative_area_level_2") {
        this.orgForm.patchValue({city:add.long_name});
      } 
      if (add.types[0] == "route") {
        this.orgForm.patchValue({street:add.long_name});
      } 
      else {
        var u = e.formatted_address.split(',');
        var b = u[0] + ', ' + u[1]; 
        this.orgForm.patchValue({building: b});
      }
      
    });
    // this.orgForm.value.address = e.formatted_address;
    // this.orgForm.value.phonenumber = e.formatted_phone_number;
  }
  picPlaceUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type == 'image/jpeg' || file.type == 'image/png' && file.size < 2000000) {
        let file = event.target.files[0];
        let up = new FormData();
        up.append('placePic', file);
        this.http.post(environment.api+"/organizer/upload",up)  
              .subscribe((res) => {  
                 if (res) {
                   var log  = res.json();
                   this.orgForm.patchValue({placePic: log});
                 }
        })
        var reader = new FileReader();
          reader.onload = (event:any) => {     
          this.placePic = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      } 
      else {
        if ( file.size > 2000000) {
          this.toastr.warning('Image should be less than 2 Mb!! ', 'Warning');                        
          
        } else {
          this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');                                  
        }
      }    
      
    }
  }

   dataChanged(e,c){
      if (c == 'sport') {
          console.log(this.orgForm.value.sports);
          console.log(e);
          this.orgForm.patchValue({sports: e})
      }
      if (c == 'affilated') {
        this.orgForm.patchValue({affilated: e});
      }
    }
    addOrg(){      
      if (this.orgForm.value.logo == "" || this.orgForm.value.placePic == null) {
        if (this.orgForm.value.logo == "") {
          this.toastr.warning('Please upload logo ', 'Warning');
        }
        if (this.orgForm.value.placePic == null) {
          this.toastr.warning('Please upload placepic images', 'Warning');
        }
      }
      else{
            if (this._id) {
              this.orgForm.patchValue({sports :this.spotsIns});    
              this.http.put(environment.api +"/organizer/"+this._id,this.orgForm.value)
                      .subscribe((res)=>{
                        var d = res.json();
                        if (d._id) {
                          this.toastr.success('Organizer Updated Successfully', 'Success');
                          this.router.navigate(['/organizer']);
                        }
                      },(error)=>{
                        this.toastr.error('Something went wrong !! Please try again later', 'Error');
                      })
            } 
            else {
              var h = new Date().getHours();
              var m = new Date().getMinutes();
              var r = new Date();
              r.setHours(h);
              r.setMinutes(m);
              this.orgForm.patchValue({sports :this.spotsIns});                              
              this.orgForm.patchValue({registered :r});                              
              this.http.post(environment.api +"/organizer",this.orgForm.value)
                      .subscribe((res)=>{
                        var d = res.json();
                        if (d._id) {
                          this.toastr.success('Organizer Registered Successfully', 'Success');
                          this.router.navigate(['/organizer']);
                        }
                      },(error)=>{
                        this.toastr.error('Something went wrong !! Please try again later', 'Error');
                      })
            }
      }
    }
}
