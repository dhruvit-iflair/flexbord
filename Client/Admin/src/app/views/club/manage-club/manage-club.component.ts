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
  selector: 'app-manage-club',
  templateUrl: './manage-club.component.html',
  styleUrls: ['./manage-club.component.css'],
  outputs: ['inputValueChange']
})
export class ManageClubComponent implements OnInit {
  // public inputValueChange: EventEmitter<any> = new EventEmitter();

  // public logo:any;
  // public placePic:any;
  // public spots = fakedb.sport;
  // public clubForm = { 
  //   name : "",         subDomain : "",
  //   abbreviation : "", affilated : "", 
  //   logo : null,         address : "",
  //   building : "",     street : "",
  //   country : "",      state : "",
  //   city : "",         zipcode : "",
  //   capacity : null,   placePic : [],
  //   website : "",      email : "",
  //   phonenumber : "",  sports  : [],
  //   affilation  : "",  registered : null,
  // }
  // constructor(public clubService:ClubService, public toastr:ToastrService) {
  // }

  // ngOnInit() {

  // }
  // setAdd(e){
  //   console.log(e);
  //   this.clubForm.address =e.formatted_address;
  //   this.clubForm.phonenumber = e.formatted_phone_number;
  //   this.clubForm.website = e.website;
  //   e.address_components.forEach((add)=>{
  //         if (add.types[0] == "postal_code") {
  //           this.clubForm.zipcode = add.long_name;
  //         } 
  //         if (add.types[0] == "country") {
  //           this.clubForm.country = add.long_name;
  //         } 
  //         if (add.types[0] == "administrative_area_level_1") {
  //           this.clubForm.state = add.long_name;
  //         }
  //         if (add.types[0] == "administrative_area_level_2") {
  //           this.clubForm.city = add.long_name;
  //         } 
  //         if (add.types[0] == "route") {
  //           this.clubForm.street = add.long_name;
  //         } 
  //         else {
  //           var u = e.formatted_address.split(',');
  //           var b = u[0] + ', ' + u[1]; 
  //           this.clubForm.building =  b;
  //         }
  //     })
  //   // this.inputValueChange.emit(this.clubForm);
  // }

  // saveClub(c:any){
  //   console.log(c);
  //   console.log(this.clubForm);
  // }
  // readUrl(event:any) {
  //   console.log(event);
  //   if (event.target.files && event.target.files[0]) {
  //     let file = event.target.files[0];
  //     if (file.type == 'image/jpeg' || file.type == 'image/png' && file.size < 2000000) {
  //       let up = new FormData();
  //       up.append('logo', file);
  //       this.clubService.logo(up)
  //             .subscribe((res) => {  
  //               if (res) {
  //                 this.clubForm.logo = res;
  //                 var reader = new FileReader();
  //                   reader.onload = (event:any) => {     
  //                   this.logo = event.target.result;
  //                 }
  //                 reader.readAsDataURL(event.target.files[0]);
  //               }
  //               else{
  //                 this.toastr.error('Error!! Something went wrong! try again later', 'Error');                 
  //               }
  //             })
  //     } 
  //     else {
  //       if ( file.size > 2000000) {
  //         this.toastr.warning('Image should be less than 2 Mb!! ', 'Warning');                        
          
  //       } else {
  //         this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');                                  
  //       }
  //     }    
      
  //   }
  // }
  // picPlaceUrl(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     let file = event.target.files[0];
  //     if (file.type == 'image/jpeg' || file.type == 'image/png' && file.size < 2000000) {
  //       let file = event.target.files[0];
  //       let up = new FormData();
  //       up.append('placePic', file);
  //       this.clubService.placePic(up)
  //             .subscribe((res) => {  
  //                if (res) {
  //                 this.clubForm.placePic = res;
  //                }
  //       })
  //       var reader = new FileReader();
  //         reader.onload = (event:any) => {     
  //         this.placePic = event.target.result;
  //       }
  //       reader.readAsDataURL(event.target.files[0]);
  //     } 
  //     else {
  //       if ( file.size > 2000000) {
  //         this.toastr.warning('Image should be less than 2 Mb!! ', 'Warning');                        
          
  //       } else {
  //         this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');                                  
  //       }
  //     }    
      
  //   }
  // }
  // selec(id){
  //     var d = this.spotsIns.findIndex(r =>r == id);
  //     var sf = this.spots.findIndex(r=> r.id == id);
  //     var y =this.spotsdInsText.findIndex(r=>r == this.spots[sf].name);
  //     if (d != -1) {
  //       this.spotsIns.splice(d,1);
  //       this.spotsdInsText.splice(y,1);  
  //     } else {
  //       this.spotsIns.push(id);
  //       this.spotsdInsText.push(this.spots[sf].name);     
  //     }
  //   this.spotsIns.sort();
  //   this.spotsdInsText.sort();
  //   this.clubForm.patchValue({sports :this.spotsdInsText});
  // }
  public orgdata:any;
  public items:Array<any> ;
  public items2:Array<any> ;
  public spots:Array<any> ;
  public url:any;
  public placePic:any;
  public value : any;
  public value2 : Array<string>;
  public sub: any;
  public logo: any;
  public logo2: any;
  public _id: any;
  public clubForm : FormGroup;
  // public value : any = 9;
  // public value2 : Array<string> =["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"];
  constructor(public fb: FormBuilder,private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute) {
    this.clubForm = this.fb.group({
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
      website: [""],
      email: [""],
      // phonenumber: [null,[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
      phonenumber: [null],
      sports: [null],
      capacity:  [null],
      placePic: [null],
      affilated:  [""],
      affilation:  [""],
      registered: [null]
    })
   }

