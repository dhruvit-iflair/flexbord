import { Component, OnInit } from '@angular/core';
import { fakedb } from "../../../components/common/fakedb";

declare var jQuery:any;

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageOrganizerComponent implements OnInit {
  public items:Array<any> ;
  public spots:Array<any> ;
  public url:any;
  public placePic:any;

  constructor() { }

  ngOnInit() {
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

}
