import { Component, OnInit } from '@angular/core';
import { fakedb } from "../../../components/common/fakedb";

declare var jQuery:any;

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  public items:Array<any> ;
  public value:any;
  public checked = true;

  constructor() { }

  ngOnInit() {
    this.items = fakedb.org;
    jQuery(document).ready(function() {
        jQuery('.js-example-basic-single').select2({
          placeholder: 'Select an Organizer',          
          allowClear: true
        });
    });
    
  }
  public selected() {
    var t = jQuery('.js-example-basic-single').val();
    console.log(t);
    
  }
  change(event){
    console.log(event.target.checked);
    if (event.target.checked) {
      jQuery('.js-example-basic-single').val('').trigger('change')
      ;
    }
  }
  assign(e){
      this.items = fakedb.org;
  }
}

 