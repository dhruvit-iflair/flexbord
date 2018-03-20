import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../../../components/services/club.service';
import { SportsService } from '../../../../components/services/sports.service';
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-manageclub-tournaments',
  templateUrl: './manageclub-tournaments.component.html',
  styleUrls: ['./manageclub-tournaments.component.css']
})
export class ManageclubTournamentsComponent implements OnInit {
  public comForm : FormGroup;
  public clubId:any;
  public _id:any;
  public club:any;
  public sports : Array<any>;
  public my_Class :string = "form-control ng-untouched ng-pristine ng-invalid ";
  public value : Array<any>;
  public fullSports : Array<any>;
  public clubSeasons : Array<any> = [];
  public clubClassifications : Array <any>;
  public clubClassificationsValue : Array <any> = [] ;
  
  public sub: any;
  public subscription:Subscription;
  public clubClassificationsValueDisplay :Boolean=false;
  public resS :Boolean=false;
  public hasCreatePerm;
  public click :Boolean=true;
  constructor(public fb: FormBuilder,private http : Http,private accr: AccessorService, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute,public clubService:ClubService,public sportService:SportsService){

      this.clubId = localStorage.getItem('clubid');
      this.comForm = this.fb.group({ name: ["",[Validators.required]],description: [""],sports: [null,[Validators.required]],clubSeasons: [null,[Validators.required]],clubClassificationsValue: [[]],club:[this.clubId ,[Validators.required]],competition:["opened"]});
      this.subscription = this.clubService.getSeasonList().subscribe((res) => { this.clubSeasons = res; })   
      this.clubService.getAllClassificationsByClub();
      this.subscription = this.clubService.getClassificationsList().subscribe((res) => {this.clubClassifications = res;})   
      this.resS = false;
      
      this.subscription = this.sportService.getSportsList().subscribe((res)=>{ this.sports = res; this.fullSports = res;});
  }

  ngOnInit() {    
    this.subscription = this.clubService.getSingleTournamentsData().subscribe(res=>{
        this.resS = false;
        this.comForm.patchValue(res[0]);
        this.comForm.controls['clubSeasons'].setValue(res[0].clubSeasons._id, {onlySelf: true});
        // this.comForm.controls['clubClassifications'].setValue(res[0].clubClassifications._id, {onlySelf: true});
        this.clubClassificationsValue = res[0].clubClassificationsValue;
        // this.getClasValue(res[0].clubClassifications._id);
        this.comForm.controls['clubClassificationsValue'].setValue(res[0].clubClassificationsValue, {onlySelf: true});
        this._id = res[0]._id;
    })
    this.checkpermissions();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
    checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubtournaments1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
  }
  saveVal(){
    if (this.click) {      
      if (this.comForm.valid) {
        this.click =false;
            if (this._id) {
                this.clubService.updateTournaments(this._id,this.comForm.value);
                this.reset();
            } else {
                this.clubService.saveTournaments(this.comForm.value);
                this.reset();
            }
      } else {
        console.log(this.comForm.value);
        this.toastr.error('Please fill up all values','Error');
      }
    }
  }
  addSeason(){
    this.clubService.changeTab(2);
  }
  addClass(){
    this.clubService.changeTab(3);
  }
  getClasValue(e:any){
    // this.clubClassificationsValueDisplay = true;
    // this.clubClassificationsValue = this.clubClassifications.filter(ad => ad._id == e);
    this.comForm.patchValue({clubClassificationsValue:this.clubClassificationsValue})

  }
  reset(){
    this.comForm.reset();
    this.resS = true;
    this.sports = [];
    // var u = this.clubClassifications;
    // this.clubClassifications = [];
    // this.clubClassifications = u;
    // var v = this.clubClassificationsValue;
    this.my_Class = "form-control ng-untouched ng-pristine ng-invalid "
    this.clubClassificationsValue = [];
    // this.clubClassificationsValue = v;
    this.sports = this.fullSports;
    this.comForm.patchValue({club:this.clubId,competition:"opened"});
    setTimeout(() => {
      this.click = true;    
    }, 150);
  }
}
