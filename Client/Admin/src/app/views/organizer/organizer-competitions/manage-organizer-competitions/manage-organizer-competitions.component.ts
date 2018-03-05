import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';

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
      description: [""],
      sports: [null,[Validators.required]],
      seasons: ["",[Validators.required]],
      organizerClassifications: ["",[Validators.required]],
      organizerClassificationsValue: ["",[Validators.required]]
    })
    this.http.get(environment.api + "/organizer/"+localStorage.getItem('orgid')).subscribe((res) => {
      var r = res.json(); 
      this.sportsValue = r[0].sports;
    })      
  }

  ngOnInit() {    
    this.http.get(environment.api + '/seasons').subscribe((res)=>{
        var fagdf = res.json();
        this.amki = fagdf;
        var t = this.amki.filter((rf)=>rf.organizer==  localStorage.getItem('orgid'));
        if(t.length > 0){
          this.season = t;                  
        }
      },(error)=>{
          this.toastr.error('Error!! Something went wrong! try again later', 'Error');
          this.router.navigate(['/organizer/competitions']);
     });
     this.http.get(environment.api + '/sports')
            .subscribe((res)=>{
              this.sports = res.json();
            });
     this.http.get(environment.api + '/organizerClassifications').subscribe((res)=>{
                var fagdf = res.json();
                var u = [];
                u= fagdf;
                var t = u.filter((rf)=>rf.organizer==  localStorage.getItem('orgid'));
                   
                if(t.length > 0){
                   this.classifications = t;   
                }
                },(error)=>{
                      this.toastr.error('Error!! Something went wrong! try again later', 'Error');
                      this.router.navigate(['/organizer/competitions']);
      });
    
  //   this.sub = this.activeRouter.params.subscribe(params => {
  //     if (params._id) {
  //       this._id = params._id;
  //       this.http.get(environment.api + '/orgCompetitions/'+ params._id)
  //              .subscribe((res)=>{
  //                var fagdf = res.json();
  //                if(fagdf.length > 0){
  //                  this.classValue = this.classifications.filter(ad => ad._id == fagdf[0].organizerClassifications._id); 
  //                  this.comForm.patchValue(fagdf[0]);
  //                  this.comForm.controls['seasons'].setValue(fagdf[0].seasons._id, {onlySelf: true});
  //                  this.comForm.controls['organizerClassifications'].setValue(fagdf[0].organizerClassifications._id, {onlySelf: true});
  //                  this.comForm.controls['organizerClassificationsValue'].setValue(fagdf[0].organizerClassificationsValue, {onlySelf: true});
  //                }
  //               //  else {
  //               //       this.toastr.error('Error!! No Competitions found!', 'Error');
  //               //       this.router.navigate(['/organizer/competitions']);
  //               //   }
  //                },(error)=>{
  //                     this.toastr.error('Error!! Something went wrong! try again later', 'Error');
  //               });
  //     }
  //     else{
  //       this.comForm = this.fb.group({
  //         name: ["",[Validators.required]],
  //         description: [""],
  //         sports: [null,[Validators.required]],
  //         seasons: ["",[Validators.required]],
  //         organizerClassifications: ["",[Validators.required]],
  //         organizerClassificationsValue: ["",[Validators.required]]
  //       })
  //     }
  //  });
  }
  saveVal(){
   if (this.comForm.valid) {
     var orid=localStorage.getItem('orgid');
     this.comForm.value.organizer=orid;
     if (this._id) {
        this.http.put(environment.api+'/orgCompetitions/'+this._id,this.comForm.value)
                 .subscribe((res)=>{
                    var fagdf = res.json();
                    if(res){
                      this.toastr.success('Competitions updated successfully', 'Success');
                      this.router.navigate(['/organizer/competitions']);
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
                    this.router.navigate(['/organizer/competitions']);
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
    this.classValue = this.classifications.filter(ad => ad._id == this.comForm.value.organizerClassifications);
  }
}
