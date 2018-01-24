import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class ClubService {
    
    constructor(private http: HttpClient) { }
    get(){
        return this.http.get(environment.api +'/club');
    }
    getById(id:any){
        return this.http.get(environment.api +'/club/'+id);
    }   
    add(clubData:any){
        return this.http.post(environment.api +'/club', clubData);
    }
    edit(clubData:any){    
        return this.http.put(environment.api +'/club', clubData);
    }
    logo(log:any){
        return this.http.post(environment.api+"/club/logo",log);
    }
    placePic(up:any){
        return this.http.post(environment.api+"/club/upload",up);
    }
    delete(clubId:any){
        return this.http.delete(environment.api +'/club/'+clubId);
    }
}

