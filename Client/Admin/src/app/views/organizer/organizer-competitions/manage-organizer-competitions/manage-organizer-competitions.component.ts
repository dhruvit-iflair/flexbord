import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { fakedb } from "../../../../components/common/fakedb";

@Component({
  selector: 'app-manage-organizer-competitions',
  templateUrl: './manage-organizer-competitions.component.html',
  styleUrls: ['./manage-organizer-competitions.component.css']
})
export class ManageOrganizerCompetitionsComponent implements OnInit {

  public comForm : FormGroup;
  public sub : any;
  public _id : any;
  public season : any;
  public amki : Array<any>;
  public sports :  Array<any>;
  public sportsValue : Array<any>;
  public classifications : any;
  public classValue :Array<any>;
  constructor(public fb: FormBuilder,private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute){
    this.comForm = this.fb.group({
      name: ["",[Validators.required]],
      description: ["",[Validators.required]],
      sports: [null,[Validators.required]],
      seasons: ["",[Validators.required]],
      organizerClassifications: ["",[Validators.required]],
      organizerClassificationsValue: ["",[Validators.required]]
    })

    this.http.get(environment.api + "/organizer/"+localStorage.getItem('orgid'))
            .subscribe((res) => {
              var r = res.json(); 
              this.sportsValue = r[0].sports;
              var w = [];
              for (let i = 0; i < fakedb.sport.length; i++) {
                const e = fakedb.sport[i];
                for (let j = 0; j < this.sportsValue.length; j++) {
                  if (e.id == this.sportsValue[j]) {
                      w.push(fakedb.sport[i]);
                  } 
                }
                if (i == fakedb.sport.length -1 ) {
                    this.sports = w;
                    console.log(w);
                }              
              }
            })
            
  }

  ngOnInit() {    
    this.http.get(environment.api + '/seasons')
              .subscribe((res)=>{
                var fagdf = res.json();
                this.amki = fagdf;
                var t = this.amki.filter((rf)=>rf.organizer==  localStorage.getItem('orgid'));
                if(t.length > 0){
                  // this.season = fagdf;
                  this.season = t;                  
                  // console.log(t);
                }
                // else {
                //     this.toastr.error('Error!! No Season found! Please Create one', 'Error');
                //     this.router.navigate(['/seasons']);
                // }
                },(error)=>{
                    this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                    this.router.navigate(['/competitions']);
     });
     this.http.get(environment.api + '/organizerClassifications')
              .subscribe((res)=>{
                var fagdf = res.json();
                var u = [];
                u= fagdf;
                var t = u.filter((rf)=>rf.organizer==  localStorage.getItem('orgid'));
                   
                if(t.length > 0){
                  //  this.classifications = fagdf;
                   this.classifications = t;   
                }
                // else {
                //       this.toastr.error('Error!! No Classification found! Please Create one', 'Error');
                //       this.router.navigate(['/classifications']);
                //   }
                },(error)=>{
                      this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                      this.router.navigate(['/competitions']);
      });
    
    this.sub = this.activeRouter.params.subscribe(params => {
      if (params._id) {
        this._id = params._id;
        this.http.get(environment.api + '/orgCompetitions/'+ params._id)
               .subscribe((res)=>{
                 //console.log(res.json());
                 var fagdf = res.json();
                 if(fagdf.length > 0){
                  // this.classValue = this.classifications.filter(ad => ad._id == fagdf[0].organizerClassifications);
                  this.classValue = this.classifications.filter(ad => ad._id == fagdf[0].organizerClassifications._id); 
                      this.comForm = this.fb.group({
                        name: [fagdf[0].name,[Validators.required]],
                        description: [fagdf[0].description,[Validators.required]],
                        sports: [fagdf[0].sports,[Validators.required]],
                        seasons: [fagdf[0].seasons,[Validators.required]],
                        organizerClassifications: [fagdf[0].organizerClassifications,[Validators.required]],
                        organizerClassificationsValue: [fagdf[0].organizerClassificationsValue,[Validators.required]]
                      })
                   this.comForm.controls['seasons'].setValue(fagdf[0].seasons._id, {onlySelf: true});
                   this.comForm.controls['organizerClassifications'].setValue(fagdf[0].organizerClassifications._id, {onlySelf: true});
                   this.comForm.controls['organizerClassificationsValue'].setValue(fagdf[0].organizerClassificationsValue, {onlySelf: true});
                      // this.comForm.patchValue({seasons:});              
                   console.log(this.classValue);
                   console.log(fagdf[0].organizerClassificationsValue);

                 }
                 else {
                      this.toastr.error('Error!! No Competitions found!', 'Error');
                      this.router.navigate(['/competitions']);
                  }
                 },(error)=>{
                      this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                });
      }
      else{
        this.comForm = this.fb.group({
          name: ["",[Validators.required]],
          description: ["",[Validators.required]],
          sports: [null,[Validators.required]],
          seasons: ["",[Validators.required]],
          organizerClassifications: ["",[Validators.required]],
          organizerClassificationsValue: ["",[Validators.required]]
        })
      }
   });
  }
  saveVal(){
    // //console.log(this.comForm.value);
     if (this.comForm.valid) {
    var orid=localStorage.getItem('orgid');
    this.comForm.value.organizer=orid;
      if (this._id) {
        this.http.put(environment.api+'/orgCompetitions/'+this._id,this.comForm.value)
                 .subscribe((res)=>{
                    var fagdf = res.json();
                    if(res){
                      this.toastr.success('Competitions updated successfully', 'Success');
                      this.router.navigate(['/competitions']);
                    }
                    else {
                        this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
                    }
                  },(error)=>{
                  this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                });
      } 
      else {
        this.http.post(environment.api+'/orgCompetitions',this.comForm.value)
                .subscribe((res)=>{
                  var fagdf = res.json();
                  if(res){
                    this.toastr.success('Competitions saved successfully', 'Success');
                    this.router.navigate(['/competitions']);
                  }
                  else {
                      this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
                  }
                },(error)=>{
                this.toastr.error('Error!! Something went wrong! try again later', 'Error');
              });  
      }
     } else {
          this.toastr.warning('Please fill up the required fields!', 'Warning');
     }
  }
  getClasValue(e:any){
    console.log(e);
    this.classValue = this.classifications.filter(ad => ad._id == this.comForm.value.organizerClassifications);
    console.log(this.classValue);
  }
}
