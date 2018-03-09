import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/src/client';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GameSettingService {
  public gameSettingList = new Subject <any>();
  public singleGameSettingData = new Subject <any>();
  public consequencesList = new Subject <any>();
  public singleConsequencesData = new Subject <any>();
  public playlistsList = new Subject <any>();
  public singlePlaylistsData = new Subject <any>();
  public scoreBordList = new Subject <any>();
  public singleScoreBordData = new Subject <any>();
  public structureList = new Subject <any>();
  public singleStructureData = new Subject <any>();
  public timeSettingList = new Subject <any>();
  public singleTimeSettingData = new Subject <any>();
  public id :any;
  constructor(public http:HttpClient,public toastr :ToastrService) { }
  
  collectData(id){
    this.id = id;
    this.getAllConsequencesByGameSetting();
    this.getAllPlaylistsByGameSetting();
    this.getAllScoreBordsByGameSetting();
    this.getAllStructuresByGameSetting();
  }

  //+++++++++++++++++++ Game Setting +++++++++++++++++++++++++++++++++++ 

  getAllGameSetting(){
    this.http.get(environment.api + "/gamesettings").subscribe(res => {
        this.gameSettingList.next(res);
    });
  }
  getGameSettingList(): Observable<any> {
    return this.gameSettingList.asObservable();
  }  
  getSingleGameSetting(id:any){
    this.http.get(environment.api + "/gamesettings/"+id).subscribe(res => {
        this.singleGameSettingData.next(res);
    });
  }
  getSingleGameSettingData(): Observable<any> {
    return this.singleGameSettingData.asObservable();
  }  
  addGameSetting(data:any){
    this.http.post(environment.api + '/gamesettings',data).subscribe(dt => {
      this.toastr.success('Game Setting', 'Added Successfully.');
      this.getAllGameSetting();
    });
  }
  updateGameSetting(id:any,data:any){
    this.http.patch(environment.api + '/gamesettings/' + id, data).subscribe(result => {
      this.toastr.success('Game Setting Updated Successfully.', 'Success');
      this.getAllGameSetting();
    });
  }
  deleteGameSetting(id:any){
    this.http.delete(environment.api + "/gamesettings/" + id).subscribe((res) => {
        this.toastr.success('Setting Deleted Successfully', 'Success');
        this.getAllGameSetting();
    }, (error) => {
        this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }

  //+++++++++++++++++++ Game Setting +++++++++++++++++++++++++++++++++++ 

  getAllConsequencesByGameSetting(){
    this.http.get(environment.api + "/consequences/bysetting/" + this.id).subscribe(res => {
        this.consequencesList.next(res);
    });
  }
  getConsequencesList(): Observable<any> {
    return this.consequencesList.asObservable();
  }  
  getSingleConsequences(id:any){
    this.http.get(environment.api + "/consequences/"+id).subscribe(res => {
        this.singleConsequencesData.next(res);
    });
  }
  getSingleConsequenceData(): Observable<any> {
    return this.singleConsequencesData.asObservable();
  }  
  addConsequence(data:any){
    this.http.post(environment.api + '/consequences',data).subscribe(dt => {
      this.toastr.success('Consequences Added Successfully.', 'Success.');
      this.getAllConsequencesByGameSetting();
    });
  }
  updateConsequence(id:any,data:any){
    this.http.patch(environment.api + '/consequences/' + id, data).subscribe(result => {
      this.toastr.success('Consequences Updated Successfully.', 'Success.');
      this.getAllConsequencesByGameSetting();
    });
  }
  deleteConsequence(id:any){
    this.http.delete(environment.api + "/consequences/" + id).subscribe((res) => {
      this.toastr.success('Consequences Deleted Successfully', 'Success');
      this.getAllConsequencesByGameSetting();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  
  //+++++++++++++++++++ Game Playlist +++++++++++++++++++++++++++++++++++ 

  getAllPlaylistsByGameSetting(){
    this.http.get(environment.api + "/playlists/bysetting/" + this.id).subscribe(res => {
        this.consequencesList.next(res);
    });
  }
  getPlaylistList(): Observable<any> {
    return this.consequencesList.asObservable();
  }  
  getSinglePlaylist(id:any){
    this.http.get(environment.api + '/playlists/'+id).subscribe(res => {
        this.singlePlaylistsData.next(res);
    });
  }
  getSinglePlaylistData(): Observable<any> {
    return this.singlePlaylistsData.asObservable();
  }  
  addPlaylist(data:any){
    this.http.post(environment.api + '/playlists',data).subscribe(dt => {
      this.toastr.success('Playlist Added Successfully.', 'Success.');
      this.getAllPlaylistsByGameSetting();
    });
  }
  updatePlaylist(id:any,data:any){
    this.http.patch(environment.api + '/playlists/'+id, data).subscribe(result => {
      this.toastr.success('Playlist Updated Successfully.', 'Success.');
      this.getAllPlaylistsByGameSetting();
    });
  }
  deletePlaylist(id:any){
    this.http.delete(environment.api + "/playlists/" + id).subscribe((res) => {
      this.toastr.success('Playlist Deleted Successfully', 'Success');
      this.getAllPlaylistsByGameSetting();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }

  //+++++++++++++++++++ Game ScoreBord +++++++++++++++++++++++++++++++++++ 

  getAllScoreBordsByGameSetting(){
    this.http.get(environment.api + "/scoreboards/bysetting/"  + this.id).subscribe(res => {
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
      this.toastr.success('ScoreBord Added Successfully.', 'Success.');
      this.getAllScoreBordsByGameSetting();
    });
  }
  updateScoreBord(id:any,data:any){
    this.http.patch(environment.api + '/scoreboards/' +id, data).subscribe(result => {
      this.toastr.success('ScoreBord Updated Successfully.', 'Success.');
      this.getAllScoreBordsByGameSetting();
    });
  }
  deleteScoreBord(id:any){
    this.http.delete(environment.api + "/scoreboards/" + id).subscribe((res) => {
      this.toastr.success('Playlist Deleted Successfully', 'Success');
      this.getAllScoreBordsByGameSetting();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }

  //+++++++++++++++++++ Game Structure +++++++++++++++++++++++++++++++++++ 

  getAllStructuresByGameSetting(){
    this.http.get(environment.api + "/structures/bysetting/" + this.id).subscribe(res => {
        this.structureList.next(res);
    });
  }
  getStructureList(): Observable<any> {
    return this.structureList.asObservable();
  }  
  getSingleStructure(id:any){
    this.http.get(environment.api + '/structures/' +id).subscribe(res => {
        this.singleStructureData.next(res);
    });
  }
  getSingleStructureData(): Observable<any> {
    return this.singleStructureData.asObservable();
  }  
  addStructure(data:any){
    this.http.post(environment.api + '/structures',data).subscribe(dt => {
      this.toastr.success('Structure Added Successfully.', 'Success.');
      this.getAllStructuresByGameSetting();
    });
  }
  updateStructure(id:any,data:any){
    this.http.patch(environment.api + '/structures/' +id, data).subscribe(result => {
      this.toastr.success('Structure Updated Successfully.', 'Success.');
      this.getAllStructuresByGameSetting();
    });
  }
  deleteStructure(id:any){
    this.http.delete(environment.api + "/structures/" + id).subscribe((res) => {
      this.toastr.success('Structure Deleted Successfully', 'Success');
      this.getAllStructuresByGameSetting();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }

  //+++++++++++++++++++ Game TimeSetting +++++++++++++++++++++++++++++++++++ 

  getAllTimeSettingsByGameSetting(){
    this.http.get(environment.api + "/timesettings/bysetting/" + this.id).subscribe(res => {
        this.timeSettingList.next(res);
    });
  }
  getTimeSettingList(): Observable<any> {
    return this.timeSettingList.asObservable();
  }  
  getSingleTimeSetting(id:any){
    this.http.get(environment.api + '/timesettings/' +id).subscribe(res => {
        this.singleTimeSettingData.next(res);
    });
  }
  getSingleTimeSettingData(): Observable<any> {
    return this.singleTimeSettingData.asObservable();
  }  
  addTimeSetting(data:any){
    this.http.post(environment.api + '/timesettings',data).subscribe(dt => {
      this.toastr.success('Time Setting Added Successfully.', 'Success.');
      this.getAllTimeSettingsByGameSetting();
    });
  }
  updateTimeSetting(id:any,data:any){
    this.http.patch(environment.api + '/timesettings/' +id, data).subscribe(result => {
      this.toastr.success('Time Setting Updated Successfully.', 'Success.');
      this.getAllTimeSettingsByGameSetting();
    });
  }
  deleteTimeSetting(id:any){
    this.http.delete(environment.api + "/timesettings/" + id).subscribe((res) => {
      this.toastr.success('Time Setting Deleted Successfully', 'Success');
      this.getAllTimeSettingsByGameSetting();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
}
