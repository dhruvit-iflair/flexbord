import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Injectable()
export class ClubService {
    public sub: any;
    public id : any;
    public clubList = new Subject<any>();
    public singleClub = new Subject<any>();
    public clubMembersList = new Subject<any>();
    public singleClubMember = new Subject<any>();
    public clubSeasonsList = new Subject<any>();
    public singleClubSeason = new Subject<any>();
    public clubClassificationssList = new Subject<any>();
    public singleClubClassifications = new Subject<any>();
    public clubTournamentssList = new Subject<any>();
    public singleClubTournaments = new Subject<any>();
    public tab = new Subject<any>();
    constructor(public http:Http,public toastr:ToastrService,public activeRouter:ActivatedRoute) {
        this.sub = this.activeRouter.params.subscribe(params => {
            this.id = params._id;
            this.getAllClubList();
        });
    }
    collectData(id){
        this.id = id;
        localStorage.setItem('clubid', id);
        this.getAllMembersByClub();
        this.getAllSeasonByClub();
        this.getAllClassificationsByClub();
        this.getAllTournamentsByClub();
    }
    changeTab(id:any){
        this.tab.next(id);
    }
    getTabActive():Observable <any>{
        return this.tab.asObservable();
    }
    //++++++++++++++++ Club ++++++++++++++++++++++++++++++ 

    getAllClubList() {
        this.http.get(environment.api + "/club").map((res: Response) => <any[]>res.json()).subscribe((res)=>{
            this.clubList.next(res)
        })
    }

    getClubList(): Observable <any> {
        return this.clubList.asObservable();
    }
    getSingleClub(id:any) {
        this.http.get(environment.api + "/club/"+id).map((res: Response) => <any[]>res.json()).subscribe((res)=>{
            this.singleClub.next(res)
        })
    }

    getSingleClubData(): Observable <any> {
        return this.singleClub.asObservable();
    }

    deleteClub(id:any){
        this.http.delete(environment.api + "/club/" + id)
          .subscribe((res) => {
            var d = res.json();
            if (d._id) {
              this.toastr.success('Organizer Deleted Successfully', 'Success');
              this.getAllClubList();
            }
          }, (error) => {
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
          })
    }

    // redUrl(up:any){
    //     this.http.post(environment.api+"/club/logo",up).map((res: Response) => <any[]>res.json()).subscribe((res) => {  
    //       if (res) {
             
    //       }
    //       else{
    //         this.toastr.error('Error!! Something went wrong! try again later', 'Error');                 
    //       }
    //     })
    // }

    updateClub(id:any,data:any) {   
        this.http.put(environment.api +"/club/"+id,data).subscribe((res)=>{
            var d = res.json();
            if (d._id) {
            this.toastr.success('Club Updated Successfully', 'Success');
            this.getAllClubList();
            }
        },(error)=>{
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
        })
      } 
    saveClub(data:any){
        var h = new Date().getHours();
        var m = new Date().getMinutes();
        var r = new Date();
        r.setHours(h);
        r.setMinutes(m);                         
        data.registered =r ;                              
        this.http.post(environment.api +"/club",data).subscribe((res)=>{
            var d = res.json();
            if (d._id) {
            this.toastr.success('Club Registered Successfully', 'Success');
            this.getAllClubList();
            }
        },(error)=>{
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
        })
      }

    // ++++++++++++++++++++++++++ Members ++++++++++++++++++++++++++

