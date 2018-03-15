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
  public fullSports : Array<any>;
  public clubSeasons : Array<any> = [];
  public clubClassifications : Array <any> = [];
  public clubClassificationsValue : Array <any> ;
  public sub: any;
  public subscription:Subscription;
  public clubClassificationsValueDisplay :Boolean=false;
  public resS :Boolean=false;
  public hasCreatePerm;
  constructor(public fb: FormBuilder,private http : Http,private accr: AccessorService, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute,public clubService:ClubService,public sportService:SportsService){
      this.clubId = localStorage.getItem('clubid');
      this.comForm = this.fb.group({ name: ["",[Validators.required]],description: [""],sports: [null,[Validators.required]],clubSeasons: ["",[Validators.required]],clubClassifications: ["",[Validators.required]],clubClassificationsValue: ["",[Validators.required]],club:[this.clubId ,[Validators.required]]});
      this.subscription = this.clubService.getSeasonList().subscribe((res) => { this.clubSeasons = res; })   

      this.subscription = this.clubService.getClassificationsList().subscribe((res) => { if (res != []) this.clubClassifications = res;})   
      this.resS = false;
      
      this.subscription = this.sportService.getSportsList().subscribe((res)=>{ this.sports = res; this.fullSports = res; });
  }

  ngOnInit() {    
    this.subscription = this.clubService.getSingleTournamentsData().subscribe(res=>{
        this.resS = false;
        this.comForm.patchValue(res[0]);
        this.comForm.controls['clubSeasons'].setValue(res[0].clubSeasons._id, {onlySelf: true});
        this.comForm.controls['clubClassifications'].setValue(res[0].clubClassifications._id, {onlySelf: true});
        this.getClasValue(res[0].clubClassifications._id);
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
    if (this.comForm.valid) {
          if (this._id) {
              this.clubService.updateTournaments(this._id,this.comForm.value);
              this.reset();
          } else {
              this.clubService.saveTournaments(this.comForm.value);
              this.reset();              
          }
    } else {
      this.toastr.error('Please fill up all values','Error');
    }
  }
  getClasValue(e:any){
    this.clubClassificationsValueDisplay = true;
    this.clubClassificationsValue = this.clubClassifications.filter(ad => ad._id == e);
  }
  reset(){
    this.comForm.reset();
    this.clubClassificationsValueDisplay = false;
    this.resS = true;
    this.sports = [];
    this.sports = this.fullSports;
  }
}
