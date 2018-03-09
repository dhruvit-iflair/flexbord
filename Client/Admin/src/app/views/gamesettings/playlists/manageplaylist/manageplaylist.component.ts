import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";
// import { FormGroup,FormControl } from "@angular/forms";

@Component({
  selector: 'app-manageplaylist',
  templateUrl: './manageplaylist.component.html',
  styleUrls: ['./manageplaylist.component.css']
})
export class ManageplaylistComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public settingid; paramdetails; userId; imgurl; mediaUrl;
  public psForm = { name: '', itemMedia: '', itemName: '', itemType: '', itemTime: '' };

  ngOnInit() {

    //this.settingid = localStorage.getItem('setting');
    this.imgurl = environment.picpoint + 'playlists/';
    this.activatedRoute.params.subscribe(params => {
      this.settingid = params._id;
      // if (this.userId) {
      //   this.paramdetails = true;
      //   this.http.get(environment.api + '/playlists/' + this.userId)
      //     .subscribe(res => {
      //       this.psForm = res[0];
      //       if(this.psForm.itemType=="uploadImage"){
      //         this.imgurl += this.psForm.itemMedia;              
      //       }
      //       // if(this.psForm.itemType=="imageUrl" || this.psForm.itemType=="videoUrl" || this.psForm.itemType=="webPage"){
      //       //   this.psForm.itemMedia = this.psForm.itemMedia
      //       // }
      //     });
      // }
    });
  }

  assigndata(xd) {
    this.psForm = xd;
    (document.getElementById("asname") as HTMLInputElement).value = xd.name;

    (document.getElementById("iname") as HTMLInputElement).value = xd.itemName;
    if (xd.itemType == "uploadImage") {
      var imgurl=environment.picpoint + 'playlists/'+ xd.itemMedia;
    }
    if (xd.itemType == "imageUrl" || xd.itemType == "videoUrl" || xd.itemType == "webPage") {
      (document.getElementById("imedia") as HTMLInputElement).value = xd.itemMedia;
    }
    (document.getElementById("itype") as HTMLInputElement).value = xd.itemType;
    (document.getElementById("itime") as HTMLInputElement).value = xd.itemTime;

    localStorage.setItem('editmode', 'true');
    localStorage.setItem('uid', xd._id);
  }

  managesetting(gotdata) {
    var mode = localStorage.getItem('editmode');
    var uid = localStorage.getItem('uid');
    gotdata.gamesettings = this.settingid;
    if (mode) {
      this.http.patch(environment.api + '/playlists/' + uid, gotdata)
        .subscribe(result => {
          localStorage.removeItem('editmode');
          localStorage.removeItem('uid');
          this.toastr.success('Playlists', 'Updated Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
    else {
      this.http.post(environment.api + '/playlists', gotdata)
        .subscribe(dt => {
          this.toastr.success('Playlists', 'Added Successfully.');
          this.router.navigate(['/game_settings']);
        });
    }
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type == 'image/jpeg' || file.type == 'image/png' && file.size < 2000000) {
        let gotdata = new FormData();
        gotdata.append('itemMedia', file);
        this.http.post(environment.api + "/playlists/upload", gotdata)
          .subscribe((res) => {
            if (res) {
              this.psForm.itemMedia = res.toString();
            }
            else {
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
            }
          });
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.psForm.itemMedia = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
      else {
        this.toastr.error('Only .jpg, .png, .jpeg type of Image supported ', 'Error');
      }
    }
  }

  readUrlvdo(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      if (file.type == 'video/mp4' || ext == "avi" || ext == "flv" || ext == "mp4" || file.type == 'video/x-flv' || file.type == 'video/x-msvideo' && file.size < 2000000) {
        let gotdata = new FormData();
        gotdata.append('itemMedia', file);
        this.http.post(environment.api + "/playlists/upload", gotdata)
          .subscribe((res) => {
            if (res) {
              this.psForm.itemMedia = res.toString();
            }
            else {
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
            }
          });
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.psForm.itemMedia = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
      else {
        this.toastr.error('Only .avi, .flv or .mp4 type of videos supported ', 'Error');
      }
    }
  }
}
