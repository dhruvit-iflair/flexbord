import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { fakedb } from "../../../../components/common/fakedb";

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
  public clubSeasons : Array<any> = [];
  public clubClassifications : Array <any> = [];
  public clubClassificationsValue : Array <any> ;
  public sub: any;
  constructor(public fb: FormBuilder,private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute){
      
      this.clubId = localStorage.getItem('clubid');
      this.comForm = this.fb.group({ name: ["",[Validators.required]],description: ["",[Validators.required]],sports: [null,[Validators.required]],clubSeasons: ["",[Validators.required]],clubClassifications: ["",[Validators.required]],clubClassificationsValue: ["",[Validators.required]],club:[this.clubId ,[Validators.required]]});
      this.http.get(environment.api + "/club/"+this.clubId).subscribe((res) => {
            this.club = res.json()[0];
            this.sports = fakedb.sport.filter(element => this.club.sports.includes(element.id));
      })      
      this.http.get(environment.api + "/clubSeasons/byclub/"+this.clubId).subscribe((res) => {
              this.clubSeasons = res.json();
      })   
      this.http.get(environment.api + "/clubClassifications/byclub/"+this.clubId).subscribe((res) => {
              if (res.json() != []) this.clubClassifications = res.json();
      })   
  }

  ngOnInit() {    
    this.sub = this.activeRouter.params.subscribe(params => {
     if (params._id) {
        this._id = params._id;
        this.http.get(environment.api + '/clubTournaments/'+ params._id).subscribe((res)=>{
              var fagdf = res.json();
              if(fagdf.length > 0){
                  this.comForm.patchValue(fagdf[0]);
                  this.comForm.controls['clubSeasons'].setValue(fagdf[0].clubSeasons._id, {onlySelf: true});
                  this.comForm.controls['clubClassifications'].setValue(fagdf[0].clubClassifications._id, {onlySelf: true});
                  this.getClasValue(fagdf[0].clubClassifications._id);
                  this.comForm.controls['clubClassificationsValue'].setValue(fagdf[0].clubClassificationsValue, {onlySelf: true});
              }
        });
      }
   });
  }
  saveVal(){
    if (this.comForm.valid) {
          if (this._id) {
              this.http.put(environment.api + "/clubTournaments/"+this._id,this.comForm.value).subscribe((res) => {
                    if(res) this.router.navigate(['/club/tournaments']); this.toastr.success('Successfully updated tournamnet','Success');
              }) 
          } else {
              this.http.post(environment.api + "/clubTournaments",this.comForm.value).subscribe((res) => {
                    if(res) this.router.navigate(['/club/tournaments']); this.toastr.success('Successfully saved tournamnet','Success');
              }) 
          }
    } else {
      this.toastr.error('Please fill up all values','Error');
    }
  }
  getClasValue(e:any){
    this.clubClassificationsValue = this.clubClassifications.filter(ad => ad._id == e);
  }
}
