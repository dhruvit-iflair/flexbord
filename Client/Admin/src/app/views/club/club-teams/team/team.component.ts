import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fakedb } from "../../../../components/common/fakedb";
import { Http } from "@angular/http";
import { CommonModule } from "@angular/common";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-team',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public _id: any = '';
  public sportsdata: Array<any>;
  public url: any;
  public logo: any;
  public teamForm: FormGroup;
  public paramdetails = false;
  public userId; imgdt;
  public tabz : any;
  public click = true;
  public picEnv = environment.picpoint + 'clubteamlogos/' ;
  public avail = { pchecker: false, daychecker: [], fromtimer: [], totimer: [] };
  public finalavailability = { availability: [] };
  public dayvalues = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  constructor(public fb: FormBuilder, private http: Http, private toastr: ToastrService, private router: Router, public activeRouter: ActivatedRoute) {
    this.teamForm = this.fb.group({
      name: ["", [Validators.required]],
      logo: [""],
      address: ["", [Validators.required]],
      building: [""],
      street: [""],
      city: [""],
      state: [""],
      country: [""],
      zipcode: [""],
      sport: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.sportsdata = fakedb.sport;
    this.activeRouter.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/clubteams/' + this.userId)
          .subscribe(res => {
            var datapatcher = res.json();
            localStorage.setItem('4tPatcher',datapatcher[0].sport);
            this.teamForm.controls['name'].setValue(datapatcher[0].name);
            this.teamForm.controls['sport'].setValue(datapatcher[0].sport);
            this.teamForm.controls['address'].setValue(datapatcher[0].address);
            this.teamForm.controls['building'].setValue(datapatcher[0].building);
            this.teamForm.controls['street'].setValue(datapatcher[0].street);
            this.teamForm.controls['city'].setValue(datapatcher[0].city);
            this.teamForm.controls['state'].setValue(datapatcher[0].state);
            this.teamForm.controls['country'].setValue(datapatcher[0].country);
            this.teamForm.controls['zipcode'].setValue(datapatcher[0].zipcode);
            this.logo =  datapatcher[0].logo;
            this.teamForm.value.logo = datapatcher[0].logo;
            this.imgdt = datapatcher[0].logo;

            for (var j = 0; j < datapatcher[0].availability.length; j++) {
              this.avail.daychecker[datapatcher[0].availability[j].day] = true;

              //janu coding chalu

              var patcher = datapatcher[0].availability[j].fromtimer;
              var patcher1 = datapatcher[0].availability[j].totimer;
              var hs = new Date(patcher).getHours();
              var ms = new Date(patcher).getMinutes();

              var he = new Date(patcher1).getHours();
              var me = new Date(patcher1).getMinutes();
              var s = new Date(patcher);
              s.setHours(hs);
              s.setMinutes(ms);
              var e = new Date(patcher1);
              e.setHours(he);
              e.setMinutes(me);

              this.avail.fromtimer[datapatcher[0].availability[j].day] = s;
              this.avail.totimer[datapatcher[0].availability[j].day] = e;

              //janu coding puru

              // this.avail.fromtimer[datapatcher[0].availability[j].day] = datapatcher[0].availability[j].fromtimer;
              // this.avail.totimer[datapatcher[0].availability[j].day] = datapatcher[0].availability[j].totimer;
            }
          });
      }
    });
  }

  getmodeldata(avail) {
    for (var z = 0; z < this.avail.daychecker.length; z++) {
      if (this.avail.daychecker[z] == true) {
        var patcher = this.avail.fromtimer[z];
        var patcher1 = this.avail.totimer[z];
        var hs = new Date(patcher).getHours();
        var ms = new Date(patcher).getMinutes();

        var he = new Date(patcher1).getHours();
        var me = new Date(patcher1).getMinutes();
        var s = new Date(patcher);
        s.setHours(hs);
        s.setMinutes(ms);
        var e = new Date(patcher1);
        e.setHours(he);
        e.setMinutes(me);
        this.finalavailability.availability.push({ "day": z, "fromtimer": s, "totimer": e });
      }
    }
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type == 'image/jpeg' || file.type == 'image/png' && file.size < 2000000) {
        let up = new FormData();
        up.append('logo', file);
        this.http.post(environment.api + "/clubteams/logo", up)
          .subscribe((res) => {
            if (res) {
              var log = res.json();
              this.teamForm.patchValue({ logo: log });
              this.imgdt = log;
            }
            else {
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
            }
          })
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
      else {
        if (file.size > 2000000) {
          this.toastr.warning('Image should be less than 2 Mb!! ', 'Warning');

        } else {
          this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');
        }
      }
    }
  }
  allavail() {
    if (this.avail.pchecker == true) {
      for (var y = 0; y < this.dayvalues.length; y++) {
        this.avail.daychecker[y] = false;
      }
      this.avail.pchecker = false;
    }
    else {
      for (var y = 0; y < this.dayvalues.length; y++) {
        this.avail.daychecker[y] = true;
      }
      this.avail.pchecker = true;
    }
  }
  addteam() {
    if(this.click){
      this.click = false;
      var clubid = localStorage.getItem('clubid');
      if (this.paramdetails) {
        this.teamForm.value.logo = this.imgdt;
        var janudata2 = {
          address: this.teamForm.value.address,
          building: this.teamForm.value.building,
          city: this.teamForm.value.city,
          country: this.teamForm.value.country,
          logo: this.teamForm.value.logo,
          name: this.teamForm.value.name,
          sport: this.teamForm.value.sport,
          state: this.teamForm.value.state,
          street: this.teamForm.value.street,
          zipcode: this.teamForm.value.zipcode,
          club: clubid,
          availability: this.finalavailability.availability
        };
        this.http.patch(environment.api + "/clubteams/" + this.userId, janudata2)
          .subscribe((res) => {
            var d = res.json();
            if (d.ok == 1) {
              this.toastr.success('Team Updated Successfully', 'Success');
              this.router.navigate(['/club/clubteam']);
            }
            this.click = true;      
          }, (error) => {
            this.click = true;                  
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
          })
      }
      else {
        var janudata = {
          address: this.teamForm.value.address,
          building: this.teamForm.value.building,
          city: this.teamForm.value.city,
          country: this.teamForm.value.country,
          logo: this.teamForm.value.logo,
          name: this.teamForm.value.name,
          sport: this.teamForm.value.sport,
          state: this.teamForm.value.state,
          street: this.teamForm.value.street,
          zipcode: this.teamForm.value.zipcode,
          club: clubid,
          availability: this.finalavailability.availability
        };
        this.http.post(environment.api + "/clubteams", janudata)
          .subscribe((res) => {
            var d = res.json();
            if (d._id) {
              this.toastr.success('Team added successfully', 'Success');
              this.router.navigate(['/club/clubteam']);
              this.click = true;                    
            }
          }, (error) => {
            this.click = true;                  
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
          })
      }
    }
  }
  setAdd(e) {
    this.teamForm.patchValue({ address: e.formatted_address });
    e.address_components.forEach((add) => {
      if (add.types[0] == "postal_code") {
        this.teamForm.patchValue({ zipcode: add.long_name });
      }
      if (add.types[0] == "country") {
        this.teamForm.patchValue({ country: add.long_name });
      }
      if (add.types[0] == "administrative_area_level_1") {
        this.teamForm.patchValue({ state: add.long_name });
      }
      if (add.types[0] == "administrative_area_level_2") {
        this.teamForm.patchValue({ city: add.long_name });
      }
      if (add.types[0] == "route") {
        this.teamForm.patchValue({ street: add.long_name });
      }
      else {
        var u = e.formatted_address.split(',');
        var b = u[0] + ', ' + u[1];
        this.teamForm.patchValue({ building: b });
      }
    });
  }
}
