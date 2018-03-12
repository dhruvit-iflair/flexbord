import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  public membersList:Array<any> = [];
  public staffsList:Array<any> = [];
  public staffForm: any;
  public editedData: any;
  public picEnv = environment.picpoint+"orglogos/";
  editting: boolean = false;
  public dataRenderer: boolean = true;
  id: any = '';

  members : FormControl;
  role: FormControl;

  constructor(public fb: FormBuilder, private http: Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute) { 
    this.staffForm = this.fb.group({
      members: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.staffList()
    this.memberList()
  }

  addStaff() {
    if(this.staffForm.invalid) {
      alert('All fields are required')
    } else {
      this.http.post(environment.api + '/staff', this.staffForm.value)
        .subscribe(res => {
            this.staffForm.reset();
            this.staffList()
            this.memberList()
        })
    }
  }

  memberList() {
    this.http.get(environment.api + '/clubmembers')  
    .subscribe((res) => {
        this.membersList = res.json();
        this.http.get(environment.api + '/staff')
          .subscribe(data => {
            data.json().forEach(element => {
              var index = this.membersList.findIndex(x => x._id == element.members._id);
              if(index != -1) {
                this.membersList.splice(index, 1)
                if(this.id != '') {
                  if(this.membersList.findIndex(x => x._id == this.editedData.members._id) == -1) {
                    this.membersList.push(this.editedData.members);
                  }
                }
              } else {
                this.membersList = res.json() 
              }
            });
          })
      })
  }

  staffList() {
    this.dataRenderer = false;
    this.http.get(environment.api + '/staff')
      .subscribe(res => {
        this.staffsList = res.json();
        this.dataRenderer = true;
      })
  }

  delete(id) {
    const ask = confirm('Are you sure to delete?')
    if(ask) {
      this.http.delete(environment.api + '/staff/' + id)
        .subscribe(res => {
          this.staffList()
          this.staffForm.reset();
          this.editting = false
          alert(res.json())
          this.memberList()
        })
    }
  }

  edit(id) {
    this.http.get(environment.api + '/staff/' + id)
      .subscribe(res => {
        this.id = id
        this.editting = true;
        this.editedData = res.json()
        setTimeout(() => {
          this.staffForm.patchValue({
            members: res.json().members._id,
            role: res.json().role
          })
        }, 100)
        this.memberList()
      })
  }

  updateStaff() {
    if(this.staffForm.invalid) {
      alert('All fields are necessary')
    } else {
      this.http.put(environment.api + '/staff/' + this.id, this.staffForm.value)
        .subscribe(res => {
          this.staffForm.reset();
          this.memberList()
          this.staffList();
          this.editting = false
      })
    }
    this.id = '';
  }

  cancelPlayer() {
    this.editting = false;
    this.id = '';
    this.memberList()
    this.staffForm.reset()
  }
}
