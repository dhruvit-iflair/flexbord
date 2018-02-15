import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Location } from "@angular/common";
@Component({
  selector: 'app-import-org-members',
  templateUrl: './import-org-members.component.html',
  styleUrls: ['./import-org-members.component.css']
})
export class ImportOrgMembersComponent implements OnInit {
  public fData: FormData = new FormData;
  public fileName : any; 
  public approved : Boolean = false;
  public downloadLink : any;
  
  constructor(public http:Http,public tost:ToastrService,public loc : Location) { }

  ngOnInit() {
    var self = this;
    this.downloadLink = environment.api + '/csv/organizer/members';
    document.getElementById("uploadBtn").onchange = function () {
       if ((<HTMLInputElement>document.getElementById("uploadBtn")).files.item(0).type == "text/csv") {
          (<HTMLInputElement> document.getElementById("uploadFile")).value = (<HTMLInputElement>document.getElementById("uploadBtn")).files.item(0).name;
          self.fileName = (<HTMLInputElement>document.getElementById("uploadBtn")).files.item(0).name;
          self.mauka();
       } else {
          self.tost.error("Only CSV file is need to be uploaded","Error");
          self.approved = false;
       }
    };
  }
  upload(event: any) {
      let files = event.target.files;
      // console.log(files);
      if (files[0].type == "text/csv") {
        this.fData.append("csv", files[0]);
        this.fData.append("organizer", localStorage.getItem('orgid'));  
        this.approved = true;
      } else {
        this.tost.error("Only CSV file is need to be uploaded","Error");
        this.approved = false;
      }      
  }
  send(){
    if (this.approved) {
      this.http.post(environment.api + '/csv/organizer/members',this.fData).subscribe((res)=>{
          if (res.status == 200) {
            this.tost.success("Successfully Imported Data!", "Success");
            this.loc.back();
          } else {
          this.tost.error("Error in Importing data!", "Error");                 
          }
        })
    } else {
      this.tost.error("Only CSV file is need to be uploaded","Error");
      this.approved = false;
    }    
  }
  getFile(){
    this.http.get(this.downloadLink).subscribe((res)=>{
      this.downloadFile(res['_body']);
      console.log(res);
    })
  }
  mauka(){
    this.fileName = this.fileName;
  }
  downloadFile(data){
    var blob = new Blob([data], { type: 'text/csv' });
    // var url= window.URL.createObjectURL(blob);
    // window.open(url);
    var link=document.createElement('a');
    link.href=window.URL.createObjectURL(blob);
    link.download="Sample.csv";
    link.click();
  }
}
