import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from "@angular/forms";
import { EmailService } from "../../../components/services/email.service";
import { ToastrService } from 'ngx-toastr';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { EmailTypeService } from '../../../components/services/email-type.service';

@Component({
  selector: 'app-manage-email',
  templateUrl: './manage-email.component.html',
  styleUrls: ['./manage-email.component.css']
})
export class ManageEmailComponent implements OnInit {
  public emailForm : any;
  private emailType : Array<any>;
  private sub : any;
  private id : any;
  public title:any;
  constructor(private fb : FormBuilder,private emailService:EmailService,public tost:ToastrService,private location:Location,private active:ActivatedRoute,private emailTypeService:EmailTypeService) {
    this.emailForm= this.fb.group({
        title:['',[Validators.required]],    
        subject:['',[Validators.required]],
        from:['',[Validators.required]],
        cc:['',[Validators.required]],
        // emailType:['',[Validators.required]],
        content:['',[Validators.required]]
      })
  }

  ngOnInit() {
    this.getType();
    this.sub = this.active.params.subscribe(params => {
      if (params._id) {
        this.id = params._id;
        this.emailService.getEmailById(params._id).subscribe((res)=>{this.emailForm.patchValue(res[0])});
      }
    })
  }
  getType(){
    this.title = "";
    // this.emailTypeService.getEmailType().subscribe(res=>this.emailType = res);
  }
  saveEmail(){
    if (this.emailForm.valid) {
      if (this.id ) {
        this.emailService.updateEmail(this.emailForm.value,this.id).subscribe((res)=>{ 
          if (res) {
            this.tost.success('Successfully Updated Email','Success');
            this.location.back();
          } else {
            this.tost.error('Error in updating Email','Error');
          }
        });  
      } else {
        this.emailService.addEmail(this.emailForm.value).subscribe((res)=>{ 
          if (res) {
            this.tost.success('Successfully added Email','Success');
            this.location.back();
          } else {
            this.tost.error('Error in adding Email','Error');
          }
        });        
      }
    } else {
      this.tost.warning('Please fillup all required fields','Warning');
    }
  }
  deleType(id){
    var u = confirm("Confirm to delete this type!");
    if (u) {
      this.emailTypeService.delEmailType(id).subscribe((res)=>{
        if (res) {
          this.tost.success('Successfully deleted Email type','Success');
          this.getType();        
        } else {
          this.tost.error('Error in deleting Email type','Error');
          this.getType();        
        }
      }); 
    }
  }

  addType(){
    this.emailTypeService.addEmailType({title:this.title}).subscribe((res)=>{
      if (res) {
        this.tost.success('Successfully added Email type','Success');
        this.getType();        
      } else {
        this.tost.error('Error in adding Email type','Error');
        this.getType();        
      }
    });
  }
}
