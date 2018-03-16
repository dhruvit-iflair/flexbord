import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from "@angular/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GameService {
  public gameList = new Subject<any>();
  public singleGameData = new Subject<any>();
  constructor(public http :Http,public toastr:ToastrService) { 
    this.getAllGames();
  }

  // ++++++++++++++++++++ GAME ++++++++++++++++++

  getAllGames(){
    this.http.get(environment.api + "/games").subscribe((res) => {
        this.gameList.next(res);
    });
  }
  getGameData():Observable<any>{
    return this.singleGameData.asObservable();
  }
  getSingleGame(id:any){
    this.http.get(environment.api + "/games/"+id).subscribe((res) => {
        this.singleGameData.next(res.json());
    });
  }
  getGameList():Observable<any>{
    return this.gameList.asObservable();
  }
  deleteGame(id:any){
    this.http.delete(environment.api + "/games/" + id).subscribe((res) => {
        var d = res.json();
        if (d._id) {
            this.toastr.success('Sport Deleted Successfully', 'Success');
            this.getAllGames();
        }
    }, (error) => {
        this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  saveGame(data:any){
    this.http.post(environment.api + '/games', data).subscribe(dt => {
        this.toastr.success('Game Added Successfully', 'Success');
        this.getAllGames();
    });
  }
  updateGame(id:any,data:any){
    this.http.patch(environment.api + '/games/' + id, data).subscribe(result => {
        this.toastr.success('Game Updated Successfully.', 'Success');
        this.getAllGames();
    });
  }
}
