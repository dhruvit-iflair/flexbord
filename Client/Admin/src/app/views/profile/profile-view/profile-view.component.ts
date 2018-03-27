import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../../components/services/users";
import { PasswordValidation } from "../../../components/custom/passwordValidation";
import { matchOtherValidator } from "../../../components/custom/matchOtherControl";
import { window } from 'rxjs/operators/window';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public person_photo: String;
  public user;
  public userForm: any;
  public passwords: any;
  public fileSupport: Boolean = false;
  public fileSizeMin: Boolean = false;
  public fileSizeMax: Boolean = false;
  public logoUploading: any = false;
  constructor(public fb: FormBuilder, private toastr: ToastrService, private router: Router, public userService: UserService) {
    var tokendetails = JSON.parse(localStorage.getItem('uToken'));
    this.userService.getUsersById(tokendetails.user._id).subscribe(resp => {
      this.user = resp[0];
      if (this.user.person_photo) {
        this.person_photo = environment.picpoint + this.user.person_photo;
      }
      else {
        this.person_photo = "assets/img/noImage.jpeg";
      }
      this.userForm = this.fb.group({
        firstname: [this.user.firstname, [Validators.required]],
        lastname: [this.user.lastname, [Validators.required]],
        email: [{ value: this.user.email, disabled: true }, [Validators.required]],
        username: [this.user.username, [Validators.required]],
        password: [''],
        confirmPassword: ['', [matchOtherValidator('password')]],
        person_photo: [this.user.person_photo, [Validators.required]],
      });
    });
  }

  ngOnInit() {

  }
  updateUser() {
    this.userService.updateUsersDetails(this.userForm.value, this.user._id).subscribe((res) => {
      if (res._id) {
        this.toastr.success('Successfully Update your profile.', 'Success');
        // if (this.userForm.value.password !== '') {
        //   localStorage.clear();
        //   this.router.navigate(['/login']);
        // }
        // else {
          // this.user.user.firstname = this.userForm.value.firstname;
          // this.user.user.lastname = this.userForm.value.lastname;
          // this.user.user.person_photo = this.userForm.value.person_photo;
          // this.user.user._id = res._id;
          this.user.user=res;
          localStorage.removeItem('uToken');
          localStorage.setItem('uToken', JSON.stringify(this.user));
           setTimeout(() => {
             location.reload();
             //location.href = '/';
           }, 1000)
       // }
      } else {
        this.toastr.success('Error in updating your profile.Please Login again', 'Error');
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }
  readUrl(event: any) {
    this.logoUploading = true;
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.fileSupport = false; this.fileSizeMin = false; this.fileSizeMax = false;
      if (file.type == 'image/jpeg' && file.size <= 102400 && file.size > 50000 || file.type == 'image/png' && file.size <= 102400 && file.size > 50000) {
        this.fileSupport = false; this.fileSizeMin = false; this.fileSizeMax = false;
        let up = new FormData();
        up.append('person_photo', file);
        this.userService.usersPhoto(up).subscribe((res) => {
          this.logoUploading = false;
          this.userForm.patchValue({ person_photo: res });
          var reader = new FileReader();
          reader.onload = (event: any) => { this.person_photo = event.target.result };
          reader.readAsDataURL(event.target.files[0]);
        }, (error) => {
          this.logoUploading = false;
          this.toastr.error('Something went wrong please try again ', 'Error');
        });
      }
      else {
        this.logoUploading = false;
        if (file.type == 'image/jpeg' && file.size > 102400 || file.type == 'image/png' && file.size > 102400) {
          this.fileSizeMax = true;
          this.toastr.warning('Image should not be more than 100 Kb!! ', 'Warning');
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
}
