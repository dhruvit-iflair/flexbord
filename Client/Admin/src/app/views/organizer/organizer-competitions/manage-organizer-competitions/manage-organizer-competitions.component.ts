import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { OrganizerService } from '../../../../components/services/organizer.service';
import { Subscription } from 'rxjs/Subscription';
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-manage-organizer-competitions',
  templateUrl: './manage-organizer-competitions.component.html',
  styleUrls: ['./manage-organizer-competitions.component.css']
})
export class ManageOrganizerCompetitionsComponent implements OnInit ,OnDestroy{


  public comForm: FormGroup;
  public sub: any;
  public _id: any;
  public season: any;
  public amki: Array<any>;
  public sports: Array<any>;
  public sportsValue: Array<any>;
  public classifications: Array<any>;
  public classificationValues: Array<any> = [];
  public click: Boolean = true;
  public classValue: Array<any>;
  public subscripton: Subscription;
  public subscripton2: Subscription;
  public subscripton3: Subscription;
    public hasCreatePerm;
  public my_Class :string = "form-control ng-untouched ng-pristine ng-invalid ";

  constructor(public fb: FormBuilder,private accr: AccessorService, private http: Http, private toastr: ToastrService, private router: Router, public activeRouter: ActivatedRoute, public orgService: OrganizerService) {
    this.comForm = this.fb.group({
      name: ["", [Validators.required]],
      description: [""],
      sports: [null, [Validators.required]],
      seasons: ["", [Validators.required]],
      // organizerClassifications: ["",[Validators.required]],
      organizerClassificationsValue: ["", [Validators.required]],
      competition: ["opened"]
    })
    this.http.get(environment.api + "/organizer/" + localStorage.getItem('orgid')).subscribe((res) => {
      var r = res.json();
      this.sportsValue = r[0].sports;
    })
  }

  ngOnInit() {
    this.subscripton = this.orgService.getSeasonList().subscribe((res) => {
      this.amki = res;
      var t = this.amki.filter((rf) => rf.organizer == localStorage.getItem('orgid'));
      if (t.length > 0) {
        this.season = t;
      }
    });
    this.http.get(environment.api + '/sports')
      .subscribe((res) => {
        this.sports = res.json();
      });
    this.subscripton2 = this.orgService.getClassificationList().subscribe((res) => {
      var u = res;
      if (u.length > 0) {
        this.classifications = u;
      }
    });
    this.subscripton3 = this.orgService.getSingleCompetitionData().subscribe(res => {
      this.comForm.patchValue(res[0], { onlySelf: true });
      this.comForm.patchValue({ seasons: res[0].seasons._id }, { onlySelf: true });
      // this.comForm.patchValue({organizerClassifications: res[0].organizerClassifications._id },{onlySelf: true});
      this.classificationValues = res[0].organizerClassificationsValue;
      // this.getClasValue();
      setTimeout(() => {
        this.comForm.patchValue({ organizerClassificationsValue: res[0].organizerClassificationsValue }, { onlySelf: true });
      }, 100);
      this._id = res[0]._id;
    })
     this.checkpermissions();
  }
  ngOnDestroy() {
    this.subscripton.unsubscribe();
    this.subscripton2.unsubscribe();
    this.subscripton3.unsubscribe();
  }
  addSeason() {
    this.orgService.changeTab(3);
  }
  addClass() {
    this.orgService.changeTab(4);
  }
  saveVal() {
    if (this.click) {
      if (this.comForm.valid) {
        this.click = false;
        var orid=localStorage.getItem('orgid');
        this.comForm.value.organizer=orid;
            if (this._id) {
              this.orgService.updateCompetition(this._id,this.comForm.value);
              this.comForm.reset();   
              this._id = false;    
              setTimeout(() => {
                this.click = true;
                this.classificationValues = [];
                this.my_Class = 'form-control ng-untouched ng-pristine ng-invalid';
              }, 100);   
            } 
            else {
              this.orgService.saveCompetition(this.comForm.value);
              this.comForm.reset();
              this._id = false;       
              setTimeout(() => {
                this.click = true;
                this.classificationValues = [];
                this.my_Class = 'form-control ng-untouched ng-pristine ng-invalid';
                
              }, 100);   
            }
        } else {
              this.toastr.warning('Please fill up the required fields!', 'Warning');
      }
    }
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizercompetitions1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
  }
  getClasValue() {
    console.log(this.classificationValues);
    this.comForm.patchValue({ organizerClassificationsValue: this.classificationValues })
    // this.classValue = this.classifications.filter(ad => ad._id == this.comForm.value.organizerClassifications);

  }
}
