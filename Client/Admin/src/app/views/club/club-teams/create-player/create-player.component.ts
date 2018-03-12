import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  submitted = false;
  public membersList:Array<any> = [];
  public playerForm: any;
  public editedData: any;
  public playersList:Array<any> = [];
  public picEnv = environment.picpoint+"orglogos/";
  editting: boolean = false;
  public renderer: boolean = true;
  id: any = '';

  shirt_number: FormControl;
  members : FormControl;
  captain: FormControl;

  constructor(public fb: FormBuilder, private http: Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute) { 
    this.playerForm = this.fb.group({
      members: ['', [Validators.required]],
      shirt_number: ['', [Validators.required]],
      captain: ['']
    })
  }

  ngOnInit() {
    this.playerList()
    this.memberList()
  }

  addPlayer() {
    if(this.playerForm.invalid) {
      alert('All fields are required')
    } else {
      if(this.playerForm.value.captain == null) {
        const data = {
          members : this.playerForm.value.members,
          shirt_number: this.playerForm.value.shirt_number,
          captain: false
        }
        if(this.playerForm.value.shirt_number < 0) {
          alert('Shirt Number should not be negative')
        } else {
          this.http.post(environment.api + '/player', data)
          .subscribe(res => {
              this.playerForm.reset();  
              this.memberList()
              this.playerList()
          })
        }
      } else {
        if(this.playerForm.value.shirt_number < 0) {
          alert('Shirt Number should not be negative')
        } else {
          this.http.post(environment.api + '/player', this.playerForm.value)
            .subscribe(res => {
              this.playerForm.reset();
              this.memberList()
              this.playerList()
          })
        }
      }
      
    }
  }

  memberList() {
    this.http.get(environment.api + '/clubmembers')  
      .subscribe((res) => {
        this.membersList = res.json()
        this.http.get(environment.api + '/player')
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

  playerList() {
    this.renderer = false
    this.http.get(environment.api + '/player')
      .subscribe(res => {
        this.playersList = res.json();
        this.renderer = true
      })
  }

  delete(id) {
    const ask = confirm('Are you sure to delete?')
    if(ask) {
      this.http.delete(environment.api + '/player/' + id)
      .subscribe(res => {
        this.playerList();
        this.playerForm.reset();
        this.editting = false
        alert(res.json())
        this.memberList()
      })
    }
  }

  edit(id) {
    this.http.get(environment.api + '/player/' + id)
      .subscribe(res => {
        this.id = id
        this.editting = true;
        this.editedData = res.json()
        setTimeout(() => {
          this.playerForm.patchValue({
            members: res.json().members._id,
            shirt_number: res.json().shirt_number,
            captain: res.json().captain
          })
        }, 100)
        this.memberList()
      })
  }

  updatePlayer() {
    if(this.playerForm.invalid) {
      alert('All fields are necessary')
    } else {
      if(this.playerForm.value.captain == null) {
        const data = {
          members : this.playerForm.value.members,
          shirt_number: this.playerForm.value.shirt_number,
          captain: false
        }
        this.http.put(environment.api + '/player/' + this.id, data)
        .subscribe(res => {
            this.playerForm.reset();
            this.memberList()
            this.playerList();
            this.editting = false
        })
      } else {
        this.http.put(environment.api + '/player/' + this.id, this.playerForm.value)
          .subscribe(res => {
            this.playerForm.reset();
            this.memberList()
            this.playerList();
            this.editting = false
        })
      }
      this.id = '';
    }
  }

  cancelPlayer() {
    this.editting = false;
    this.id = '';
    this.memberList()
    this.playerForm.reset()
  }
}