    getAllMembersByClub(){
      this.http.get(environment.api + '/clubmembers/getByClub/' + this.id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
        this.clubMembersList.next(res);
      });
    }
    
    getMembersList():Observable <any>{
        return this.clubMembersList.asObservable();
    }
    
    getSingleMember(id){
        this.http.get(environment.api + '/clubmembers/' + id).map((res: Response) => <any[]>res.json()).subscribe((res) => {
            this.singleClubMember.next(res);
        });
    }
    
    getSingleMemberData():Observable <any>{
        return this.singleClubMember.asObservable();
    }
    deleteMember(id){
        this.http.delete(environment.api + "/clubmembers/" + id)
        .subscribe((res) => {
          if (res) {
            this.toastr.success('Member Deleted Successfully', 'Success');
            this.getAllMembersByClub();
          }
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }

    changeStatusA(id) {
        this.http.get(environment.api + "/clubmembers/statusA/" + id).subscribe((res) => {
        if (res) {
            this.toastr.success('Member Status Changed Successfully', 'Success');
        }
            this.getAllMembersByClub();
        }, 
        (error) => {
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
    changeStatusP(id) {
    this.http.get(environment.api + "/clubmembers/statusP/" + id).subscribe((res) => {
        if (res) {
            this.toastr.success('Member Status Changed Successfully', 'Success');
        }
            this.getAllMembersByClub();
        },
        (error) => {
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
        });
    }
    updateMember(id:any,data:any) {
        this.http.put(environment.api +"/clubmembers/"+id,data).subscribe((res)=>{
            var d = res.json();
            if (d._id) {
            this.toastr.success('Club Member Updated Successfully', 'Success');
            this.getAllMembersByClub();
            }
        },(error)=>{
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
        })
    } 
    saveMember(data:any){
        this.http.post(environment.api +"/clubmembers",data).subscribe((res)=>{
            var d = res.json();
            if (d._id) {
            this.toastr.success('Club Member Registered Successfully', 'Success');
            this.getAllMembersByClub();
            }
        },(error)=>{
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
        })
    }

    // ++++++++++++++++++++++++++ Season +++++++++++++++++++++++++++
    
    getAllSeasonByClub(){
      this.http.get(environment.api + '/clubSeasons/byclub/' + this.id).subscribe((res) => {
            this.clubSeasonsList.next(res.json());      
      });
    }
    getSeasonList():Observable<any>{
        return this.clubSeasonsList.asObservable();
    }
    getSingleSeason(id){
        this.http.get(environment.api + '/clubSeasons/' + id).subscribe((res) => {
            this.singleClubSeason.next(res.json());      
        });
    }
    getSingleSeasonData():Observable<any>{
        return this.singleClubSeason.asObservable();
    }
    deleteSeason(id:any){
        this.http.delete(environment.api + "/clubSeasons/" + id).subscribe((res) => {
          var d = res.json();
          if (d._id) {
            this.toastr.success('Season Deleted Successfully', 'Success');
            // this.router.navigate(['/organizer']);
            this.getAllSeasonByClub();
          }
        }, (error) => {
          this.toastr.error('Something went wrong !! Please try again later', 'Error');
        })
    }
    updateSeason(id:any,data:any) {
        this.http.put(environment.api+'/clubSeasons/'+id,data).subscribe((res)=>{
            if(res){
                this.toastr.success('Season updated successfully', 'Success');
                this.getAllSeasonByClub();
            }
            else {
                this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
                // this.getAllSeasonByClub();
            }
            },(error)=>{
            this.toastr.error('Error!! Something went wrong! try again later', 'Error');
        });
      } 
    saveSeason(data:any) {
        this.http.post(environment.api+'/clubSeasons',data).subscribe((res)=>{
            if(res){
            this.toastr.success('Season saved successfully', 'Success');
            this.getAllSeasonByClub();
            }
            else {
                this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
            }
        },(error)=>{
            this.toastr.error('Error!! Something went wrong! try again later', 'Error');
        });  
    }

    // ++++++++++++++++++++++++++ Classification ++++++++++++++++++++++++++

      getAllClassificationsByClub(){
        this.http.get(environment.api + '/clubClassifications/byclub/' + this.id).subscribe((res) => {
              this.clubClassificationssList.next(res.json());      
        });
      }
      getClassificationsList():Observable<any>{
          return this.clubClassificationssList.asObservable();
      }
      getSingleClassifications(id){
          this.http.get(environment.api + '/clubClassifications/' + id).subscribe((res) => {
              this.singleClubClassifications.next(res.json());      
          });
      }
      getSingleClassificationsData():Observable<any>{
          return this.singleClubClassifications.asObservable();
      }
      deleteClassifications(id:any){
          this.http.delete(environment.api + "/clubClassifications/" + id).subscribe((res) => {
            var d = res.json();
            if (d._id) {
              this.toastr.success('Classifications Deleted Successfully', 'Success');
              // this.router.navigate(['/organizer']);
              this.getAllClassificationsByClub();
            }
          }, (error) => {
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
          })
      }
      updateClassifications(id:any,data:any) {
          this.http.put(environment.api+'/clubClassifications/'+id,data).subscribe((res)=>{
              if(res){
                  this.toastr.success('Classifications updated successfully', 'Success');
                  this.getAllClassificationsByClub();
              }
              else {
                  this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
                  // this.getAllClassificationsByClub();
              }
              },(error)=>{
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
          });
        } 
      saveClassifications(data:any) {
          this.http.post(environment.api+'/clubClassifications',data).subscribe((res)=>{
              if(res){
              this.toastr.success('Classifications saved successfully', 'Success');
              this.getAllClassificationsByClub();
              }
              else {
                  this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
              }
          },(error)=>{
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
          });  
      }
  
    // ++++++++++++++++++++++++++ Tournaments ++++++++++++++++++++++++++

      getAllTournamentsByClub(){
        this.http.get(environment.api + '/clubTournaments/byclub/' + this.id).subscribe((res) => {
              this.clubTournamentssList.next(res.json());      
        });
      }
      getTournamentsList():Observable<any>{
          return this.clubTournamentssList.asObservable();
      }
      getSingleTournaments(id){
          this.http.get(environment.api + '/clubTournaments/' + id).subscribe((res) => {
              this.singleClubTournaments.next(res.json());      
          });
      }
      getSingleTournamentsData():Observable<any>{
          return this.singleClubTournaments.asObservable();
      }
      deleteTournaments(id:any){
          this.http.delete(environment.api + "/clubTournaments/" + id).subscribe((res) => {
            var d = res.json();
            if (d._id) {
              this.toastr.success('Tournaments Deleted Successfully', 'Success');
              // this.router.navigate(['/organizer']);
              this.getAllTournamentsByClub();
            }
          }, (error) => {
            this.toastr.error('Something went wrong !! Please try again later', 'Error');
          })
      }
      updateTournaments(id:any,data:any) {
          this.http.put(environment.api+'/clubTournaments/'+id,data).subscribe((res)=>{
              if(res){
                  this.toastr.success('Tournaments updated successfully', 'Success');
                  this.getAllTournamentsByClub();
              }
              else {
                  this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
                  // this.getAllTournamentsByClub();
              }
              },(error)=>{
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
          });
        } 
      saveTournaments(data:any) {
          this.http.post(environment.api+'/clubTournaments',data).subscribe((res)=>{
              if(res){
              this.toastr.success('Tournaments saved successfully', 'Success');
              this.getAllTournamentsByClub();
              }
              else {
                  this.toastr.error('Error!!Something went wrong! try again later!', 'Error');
              }
          },(error)=>{
              this.toastr.error('Error!! Something went wrong! try again later', 'Error');
          });  
      }
  
}   