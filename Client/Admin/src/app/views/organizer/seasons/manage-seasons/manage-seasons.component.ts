import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Location } from '@angular/common';

import { Http } from "@angular/http";
import { environment } from "../../../../../environments/environment";1
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { start } from 'repl';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { OrganizerService } from '../../../../components/services/organizer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-manage-seasons',
  templateUrl: './manage-seasons.component.html',
  styleUrls: ['./manage-seasons.component.css']
})
export class ManageSeasonsComponent implements OnInit {

  public sub: any;
  public _id: any;
  public seasonForm : FormGroup;
  public start_date = new Date();
  public minDate : any;
  public maxDate = new Date();
  public maxDate2 = new Date();
  public startTime :Date =  new Date();
  public endTime : Date =  new Date();
  public endMinDate = new Date();
  public subscription: Subscription;

  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(
              public fb: FormBuilder,
              private toastr : ToastrService,
              public http:Http,
              private router: Router,
              public activeRouter:ActivatedRoute,
              public location:Location,
              public orgService:OrganizerService) {
    // this.start_ate = new Date();
    this.bsConfig = {
      containerClass: 'theme-orange',
      dateInputFormat :'DD/MM/YY',
      showWeekNumbers:false
    };
    this.endMinDate.setDate(this.start_date.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 365);
    this.maxDate2.setDate(this.maxDate2.getDate() + 365);
    this.seasonForm = this.fb.group({
      'name' : ["",[Validators.required]],
      'start_date' : [this.start_date,[Validators.required]],
      'end_date' : [null,[Validators.required]],
      "organizer":[""]
    },{validator:this.dateLessThan('start_date', 'end_date')});
    this.seasonForm.get('start_date').valueChanges.subscribe(d=>{
      this.dateMin(d);
    })
  }
  dateMin(e){
    var t = new Date(e);
    this.endMinDate.setDate(t.getDate()+1);
  }
  dateLessThan(start_date: string, end_date : string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls[start_date];
     let t = group.controls[end_date ];
     if (f.value > t.value) {
       return {
         dates: "Start Date should be less than End Date"
       };
     }
     return {};
    }
  }
  setTimeValue(startTime){ this.startTime = startTime; }
  endTimeValue(endTime){ this.endTime = endTime; }
  addSesons(){
    if (this.seasonForm.valid) {
    var orid=localStorage.getItem('orgid');
    this.seasonForm.value.organizer=orid;
      if (this._id) {
        this.orgService.updateSeason(this._id,this.seasonForm.value);
        this._id = false;
      } 
      else {
        this.orgService.saveSeason(this.seasonForm.value);
      }
    } 
  }
  back(){
    this.location.back();
  }
  resetForm(){
    this.seasonForm.reset();
    this.seasonForm.patchValue({start_date:this.start_date});
  }
  ngOnInit() {
    this.subscription = this.orgService.getSingleSeason().subscribe(res=>{ 
      this.seasonForm.patchValue({start_date:new Date(res.start_date)});
      this.seasonForm.patchValue({end_date:new Date(res.end_date)});
      this.seasonForm.patchValue({name:res.name});
      this._id = res._id;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