  ngOnInit() {
    // this.http.get(environment.api + '/club')
    //         .subscribe((res)=>{
    //           this.items2 = res.json();
    //           this.sub = this.activeRouter.params.subscribe(params => {
    //             if (params._id) {
    //                 this.items = this.items2.filter(af=> af._id != params._id);
    //             }
    //             else{
    //               this.items = res.json();
    //             }
    //           });
    //         });

    this.http.get(environment.api + '/sports').subscribe((res)=>{
      this.spots = res.json();
    });
    this.http.get(environment.api + '/organizer').subscribe((res)=>{
      this.items = res.json();
    });
    this.sub = this.activeRouter.params.subscribe(params => {
      // //console.log(params._id);
      if (params._id) {
        this._id = params._id;
        this.http.get(environment.api + '/club/'+ params._id)
                 .subscribe((res)=>{
                   var fagdf = res.json();
                 if(fagdf.length > 0){
                    var comming = res.json();
                    this.orgdata = comming[0];
                    this.logo = environment.picpoint +'clublogos/'+ comming[0].logo;
                    var yaar = [];
                    if (comming[0].placePic) {
                      comming[0].placePic.forEach((asd)=>{
                        yaar.push(environment.picpoint +'clubplacepics/'+ asd);
                      })
                    }
                    this.logo2 = yaar
                    this.clubForm.patchValue( comming[0]);
                    this.clubForm.controls['affilated'].setValue(fagdf[0].affilated, {onlySelf: true})
                  }
                  else {
                    this.toastr.error('Error!! No Club found!', 'Error');
                    this.router.navigate(['/club']);
                  }
                 },(error)=>{
                  this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                });
      }
   });
  }
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type == 'image/jpeg' || file.type == 'image/png' && file.size < 2000000) {
        let up = new FormData();
        up.append('logo', file);
        this.http.post(environment.api+"/club/logo",up)  
              .subscribe((res) => {  
                if (res) {
                  var log  = res.json();
                  this.clubForm.patchValue({logo: log});
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
    this.clubForm.patchValue({address:e.formatted_address});
    this.clubForm.patchValue({phonenumber:e.formatted_phone_number});
    this.clubForm.patchValue({website:e.website});
    var address = { zipcode:'', country:'', state:'', city:'', street:'', building:'' }
     for (var i = 0; i < e.address_components.length; i++) {
          var add = e.address_components[i].types[0];
          if (add == "postal_code") {
            address.zipcode = e.address_components[i].long_name;
          } 
          else if (add == "country") {
            address.country = e.address_components[i].long_name;
          } 
          else if (add == "administrative_area_level_1") {
            address.state = e.address_components[i].long_name;
          }
          else if (add == "administrative_area_level_2") {
            address.city = e.address_components[i].long_name;
          } 
          else if (add == "route") {
            address.street = e.address_components[i].long_name;
          } 
          else {
            var st = e.formatted_address.split(',');
            if (st[0] && st[1] != undefined) {
              address.building = st[0]+ ", " +st[1];
            } else {
              address.building = st[0];   
              
            }
          }
          if (i == e.address_components.length -1) {
            this.clubForm.patchValue(address);
          }
    }
    
  }
  picPlaceUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type == 'image/jpeg' || file.type == 'image/png' && file.size < 2000000) {
        let file = event.target.files[0];
        let up = new FormData();
        up.append('placePic', file);
        this.http.post(environment.api+"/club/upload",up)  
              .subscribe((res) => {  
                 if (res) {
                   var log  = res.json();
                   this.clubForm.patchValue({placePic: log});
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
    addOrg(){      
      // if (this.clubForm.value.logo == "" || this.clubForm.value.placePic == null) {
      //   if (this.clubForm.value.logo == "") {
      //     this.toastr.warning('Please upload logo ', 'Warning');
      //   }
      //   if (this.clubForm.value.placePic == null || this.clubForm.value.placePic == '' ) {
      //     this.toastr.warning('Please upload placepic images', 'Warning');
      //   }
      // }
      // else{
            if (this._id) {   
              this.http.put(environment.api +"/club/"+this._id,this.clubForm.value)
                      .subscribe((res)=>{
                        var d = res.json();
                        if (d._id) {
                          this.toastr.success('Club Updated Successfully', 'Success');
                          this.router.navigate(['/club']);
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
              this.clubForm.patchValue({registered :r});                              
              this.http.post(environment.api +"/club",this.clubForm.value)
                      .subscribe((res)=>{
                        var d = res.json();
                        if (d._id) {
                          this.toastr.success('Club Registered Successfully', 'Success');
                          this.router.navigate(['/club']);
                        }
                      },(error)=>{
                        this.toastr.error('Something went wrong !! Please try again later', 'Error');
                      })
            }
     // }
    }
}