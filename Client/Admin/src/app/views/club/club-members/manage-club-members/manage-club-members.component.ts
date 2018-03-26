import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fakedb } from "../../../../components/common/fakedb";
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ClubService } from '../../../../components/services/club.service';
import { Subscription } from 'rxjs/Subscription';
import { AccessorService } from "../../../../components/common/accessor.service";

@Component({
  selector: 'app-manage-club-members',
  templateUrl: './manage-club-members.component.html',
  styleUrls: ['./manage-club-members.component.css']
})
export class ManageClubMembersComponent implements OnInit {
  public orgdata: any;
  public sub: any;
  public photo: any;
  public _id: any;
  public clubMemForm: FormGroup;
  public memberSince: any = Date.now();
  public maxDate = new Date();
  public bsConfig: Partial<BsDatepickerConfig>;
  public fileSupport: Boolean = false;
  public fileSizeMin: Boolean = false;
  public fileSizeMax: Boolean = false;
  public click: Boolean = true;
  public isPhoto: Boolean = false;
  public subscription: Subscription;
  public hasCreatePerm;
  public logoUploading: Boolean = false

  constructor(public fb: FormBuilder,
    private http: Http,
    private toastr: ToastrService,
    private router: Router,
    private accr: AccessorService,
    public activeRouter: ActivatedRoute,
    public clubService: ClubService) {
    this.bsConfig = {
      containerClass: 'theme-orange',
      dateInputFormat: 'DD/MM/YY',
      showWeekNumbers: false
    };
    this.clubMemForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      gender: [""],
      license: [""],
      dob: ["", [Validators.required]],
      photo: [""],
      memberSince: [this.memberSince],
      address: [""],
      // building:  ["",[Validators.required]],
      street: [""],
      country: ["", [Validators.required]],
      state: [""],
      city: ["", [Validators.required]],
      zipcode: [""],
      email: [""],
      phonenumber: [""],
      usertype: ["admin"],
      status: ["Pending"],
      club: [localStorage.getItem('clubid'), [Validators.required]]
    })
  }
  dateLessThan(memberSince: string, dob: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[memberSince];
      let t = group.controls[dob];
      if (t.value > f.value) {
        return {
          dates: "Member Since Date should be Greater than DOB Date"
        };
      }
      return {};
    }
  }
  ngOnInit() {
    this.subscription = this.clubService.getSingleMemberData().subscribe((res) => {
      var fagdf = res;
      this.clubMemForm.patchValue(fagdf[0]);
      this.clubMemForm.patchValue({ dob: new Date(fagdf[0].dob) });
      this.memberSince = fagdf[0].memberSince;
      var src = environment.picpoint + 'clubMembersPhoto/' + fagdf[0].photo;
      this.photo = src;
      if (fagdf[0].photo) {
        this.isPhoto = true;
      }
      else {
        this.isPhoto = false;
      }
      this._id = fagdf[0]._id;
    });
    this.checkpermissions();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  readUrl(event: any) {
    this.logoUploading = true;
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.fileSupport = false; this.fileSizeMin = false; this.fileSizeMax = false;
      if (file.type == 'image/jpeg' && file.size < 100000 && file.size > 50000 || file.type == 'image/png' && file.size < 100000 && file.size > 50000) {
        this.fileSupport = false; this.fileSizeMin = false; this.fileSizeMax = false;
        let up = new FormData();
        up.append('photo', file);
        this.http.post(environment.api + "/clubmembers/photo", up)
          .subscribe((res) => {
            this.logoUploading = false;
            if (res) {
              var log = res.json();
              this.clubMemForm.patchValue({ photo: log });
            }
            else {
              this.toastr.error('Error!! Something went wrong! try to upload image again', 'Error');
            }

            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.photo = event.target.result;
              this.isPhoto = true;
            }
            reader.readAsDataURL(event.target.files[0]);
          })
      }
      else {
        this.isPhoto = false;
        this.logoUploading = false;
        if (file.type == 'image/jpeg' && file.size > 100000 || file.type == 'image/png' && file.size > 100000) {
          this.fileSizeMax = true;
          this.toastr.warning('Image should not be more than 100 Kb!! ', 'Warning');
        }
        else if (file.type == 'image/jpeg' && file.size < 50000 || file.type == 'image/png' && file.size < 50000) {
          this.toastr.warning('Image should be more than 50Kb!! ', 'Warning');
          this.fileSizeMin = true;
        }
        else {
          this.fileSupport = true;
          this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');
        }
      }
    }
  }
  reset() {
    this._id = false;
    this.clubMemForm.reset();
    setTimeout(() => {
      this.click = true;
    }, 150);
  }
  addClubMem() {
    if (this.click) {
      this.click = false;
      if (this._id) {
        this.clubService.updateMember(this._id, this.clubMemForm.value);
        this.reset();
      }
      else {
        this.clubService.saveMember(this.clubMemForm.value);
        this.reset();
      }
    }
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "clubmembers1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
    }
  }
  setAdd(e) {
    this.clubMemForm.patchValue({ address: e.formatted_address });
    this.clubMemForm.patchValue({ phonenumber: e.formatted_phone_number });
    this.clubMemForm.patchValue({ website: e.website });
    var address = { zipcode: '', country: '', state: '', city: '', street: '', building: '' }
    for (var i = 0; i < e.address_components.length; i++) {
      var add = e.address_components[i].types[0];
      if (add == "postal_code") {
        address.zipcode = e.address_components[i].long_name;
      }
      else if (add == "country") {
        address.country = e.address_components[i].long_name;
      }
      else if (add == "administrative_area_level_1") {
        address.state = e.address_components[i].long_name;
      }
      else if (add == "administrative_area_level_2") {
        address.city = e.address_components[i].long_name;
      }
      else if (add == "route") {
        address.street = e.address_components[i].long_name;
      }
      else {
        var st = e.formatted_address.split(',');
        if (st[0] && st[1] != undefined) {
          address.building = st[0] + ", " + st[1];
        } else {
          address.building = st[0];

        }
      }
      if (i == e.address_components.length - 1) {
        this.clubMemForm.patchValue(address);
      }
    }
    // this.clubMemForm.value.address = e.formatted_address;
    // this.clubMemForm.value.phonenumber = e.formatted_phone_number;
  }
}
