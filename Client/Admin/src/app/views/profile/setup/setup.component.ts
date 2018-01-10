import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';

declare var jQuery:any;

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  public items:Array<any> ;
  public value:any;
  public check = true;
  public organizer: Array<any>;

  constructor(public http : Http,
              public tost : ToastrService) {
  }

  ngOnInit() {
      this.http.get(environment.api + '/organizer')
               .subscribe((res)=>{
                 this.items = res.json();
                 this.organizer = res.json();
               })
    
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
    console.log(this.check);
    if (event.target.checked) {
      // jQuery('.js-example-basic-single').val('').trigger('change');
      // if (this.organizer) {
        
      // } else {
        
      // }
    }
  }
  assign(e){
    
    if (this.organizer.length) {
      this.items = this.organizer;
      console.log(this.check);
    }
    else {
      this.check = true;    
      console.log(this.check);
    }
  }
}

 