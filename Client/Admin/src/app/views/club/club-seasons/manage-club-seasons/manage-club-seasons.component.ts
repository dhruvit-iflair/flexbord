import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Location } from '@angular/common';

import { Http } from "@angular/http";
import { environment } from "../../../../../environments/environment";1
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { start } from 'repl';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../../../components/services/club.service';
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-manage-club-seasons',
  templateUrl: './manage-club-seasons.component.html',
  styleUrls: ['./manage-club-seasons.component.css']
})
export class ManageClubSeasonsComponent implements OnInit {

  public sub: any;
  public _id: any;
  public seasonForm : FormGroup;
  public start_date = new Date();
  public endMinDate = new Date();
  public subscription : Subscription;
  public maxDate = new Date();
  public maxDate2 = new Date();
  public bsConfig: Partial<BsDatepickerConfig>;

public hasCreatePerm;
public click :Boolean = true;
  constructor(public fb: FormBuilder,private toastr : ToastrService,private accr: AccessorService,public http:Http,private router: Router,public activeRouter:ActivatedRoute,public location:Location,public clubService:ClubService) {
    // this.start_ate = new Date();
    this.bsConfig = {
      containerClass: 'theme-orange',
      dateInputFormat :'DD/MM/YY',
      showWeekNumbers:false
    };
    this.endMinDate.setDate(this.start_date.getDate() + 1);
    this.seasonForm = this.fb.group({
      'name' : ["",[Validators.required]],
      'start_date' : [this.start_date,[Validators.required]],
      'end_date' : [this.endMinDate,[Validators.required]],
      "club":[""]
    });
    this.seasonForm.get('start_date').valueChanges.subscribe(d=>{
      var t = new Date(d)
      this.endMinDate.setDate(t.getDate() + 1);
      this.endMinDate.setMonth(t.getMonth());
      this.endMinDate.setFullYear(t.getFullYear());
    })
    this.seasonForm.get('end_date').valueChanges.subscribe(d=>{
      var t = new Date(d)
      this.seasonForm.patchValue({start_date:this.seasonForm.value.start_date});
      this.start_date.setDate(t.getDate()-1);
      this.start_date.setMonth(t.getMonth());
      this.start_date.setFullYear(t.getFullYear());
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubseasons1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
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
 
  addSesons(){
    if(this.click){
      if (this.seasonForm.valid) {
        this.click = false;
        var clubid=localStorage.getItem('clubid');
        this.seasonForm.value.club=clubid;
          if (this._id) {
            this.clubService.updateSeason(this._id,this.seasonForm.value);
            this.reset();
          } 
          else {
            this.clubService.saveSeason(this.seasonForm.value);
            this.reset();        
          }
       }
     } 
  }
  back(){
    this.location.back();
  }
  ngOnInit() {
    this.subscription = this.clubService.getSingleSeasonData().subscribe(res=>{
      var fagdf = res;
      this._id = fagdf[0]._id;
      if(fagdf.length > 0){
          this.seasonForm.patchValue({start_date:fagdf[0].start_date});
          this.seasonForm.patchValue({end_date:fagdf[0].end_date});
          this.seasonForm.patchValue({name:fagdf[0].name});
      }
    });
        this.checkpermissions();
  }
  reset(){
    this.seasonForm.reset();
    var t = new Date();
    var e = new Date();
    e.setDate(t.getDate()+1);
    this.seasonForm.patchValue({start_date:t});
    this.seasonForm.patchValue({end_date:e});
    setTimeout(() => {
      this.click = true;
    }, 150);
    
  }
}
