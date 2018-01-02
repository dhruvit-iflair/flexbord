import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fakedb } from "../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-manage',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageOrganizerComponent implements OnInit {
  public orgdata={name:'',subDomain:'',abbreviation:'',logo:'', address:'',building:'',street:'',city:'',state:'',country:'',zipcode:'',website:'',email:'',phonenumber:'',sports:[],capacity:'',placePic:[],affilated:'',affilation:''};
  public items:Array<any> ;
  public spots:Array<any> ;
  public url:any;
  public placePic:any;
  public userSettings:any={
    showSearchButton: false,
    showCurrentLocation: false,
    showRecentSearch:false,
    recentStorageName: 'componentData'
  };
  public value : any;
  public value2 : Array<string>;
  // public value : any = 9;
  // public value2 : Array<string> =["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"];
  constructor(private http : Http, private toastr : ToastrService, private router: Router) { }

  ngOnInit() {
    this.userSettings = Object.assign({},this.userSettings);
    this.items = fakedb.org;
    this.spots = fakedb.sport;
  }
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let up = new FormData();
      up.append('logo', file);
      this.http.post(environment.api+"/organizer/logo",up)  
            .subscribe((res) => {  
               if (res) {
                 var log  = res.json();
                 this.orgdata.logo = log;
               }
            })
      var reader = new FileReader();
        reader.onload = (event:any) => {     
          debugger;
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  picPlaceUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let up = new FormData();
      up.append('placePic', file);
      this.http.post(environment.api+"/organizer/upload",up)  
            .subscribe((res) => {  
               if (res) {
                 var log  = res.json();
                 this.orgdata.placePic = log;
               }
      })
      var reader = new FileReader();
        reader.onload = (event:any) => {     
          debugger;
        this.placePic = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fieldClear(){
    this.orgdata.building='';this.orgdata.street='';this.orgdata.city='';
    this.orgdata.state='';this.orgdata.country='';this.orgdata.zipcode='';
    this.orgdata.website='';this.orgdata.email='';this.orgdata.phonenumber='';
  }
   autoCompleteCallbackHL(selectedData:any) {
     this.fieldClear();
        this.orgdata.address = selectedData.data.description;
        this.orgdata.zipcode=selectedData.data.address_components[selectedData.data.address_components.length-1].long_name;
        this.orgdata.country=selectedData.data.address_components[selectedData.data.address_components.length-2].long_name;
        this.orgdata.state=selectedData.data.address_components[selectedData.data.address_components.length-3].long_name;
        this.orgdata.city=selectedData.data.address_components[selectedData.data.address_components.length-4].long_name;
        this.orgdata.street=selectedData.data.address_components[selectedData.data.address_components.length-5].long_name;
        this.orgdata.building=selectedData.data.address_components[selectedData.data.address_components.length-6].long_name+', '+selectedData.data.address_components[selectedData.data.address_components.length-7].long_name;
        this.orgdata.phonenumber=selectedData.data.international_phone_number || selectedData.data.formatted_phone_number;
        this.orgdata.website=selectedData.data.website;
        this.orgdata.email=selectedData.data.email;
    }
    dataChanged(e,c){
      if (c == 'sport') {
        this.orgdata.sports = e;
      }
      else {
        this.orgdata.affilated = e ;
      }
    }
    addOrg(){
      console.log(this.orgdata);
      this.http.post(environment.api +"/organizer",this.orgdata)
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
