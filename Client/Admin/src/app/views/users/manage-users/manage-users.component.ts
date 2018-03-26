import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router ,ActivatedRoute} from "@angular/router";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { PasswordValidation } from "../../../components/custom/passwordValidation";
import { UserService } from "../../../components/services/users";
import { IMultiSelectOption ,IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import { environment } from "../../../../environments/environment";
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  public roles:Array<any>;
  public sub: any;
  public person_photo: any;

  public _id: any;
  public userForm : FormGroup;
  public memberSince :any = Date.now();
  public rolesOptions: IMultiSelectOption[];
  public  mySettings: IMultiSelectSettings = { displayAllSelectedText: true};

  public fileSupport:Boolean = false;
  public fileSizeMin:Boolean = false;
  public fileSizeMax:Boolean = false;

  constructor(public fb: FormBuilder,private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute, public userService:UserService) {
    this.userService.getRoles().subscribe((res)=>{
        this.roles = res;
        var t = [];
        this.roles.forEach((role)=> {t.push({id:role._id,name:role.title})})
        this.rolesOptions = t;
    })
    this.sub = this.activeRouter.params.subscribe(params => {
      if (params._id) {
        this._id = params._id;
        this.userForm = this.fb.group({
              firstname: [""],    
              email:[{ value: null,disabled: true},[Validators.required,Validators.email]],
              lastname: [""],
              roles:[[]],
              person_photo:[""],
        })
        setTimeout(() => {
          this.userService.getUsersById(params._id).subscribe((res)=>{
              this.userForm.patchValue(res[0]);
              this.person_photo = environment.picpoint + res[0].person_photo;
              this.userForm.patchValue({email:res[0].username});
          })
        }, 10);  

      }
      else{
        this.userForm = this.fb.group({
          firstname: [""],    
          lastname: [""],
          username:["",[Validators.required,Validators.email]],
          password:[""],
          email:["",[Validators.required,Validators.email]],
          roles:[[]],
          person_photo:[""],
          confirmPassword:["",]
         }, {
          validator: PasswordValidation.MatchPassword 
        })
      }
   });
    
    
   }
  ngOnInit() {
    
   this.userForm.controls['email'].valueChanges.subscribe((data) => { this.userForm.patchValue({username : data}); });
  }
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.fileSupport = false;this.fileSizeMin = false; this.fileSizeMax = false; 
      if (file.type == 'image/jpeg' && file.size < 100000 && file.size > 50000 || file.type == 'image/png' && file.size < 100000 && file.size > 50000 ) {
      this.fileSupport = false;this.fileSizeMin = false; this.fileSizeMax = false; 
        let up = new FormData();
        up.append('person_photo', file);
        this.userService.usersPhoto(up).subscribe((res)=>{ this.userForm.patchValue({person_photo :res}); });
        var reader = new FileReader();
        reader.onload = (event:any) => { this.person_photo = event.target.result };
        reader.readAsDataURL(event.target.files[0]);
      } 
      else {
        if (file.type == 'image/jpeg' &&  file.size > 100000 || file.type == 'image/png'   &&  file.size > 100000) {
          this.fileSizeMax = true; 
          this.toastr.warning('Image should be less than 100 Kb!! ', 'Warning');                        
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
  addUser(){
    if (this.userForm.valid) {
      if (this._id) {
          this.userService.updateUsers(this.userForm.value,this._id).subscribe((res)=>{ 
              if (res) { this.router.navigate(['/users']); this.toastr.success('Successsfully updated User','Success'); }
          })
      } 
      else {
          this.userService.addUsers(this.userForm.value).subscribe((res)=>{ 
              if (res) {
                if (res) { 
                  var m = res;
                  if (m == "A user with the given username is already registered") {
                    this.toastr.error('User with this email already exist','Error');                    
                  } else {
                      this.router.navigate(['/users']); 
                      this.toastr.success('Successsfully updated User','Success');  
                  }
                }
              }
          })      
      }
    } else {
      this.toastr.error('Please fill up the required field','Error');
    }
  }
}
