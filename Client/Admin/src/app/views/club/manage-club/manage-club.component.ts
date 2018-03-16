import { Component, OnInit, ViewEncapsulation,OnDestroy } from '@angular/core';
import { fakedb } from "../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router ,ActivatedRoute} from "@angular/router";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../../components/services/club.service';
import { OrganizerService } from '../../../components/services/organizer.service';
import { SportsService } from '../../../components/services/sports.service';
import { AccessorService } from "../../../components/common/accessor.service";

@Component({
  selector: 'app-manage-club',
  templateUrl: './manage-club.component.html',
  styleUrls: ['./manage-club.component.css'],
  outputs: ['inputValueChange']
})
export class ManageClubComponent implements OnInit {
  
  public orgdata:any;
  public subscription: Subscription
  public items:Array<any> ;
  public items2:Array<any> ;
  public spots:Array<any> = [] ;
  public url:any;
  public placePic:any;
  public value : any;
  public value2 : Array<string>;
  public sub: any;
  public tabz: any;
  public logo: any;
  public picEnv = environment.picpoint +'clublogos/';
  public logo2: any;
  public _id: any;
  public fileSupport:Boolean = false;
  public fileSizeMin:Boolean = false;
  public fileSizeMax:Boolean = false;
  public fileSupport2:Boolean = false;
  public fileSizeMin2:Boolean = false;
  public fileSizeMax2:Boolean = false;

  public hasMembersPerm;hasSeasonsPerm;hasClassificationsPerm;hasTournamentsPerm;
  public click:Boolean = true;

  public clubForm : FormGroup;
  constructor(public fb: FormBuilder,
              private http : Http,
              private toastr : ToastrService,
              private router: Router,
              public activeRouter:ActivatedRoute,
              public clubService: ClubService,
              private accr: AccessorService,
              public orgService:OrganizerService,
              public sportService:SportsService) {
    this.sportService.getAllSports();
    this.subscription = this.sportService.getSportsList().subscribe((res)=>{
      this.spots = res;
    });
    this.clubForm = this.fb.group({
      name: ["",[Validators.required]],subDomain: ["",[Validators.required]],
      abbreviation: ["",[Validators.required]],logo: [""], address: [""],
      building: [""],street: [""],city: ["",[Validators.required]],state: [""],country: ["",[Validators.required]],zipcode: [""],website: [""],email: [""],
      // phonenumber: [null,[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
      phonenumber: [null],sports: [null],capacity:  [1],placePic: [null],affilated:  [""],affilation:  [""],
      registered: [null]
    })
   }

  ngOnInit() {

    this.orgService.getAllOrganizers();
    this.subscription = this.orgService.getSingleOrganizersList().subscribe((res)=>{
      this.items = res;
    });
    this.subscription = this.clubService.getTabActive().subscribe(id=>{
      this.tabz = id;
    })
    this.sub = this.activeRouter.params.subscribe(params => {
      if (params._id) {
        this._id = params._id;
        this.clubService.collectData(this._id);
        this.http.get(environment.api + '/club/'+ params._id).subscribe((res)=>{
          var fagdf = res.json();
          if(fagdf.length > 0){
              var comming = res.json();
              this.orgdata = comming[0];
              if (comming[0].logo) {
                this.logo =  comming[0].logo;
              }
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
  this.checkpermissions();
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
      this.fileSupport2 = false;this.fileSizeMin2 = false; this.fileSizeMax2 = false; 
      if (file.type == 'image/jpeg' && file.size < 2000000 && file.size > 150000 || file.type == 'image/png' && file.size < 2000000 && file.size > 150000 ) {
      this.fileSupport2 = false;this.fileSizeMin2 = false; this.fileSizeMax2 = false; 
        let file = event.target.files[0];
        let up = new FormData();
        up.append('placePic', file);
        this.http.post(environment.api+"/club/upload",up).subscribe((res) => {  
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
        if (file.type == 'image/jpeg' &&  file.size > 2000000 || file.type == 'image/png'   &&  file.size > 2000000) {
          this.fileSizeMax2 = true; 
          this.toastr.warning('Image should be less than 2 Mb!! ', 'Warning');                        
        } 
        else if (file.type == 'image/jpeg' && file.size < 150000 || file.type == 'image/png' && file.size < 150000) {
          this.toastr.warning('Image should be more than 150Kb!! ', 'Warning');                        
          this.fileSizeMin2 = true;           
        }
        else {
          this.fileSupport2 = true;
          this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');                                  
        }
      }
    }
  }

    checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubtournaments0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasTournamentsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubmembers0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasMembersPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubseasons0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasSeasonsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubclassifications0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasClassificationsPerm = true;
      }
    }
  }
  addOrg(){      
    if (this._id) {   
      this.clubService.updateClub(this._id,this.clubForm.value);
    } 
    else {
      this.clubService.saveClub(this.clubForm.value);
// =======
//   addOrg(){
//     if(this.click){
//       this.click = false ;
//       if (this._id) {   
//         this.clubService.updateClub(this._id,this.clubForm.value);
//         setTimeout(() => {
//           this.click=true;
//         }, 150);
//       } 
//       else {
//         this.clubService.saveClub(this.clubForm.value);
//         var h = new Date().getHours();
//         var m = new Date().getMinutes();
//         var r = new Date();
//         r.setHours(h);
//         r.setMinutes(m);                         
//         this.clubForm.value.registered =r ;                              
//         this.http.post(environment.api +"/club",this.clubForm.value).subscribe((res)=>{
//             var d = res.json();
//             if (d._id) {
//                 setTimeout(() => {
//                   this.click=true;
//                 }, 150);
//                 this.toastr.success('Club Registered Successfully', 'Success');
//                 this.router.navigate(['/club/manage/'+d._id]);
//                 this.clubService.getAllClubList();
//             }
//         },(error)=>{
//             this.toastr.error('Something went wrong !! Please try again later', 'Error');
//         })
//       }
// >>>>>>> e89815ee44cee6fad6abb4e97a92a8a7a30b340f
    }
  }
}