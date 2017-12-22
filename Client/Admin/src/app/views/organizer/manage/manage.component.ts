import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fakedb } from "../../../components/common/fakedb";

declare var jQuery:any;

@Component({
  selector: 'app-manage',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageOrganizerComponent implements OnInit {
  public orgdata={building:'',street:'',city:'',state:'',country:'',zipcode:'',website:'',email:'',phonenumber:''};
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
  
  constructor() { }

  ngOnInit() {
    this.userSettings = Object.assign({},this.userSettings);
    this.items = fakedb.org;
    this.spots = fakedb.sport;
    jQuery(document).ready(function() {
        jQuery('.js-example-basic-single').select2({
          placeholder: 'Select Organizer',          
          allowClear: true
        });
        jQuery('.spt').select2({
          placeholder: 'Select Spots',          
          allowClear: true
        });
    });
  }
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
        reader.onload = (event:any) => {     
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  picPlaceUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
        reader.onload = (event:any) => {     
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
        console.log(selectedData.data);
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

}
