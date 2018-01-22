import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Http } from "@angular/http";
import { environment } from "../../../../../environments/environment";1
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { start } from 'repl';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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
  minDate = new Date();
  public maxDate = new Date();
  public startTime :Date =  new Date();
  public endTime : Date =  new Date();
  public endMinDate = new Date();

  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(public fb: FormBuilder,private toastr : ToastrService,public http:Http,private router: Router,public activeRouter:ActivatedRoute,public location:Location) {
    // this.start_ate = new Date();
    this.bsConfig = {
      containerClass: 'theme-orange',
      dateInputFormat :'DD/MM/YY',
      showWeekNumbers:false
    };
    this.maxDate.setDate(this.maxDate.getDate() + 365);
    this.seasonForm = this.fb.group({
      'name' : ["",[Validators.required]],
      'start_date' : [this.start_date,[Validators.required]],
      'end_date' : [null,[Validators.required]],
      "organizer":[""]
    },{validator:this.dateLessThan('start_date', 'end_date')})
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
    // //console.log(this.seasonForm.value);
    var hs = new Date(this.startTime).getHours();
    var ms = new Date(this.startTime).getMinutes();    
    var he = new Date(this.endTime).getHours();
    var me = new Date(this.endTime).getMinutes();
    var s = new Date(this.seasonForm.value.start_date);
    s.setHours(hs);
    s.setMinutes(ms);
    var e = new Date(this.seasonForm.value.end_date);
    e.setHours(he);
    e.setMinutes(me); 
    this.seasonForm.patchValue({start_date : s});
    this.seasonForm.patchValue({end_date : e});
    if (this.seasonForm.valid) {
    var orid=localStorage.getItem('orgid');
    this.seasonForm.value.organizer=orid;
      if (this._id) {
        this.http.put(environment.api+'/seasons/'+this._id,this.seasonForm.value)
                 .subscribe((res)=>{
                    var fagdf = res.json();
                    if(res){
                      this.toastr.success('Season updated successfully', 'Success');
                      this.router.navigate(['/seasons']);
                    }
                    else {
                        this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
                        // this.router.navigate(['/seasons']);
                    }
                  },(error)=>{
                  this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                });

      } 
      else {
        var s = new Date(this.seasonForm.value.start_date);
        s.setHours(this.startTime.getHours());
        s.setMinutes(this.startTime.getMinutes());
        var e = new Date(this.seasonForm.value.end_date);
        e.setHours(this.endTime.getHours());
        e.setMinutes(this.endTime.getMinutes()); 
        this.seasonForm.value.start_date = s;
        this.seasonForm.value.end_date = e;
        this.http.post(environment.api+'/seasons',this.seasonForm.value)
                .subscribe((res)=>{
                  var fagdf = res.json();
                  if(res){
                    this.toastr.success('Season saved successfully', 'Success');
                    this.router.navigate(['/seasons']);
                  }
                  else {
                      this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
                      // this.router.navigate(['/seasons']);
                  }
                },(error)=>{
                this.toastr.error('Error!! Something went wrong! try again later', 'Error');
              });  
      }
    } 
  }
  back(){
    this.location.back();
  }
  ngOnInit() {
    this.seasonForm.controls['start_date'].valueChanges.subscribe((data) => { this.endMinDate.setDate(this.seasonForm.value.start_date + 1)});
    this.sub = this.activeRouter.params.subscribe(params => {
      // //console.log(params._id);
      if (params._id) {
        this._id = params._id;
        this.http.get(environment.api + '/seasons/'+ params._id)
                 .subscribe((res)=>{
                   var fagdf = res.json();
                   //console.log(fagdf);
                 if(fagdf.length > 0){
                   var ss = new Date(fagdf[0].start_date);
                   var es = new Date(fagdf[0].end_date);
                  this.seasonForm = this.fb.group({
                      'name' : [fagdf[0].name,[Validators.required]],
                      'start_date' : [ss,[Validators.required]],
                      'end_date' : [es,[Validators.required]]
                    },{validator:this.dateLessThan('start_date', 'end_date')});
                    this.startTime = fagdf[0].start_date;
                    this.endTime = fagdf[0].end_date;
                 }
                 else {
                    this.toastr.error('Error!! No Seasons found!', 'Error');
                    this.router.navigate(['/seasons']);
                  }
                 },(error)=>{
                  this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                });
      }
      else{
        this.seasonForm = this.fb.group({
          'name' : ["",[Validators.required]],
          'start_date' : [this.start_date,[Validators.required]],
          'end_date' : [null,[Validators.required]]
        },{validator:this.dateLessThan('start_date', 'end_date')})
      }
   });
  }

}
