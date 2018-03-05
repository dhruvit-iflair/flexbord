import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Injectable()
export class OrganizerService {
  public orgSubject = new Subject<any>();
  public orgSingleSubject = new Subject<any>();
  public subject = new Subject<any>();
  public subSingle = new Subject<any>();
  public seasonSubject = new Subject<any>();
  public seasonSubSingle = new Subject<any>();
  public classificationSubject = new Subject<any>();
  public classificationSubSingle = new Subject<any>();
  public members:any;
  public season:any;
  public classification:any;
  public allmembers:any;
  public allOrganizer:any;
  public organizer:any;
  public sub: any;
  public _id: any;
  constructor(public http:Http,public toastr:ToastrService,public activeRouter:ActivatedRoute) {
    this.sub = this.activeRouter.params.subscribe(params => {
        // if (params._id) {
        //   this._id = params._id;
        // }
    });
  }

  collectAlldata(id:any){
    this._id = id;
    localStorage.setItem("orgid",this._id);    
    this.getMembersByOrg();
    this.getSeasonsByOrg();
    this.getAllOrganizers();
    this.getClassificationByOrg();
  }
  getAllOrganizers(){
    this.http.get(environment.api + '/organizer').map((res: Response) => <any[]>res.json()).subscribe((res)=>{
      if (res) {
        this.allOrganizer = res;
        this.orgSubject.next(res);
      }
    })
  }
  getSingleOrganizersList(): Observable<any> {
    return this.orgSubject.asObservable();
  }
  deleteOrganizer(id:any){
    this.http.delete(environment.api + "/organizer/" + id).subscribe((res) => {
          var d = res.json();
          if (d._id) {
            this.toastr.success('Organizer Deleted Successfully', 'Success');
            this.getAllOrganizers();
          }
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        })
  }
  //+++++++++++++++++++ Members ++++++++++++++++++++++++//
  

  getAllOrganizerMembers(){
    this.http.get(environment.api +'/orgmembers').map((res: Response) => <any[]>res.json()).subscribe((res)=>{
      if (res) {
        this.allmembers = res;
      }
    })
  }
  saveMembers(data:any) {
    this.http.post(environment.api + '/orgmembers', data)
    .subscribe(dt => {
      this.toastr.success('Organization Member', 'Added Successfully.');
      this.getMembersByOrg();
    });
  }

  getMembersByOrg(){
    this.http.get(environment.api + '/orgmembers/byorg/' + this._id)
      .subscribe((res) => {
        this.members = res;
        this.subject.next(this.members);
      });
  }
  setSingleMemberData(id:any){
    this.http.get(environment.api + '/orgmembers/' + id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        // this.members = res;
        this.subSingle.next(res[0]);
      });
  }
  getMembersList(): Observable<any> {
      return this.subject.asObservable();
  }
  getSingleMember(): Observable<any> {
    return this.subSingle.asObservable();
  }
  updateMember(id:any,gotdata:any){
    this.http.patch(environment.api+'/orgmembers/'+id,gotdata)
    .subscribe(result=>{
      this.toastr.success('Organization Member Updated Successfully.', 'Success');
      this.getMembersByOrg();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  deleteMember(id:any){
    this.http.delete(environment.api + "/orgmembers/" + id)
    .subscribe((res) => {
      if (res) {
        this.toastr.success('Member Deleted Successfully', 'Success');
        this.getMembersByOrg();
      }
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }  

  //+++++++++++++++++++ Season ++++++++++++++++++++++++//

  saveSeason(data:any) {
    this.http.post(environment.api + '/seasons', data)
    .subscribe(dt => {
      this.toastr.success('Organization Member', 'Added Successfully.');
      this.getSeasonsByOrg();
    });
  }

  getSeasonsByOrg(){
    this.http.get(environment.api + '/seasons/byorg/' + this._id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.season = res;
        this.seasonSubject.next(this.season);
      });
  }
  setSingleSeasonData(id:any){
    this.http.get(environment.api + '/seasons/' + id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        // this.members = res;
        this.seasonSubSingle.next(res[0]);
      });
  }
  getSeasonList(): Observable<any> {
      return this.seasonSubject.asObservable();
  }
  getSingleSeason(): Observable<any> {
    return this.seasonSubSingle.asObservable();
  }
  updateSeason(id:any,gotdata:any){
    this.http.put(environment.api+'/seasons/'+id,gotdata).subscribe(result=>{
      this.toastr.success('Organization Season Updated Successfully.', 'Success');
      this.getSeasonsByOrg();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  deleteSeason(id:any){
    this.http.delete(environment.api + "/seasons/" + id)
    .subscribe((res) => {
      if (res) {
        this.toastr.success('Season Deleted Successfully', 'Success');
        this.getSeasonsByOrg();
      }
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }

  //+++++++++++++++++++ Classification ++++++++++++++++++++++++//

  getClassificationList(): Observable<any> {
    return this.classificationSubject.asObservable();
  }
  getSingleClassification(): Observable<any> {
    return this.classificationSubSingle.asObservable();
  }
  saveClassification(data:any) {
    this.http.post(environment.api + '/organizerClassifications', data)
    .subscribe(dt => {
      this.toastr.success('Classification Added Successfully', 'Success');
      this.getClassificationByOrg();
    });
  }

  getClassificationByOrg(){
    this.http.get(environment.api + '/organizerClassifications/byorg/' + this._id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.classificationSubject.next(res);
      });
  }
  setClassificationData(id:any){
    this.http.get(environment.api + '/organizerClassifications/' + id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        // this.members = res;
        this.classificationSubSingle.next(res[0]);
      });
  }
  updateClassificationData(id:any,gotdata:any){
    this.http.put(environment.api+'/organizerClassifications/'+id,gotdata).subscribe(result=>{
      this.toastr.success('Classification Updated Successfully.', 'Success');
      this.getClassificationByOrg();
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }
  deleteClassificationData(id:any){
    this.http.delete(environment.api + "/organizerClassifications/" + id)
    .subscribe((res) => {
      if (res) {
        this.toastr.success('Classification Deleted Successfully', 'Success');
        this.getClassificationByOrg();
      }
    }, (error) => {
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
    });
  }

}

