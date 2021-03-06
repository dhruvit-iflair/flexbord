import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { fakedb } from "../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';
import { UserService } from '../../../components/services/users';
import { OrganizerService } from '../../../components/services/organizer.service';
import { Subscription } from 'rxjs/Subscription';
import { TabsetComponent } from 'ngx-bootstrap';
import { AccessorService } from "../../../components/common/accessor.service";

@Component({
  selector: 'app-manage',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageOrganizerComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  public orgdata: any;
  public items: Array<any>;
  public items2: Array<any>;
  public spots: Array<any> = [];
  public url: any;
  public placePic: any;
  public value: any;
  public value2: Array<string>;
  public sub: any;
  public logo: any;
  public logo2: any;
  public _id: any = '';
  public orgForm: FormGroup;
  public fileSupport: Boolean = false;
  public fileSizeMin: Boolean = false;
  public fileSizeMax: Boolean = false;
  public fileSupport2: Boolean = false;
  public fileSizeMin2: Boolean = false;
  public fileSizeMax2: Boolean = false;
  public role: any;
  public user: any;
  public isCity = false;
  public isCountry = false;
  public subscription: Subscription;
  public tabz: any = 1;
  public logoUploading: Boolean = false
  public photoUploading: Boolean = false
  public address = { address: '', phonenumber: '', website: '', zipcode: '', country: '', state: '', city: '', street: '', building: '' };

  public click: Boolean = true;
  public hasMembersPerm; hasSeasonsPerm; hasClassificationsPerm; hasCompetitionsPerm;
  // public value : any = 9;
  // public value2 : Array<string> =["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"];
  constructor(public fb: FormBuilder, private http: Http, private toastr: ToastrService, private router: Router, public activeRouter: ActivatedRoute, public userSer: UserService, public orgService: OrganizerService, private accr: AccessorService) {
    this.orgForm = this.fb.group({
      name: ["", [Validators.required]],
      subDomain: ["", [Validators.required]],
      abbreviation: ["", [Validators.required]],
      logo: [""],
      address: [""],
      building: [""],
      street: [""],
      city: ["", [Validators.required]],
      state: [""],
      country: ["", [Validators.required]],
      zipcode: [""],
      website: [""],
      email: ["", [Validators.email]],
      password: [""],
      roles: [''],
      // phonenumber: [null,[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
      phonenumber: [null],
      sports: [[]],
      capacity: [1],
      placePic: [null],
      affilated: [""],
      affilation: ["opened"],
      registered: [null]
    })
    this.orgForm.get('capacity').valueChanges.subscribe(val => {
      (val > 0) ? val : val = Math.abs(val);
      return val;
    });
    this.orgForm.get('city').valueChanges.subscribe(val => {
      (val) ? this.isCity = true : this.isCity = false;
    });
    this.orgForm.get('country').valueChanges.subscribe(val => {
      (val) ? this.isCountry = true : this.isCountry = false;
    });
  }

  ngOnInit() {
    this.http.get(environment.api + '/roles').subscribe((res) => {
      var r = [];
      r = res.json();
      this.role = r.filter((t) => t.title == "organizer");
      this.orgForm.patchValue({ roles: this.role[0]._id });
    });
    this.userSer.getUsers().subscribe((user) => { this.user = user; });
    this.orgService.getAllOrganizers();
    this.subscription = this.orgService.getSingleOrganizersList().subscribe((res) => {
      if (res) {
        this.items2 = res;
        this.items = res;
        this.sub = this.activeRouter.params.subscribe(params => {
          if (params._id) {
            this.items = this.items2.filter(af => af._id != params._id);
          }
          else {
            this.items = res;
          }
        });
      }
    });
    this.orgService.getTabActive().subscribe(id => {
      this.tabz = id;
    })
    this.http.get(environment.api + '/sports')
      .subscribe((res) => {
        this.spots = res.json();
      });
    this.sub = this.activeRouter.params.subscribe(params => {
      // //console.log(params._id);
      if (params._id) {
        this._id = params._id;
        this.orgService.collectAlldata(this._id);
        this.http.get(environment.api + '/organizer/' + params._id)
          .subscribe((res) => {
            var fagdf = res.json();
            if (fagdf.length > 0) {
              var comming = res.json();
              this.orgdata = comming[0];
              if (comming[0].logo) {
                this.logo = environment.picpoint + 'orglogos/' + comming[0].logo;
              } else {
                this.logo = "assets/noimage.jpg";
              }
              if (comming[0].city) this.isCity = true;
              if (comming[0].country) this.isCountry = true;
              var yaar = [];
              if (comming[0].placePic) {
                comming[0].placePic.forEach((asd) => {
                  yaar.push(environment.picpoint + 'orgplacepics/' + asd);
                })
              }
              else {
                this.logo2 = ["assets/noimage.jpg"];
              }
              this.logo2 = yaar;
              this.orgForm.patchValue(comming[0]);
              this.address = comming[0];
              this.orgForm.controls['affilated'].setValue(fagdf[0].affilated, { onlySelf: true });
            }
            else {
              this.toastr.error('Error!! No Organizer found!', 'Error');
              this.router.navigate(['/organizer']);
            }
          }, (error) => {
            this.toastr.error('Error!! Something went wrong! try again later', 'Error');
          });
      }
    });
    this.checkpermissions();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // tabchange(id){
  //   this.tabz = id;      
  // }
  readUrl(event: any) {
    this.logoUploading = true;
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.fileSupport = false; this.fileSizeMin = false; this.fileSizeMax = false;
      if (file.type == 'image/jpeg' && file.size <= 307200 && file.size > 50000 || file.type == 'image/png' && file.size <= 307200 && file.size > 50000) {
        this.fileSupport = false; this.fileSizeMin = false; this.fileSizeMax = false;
        let up = new FormData();
        up.append('logo', file);
        this.http.post(environment.api + "/organizer/logo", up)
          .subscribe((res) => {
            if (res) {
              this.logoUploading = false;
              var log = res.json();
              this.orgForm.patchValue({ logo: log });
            }
            else {
              this.logoUploading = false;
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
        this.logoUploading = false;
        if (file.type == 'image/jpeg' && file.size > 307200 || file.type == 'image/png' && file.size > 307200) {
          this.fileSizeMax = true;
          this.toastr.warning('Image should not be more than 300 Kb!! ', 'Warning');
        }
        else if (file.type == 'image/jpeg' && file.size < 50000 || file.type == 'image/png' && file.size < 50000) {
          this.toastr.warning('Image should be more than 50 Kb!! ', 'Warning');
          this.fileSizeMin = true;
        }
        else {
          this.fileSupport = true;
          this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');
        }
      }

    }
  }
  asdl(e) {
    if (e.clientX > 0 && e.clientY > 0) {
      document.getElementById('logo').click();
    }
  }
  setAdd(e) {
    this.isCity = false;
    this.isCountry = false;
    this.address = { address: '', phonenumber: '', website: '', zipcode: '', country: '', state: '', city: '', street: '', building: '' };
    this.address.address = e.formatted_address;
    this.address.phonenumber = e.formatted_phone_number;
    this.address.website = e.website;

    for (var i = 0; i < e.address_components.length; i++) {
      var add = e.address_components[i].types[0];
      if (add == "postal_code") {
        this.address.zipcode = e.address_components[i].long_name;
      }
      else if (add == "country") {
        this.address.country = e.address_components[i].long_name;
        this.isCountry = true;
      }
      else if (add == "administrative_area_level_1") {
        this.address.state = e.address_components[i].long_name;
      }
      else if (add == "administrative_area_level_2") {
        this.address.city = e.address_components[i].long_name;
        this.isCity = true;
      }
      else if (add == "route") {
        this.address.street = e.address_components[i].long_name;
      }
      else {
        var st = e.formatted_address.split(',');
        if (st[0] && st[1] != undefined) {
          this.address.building = st[0] + ", " + st[1];
        } else {
          this.address.building = st[0];

        }
      }
      if (i == e.address_components.length - 1) {
        this.orgForm.patchValue(this.address);
      }
    }
  }
  picPlaceUrl(event: any) {
    this.photoUploading = true;
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.fileSupport2 = false; this.fileSizeMin2 = false; this.fileSizeMax2 = false;
      if (file.type == 'image/jpeg' && file.size <= 102400 && file.size > 50000 || file.type == 'image/png' && file.size <= 102400 && file.size > 50000) {
        this.fileSupport2 = false; this.fileSizeMin2 = false; this.fileSizeMax2 = false;
        let file = event.target.files[0];
        let up = new FormData();
        up.append('placePic', file);
        this.http.post(environment.api + "/organizer/upload", up).subscribe((res) => {
            if (res) {
              var log = res.json();
              this.photoUploading = false;
              this.orgForm.patchValue({ placePic: log });
            }
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.placePic = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        })
      }
      else {
        this.photoUploading = false;
        if (file.type == 'image/jpeg' && file.size > 102400 || file.type == 'image/png' && file.size > 102400) {
          this.fileSizeMax2 = true;
          this.toastr.warning('Image should not be more than 100 Kb!! ', 'Warning');
        }
        else if (file.type == 'image/jpeg' && file.size < 50000 || file.type == 'image/png' && file.size < 50000) {
          this.toastr.warning('Image should be more than 50 Kb!! ', 'Warning');
          this.fileSizeMin2 = true;
        }
        else {
          this.fileSupport2 = true;
          this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');
        }
      }
    }
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerseasons0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasSeasonsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizerclassifications0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasClassificationsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizercompetitions0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCompetitionsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "organizermembers0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasMembersPerm = true;
      }
    }
  }
  addOrg() {
    if (this.click) {
      // this.click = false;
      if (this.orgForm.value.email) {
        var usn = this.items.filter((u) => {
          return u.email == this.orgForm.value.email;
        });
      }
      else {
        var usn = [];
      }
      var sub = this.items.filter((u) => {
        return u.subDomain == this.orgForm.value.subDomain;
      });
      if (!sub.length) {
        if (!usn.length) {
          if (this._id) {
            this.http.put(environment.api + "/organizer/" + this._id, this.orgForm.value).subscribe((res) => {
              this.click = true;
              var d = res.json();
              if (d._id) {
                this.toastr.success('Organizer Updated Successfully', 'Success');
                this.router.navigate(['/organizer']);
              }
            }, (error) => {
              this.click = true
              this.toastr.error('Something went wrong !! Please try again later', 'Error');
            })
          }
          else {
            var h = new Date().getHours();
            var m = new Date().getMinutes();
            var r = new Date();
            r.setHours(h);
            r.setMinutes(m);
            this.orgForm.patchValue({ registered: r });
            this.http.post(environment.api + "/organizer", this.orgForm.value).subscribe((res) => {
              this.click = true;
              var d = res.json();
              if (d._id) {
                this.toastr.success('Organizer Registered Successfully', 'Success');
                this.router.navigate(['/organizer/manage/' + d._id]);
              }
            }, (error) => {
              this.click = true;
              this.toastr.error('Something went wrong !! Please try again later', 'Error');
            })
          }
        }
        else {
          console.log(this.orgForm.value, sub, usn)
          if (usn[0]) {
            this.toastr.error("This Email has already taken", "Error");
          }
        }
      }
      else {
        console.log(this.orgForm.value, sub, usn)
        if (sub[0]) {
          this.toastr.error("This Sub Domain has already taken", "Error");
        }
      }
    }
  }
}
