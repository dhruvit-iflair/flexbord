import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class GamesettingsService {
    public scoreBordList = new Subject <any>();
  public singleScoreBordData = new Subject <any>();

  constructor(public http: Http, private activatedrouter: ActivatedRoute, private toastr: ToastrService) { }
  editconsequences(id){
    return this.http.get(environment.api + '/consequences/' + id);
  }
  editstructure(id){
     return this.http.get(environment.api + '/structures/' + id);
  }
  editplaylist(id){
     return this.http.get(environment.api + '/playlists/' + id);
  }
  editsboard(id){
    return this.http.get(environment.api + '/scoreboards/' + id);
  }


    getAllScoreBordsByGameSetting(id){
    this.http.get(environment.api + "/scoreboards/bysetting/"  + id).subscribe(res => {
        this.scoreBordList.next(res);
    });
  }
  getScoreBordList(): Observable<any> {
    return this.scoreBordList.asObservable();
  }  
  getSingleScoreBord(id:any){
    this.http.get(environment.api + '/scoreboards/' +id).subscribe(res => {
        this.singleScoreBordData.next(res);
    });
  }
  getSingleScoreBordData(): Observable<any> {
    return this.singleScoreBordData.asObservable();
  }  
  addScoreBord(data:any){
    this.http.post(environment.api + '/scoreboards',data).subscribe(dt => {
      this.toastr.success('ScoreBoard Added Successfully.', 'Success.');
      //this.getAllScoreBordsByGameSetting();
    });
  }
  updateScoreBord(id:any,data:any){
    this.http.patch(environment.api + '/scoreboards/' +id, data).subscribe(result => {
      this.toastr.success('ScoreBoard Updated Successfully.', 'Success.');
      //this.getAllScoreBordsByGameSetting();
    });
  }
  deleteScoreBord(id:any){
    this.http.delete(environment.api + "/scoreboards/" + id).subscribe((res) => {
      this.toastr.success('ScoreBoard Deleted Successfully', 'Success');
      //this.getAllScoreBordsByGameSetting();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }


}
