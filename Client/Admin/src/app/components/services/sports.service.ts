import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class SportsService {
  public sportsList  = new Subject<any> ();
  
  public pointsList = new Subject<any> ();
  public singlePointData = new Subject<any> ();
  
  public foulsList = new Subject<any> ();
  public singleFoulData = new Subject<any> ();

  public playerStatusList = new Subject<any> ();
  public singlePlayerStatusData = new Subject<any> ();

  public scoresList = new Subject<any> ();
  public singleScoreData = new Subject<any> ();

  public sportsId:any; 
  constructor(public http:Http,
              public toastr:ToastrService,
              public activeRouter : ActivatedRoute){
    this.getAllSports();
    if (localStorage.getItem('sptid')) { 
      this.sportsId = localStorage.getItem('sptid');
      this.collectData();
    }
    else {
      this.activeRouter.params.subscribe(params => {
        if (params._id) { this.sportsId = params._id;}
        else { this.sportsId = false;}
        this.collectData();     
      });
    }
  }
  collectData(){
    // this.getAllSports();
    if (this.sportsId) {
      this.getAllPointsBySports();
      this.getAllFoulsBySports();
      this.getAllPlayerStatusBySport();
      this.getAllScoreBySport();
    }
  }
  setSportsID(id){
    this.sportsId = id;
    localStorage.setItem('sptid',id);
    this.collectData();
  }
  
  // +++++++++++++  Sports  +++++++++++++++++++
  getAllSports(){
    this.http.get(environment.api + "/sports").map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.sportsList.next(res);
      });
  }
  getSportsList():Observable <any>{
    return this.sportsList.asObservable();
  }
  deleteSport(id:any){
    this.http.delete(environment.api + "/sports/" + id).subscribe((res) => {
        this.toastr.success('Sport Deleted Successfully', 'Success');
        this.getAllSports();
    }, (error) => {
        this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }

  // +++++++++++++++++++ Points +++++++++++++++++++++

  getAllPointsBySports(){
    this.http.get(environment.api + '/sportpoints/bysport/' + this.sportsId).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.pointsList.next(res);
    });
  }
  getSinglePoint(id:any){
    this.http.get(environment.api + '/sportpoints/' +id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.singlePointData.next(res);
    });
  }
  getPointsList():Observable <any>{
    return this.pointsList.asObservable();
  }
  getSinglePointsData():Observable <any>{
    return this.singlePointData.asObservable();
  }
  deletePoint(id:any){
    this.http.delete(environment.api + "/sportpoints/" + id).subscribe((res) => {
      if (res) {
        this.toastr.success('Points Deleted Successfully', 'Success');
        this.getAllPointsBySports();
      }
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  savePoint(data:any){
    this.http.post(environment.api + "/sportpoints", data)
        .subscribe(res => {
          this.toastr.success('Points added successfully', 'Success');
          this.getAllPointsBySports();
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
  }
  updatePoint(id:any,data:any){
    this.http.patch(environment.api + "/sportpoints/" + id, data).subscribe(res => {
      this.toastr.success('Points Updated Successfully', 'Success');
      this.getAllPointsBySports();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });

  }

  // +++++++++++++++++++ Fouls +++++++++++++++++++++

  getAllFoulsBySports(){
    this.http.get(environment.api + '/sportfouls/bysport/' + this.sportsId).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.foulsList.next(res);
    });
  }
  getSingleFoul(id:any){
    this.http.get(environment.api + '/sportfouls/' +id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.singleFoulData.next(res);
    });
  }
  getFoulssList():Observable <any>{
    return this.foulsList.asObservable();
  }
  getSingleFoulData():Observable <any>{
    return this.singleFoulData.asObservable();
  }
  deleteFoul(id:any){
    this.http.delete(environment.api + "/sportfouls/" + id).subscribe((res) => {
      if (res) {
        this.getAllFoulsBySports();
        this.toastr.success('Foul Deleted Successfully', 'Success');
      }
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  saveFoul(data:any){
    this.http.post(environment.api + "/sportfouls", data).subscribe(res => {
      this.toastr.success('Fouls added successfully', 'Success');
      this.getAllFoulsBySports();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  updateFoul(id:any,data:any){
    this.http.patch(environment.api + "/sportfouls/" + id, data).subscribe(res => {
      this.toastr.success('Foul Updated Successfully', 'Success');
      this.getAllFoulsBySports();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }

  // +++++++++++++++++++ Fouls +++++++++++++++++++++

  getAllPlayerStatusBySport(){
    this.http.get(environment.api + '/sportplayerstatus/bysport/' + this.sportsId).map((res: Response) => <any[]>res.json()).subscribe((res) => {
      this.playerStatusList.next(res);
    });
  }
  getPlayesStatusList():Observable<any>{
    return this.playerStatusList.asObservable();
  } 
  getSinglePlayerStatusBySport(id:any){
    this.http.get(environment.api + '/sportplayerstatus/' + id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
      this.singlePlayerStatusData.next(res);
    });
  }
  getPlayesStatusData():Observable<any>{
    return this.singlePlayerStatusData.asObservable();
  } 
  deletePlayerStatus(id:any){
    this.http.delete(environment.api + "/sportplayerstatus/" + id).subscribe((res) => {
      if (res) {
        this.getAllPlayerStatusBySport();
        this.toastr.success('Player Status Deleted Successfully', 'Success');
      }
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  savePlayerStatus(data:any){
    this.http.post(environment.api + "/sportplayerstatus",data).subscribe(res => {
      this.toastr.success('Player status added successfully', 'Success');
      this.getAllPlayerStatusBySport()
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  updatePlayerStatus(id:any,data:any){
    this.http.patch(environment.api + "/sportplayerstatus/" + id, data).subscribe(res => {
      this.toastr.success('Player status Updated Successfully', 'Success');
      this.getAllPlayerStatusBySport();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }

  // +++++++++++++++++++ Score +++++++++++++++++++++

  getAllScoreBySport(){
    this.http.get(environment.api + '/sportscores/bysport/' + this.sportsId).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.scoresList.next(res);
      });
  }
  getScoreList():Observable<any>{
    return this.scoresList.asObservable();
  }
  getSingleScore(id:any){
    this.http.get(environment.api + '/sportscores/' +id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.singleScoreData.next(res);
      });
  }
  getSingleScoreData():Observable<any>{
    return this.singleScoreData.asObservable();
  }
  saveScore(data:any){
    this.http.post(environment.api + "/sportscores", data).subscribe(res => {
      this.toastr.success('Scores added successfully', 'Success');
      this.getAllScoreBySport();      
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  updateScore(id:any,data:any){
    this.http.patch(environment.api + "/sportscores/" + id, data).subscribe(res => {
      this.toastr.success('Scores Updated Successfully', 'Success');
      this.getAllScoreBySport();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  deleteScore(id:any){
    this.http.delete(environment.api + "/sportscores/" + id).subscribe((res) => {
      if (res) {
        this.toastr.success('Score Deleted Successfully', 'Success');
        this.getAllScoreBySport();
      }          
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
}
