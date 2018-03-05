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
    public clubList = new Subject<any>();
    constructor(public http:Http,public toastr:ToastrService,public activeRouter:ActivatedRoute) {
        this.sub = this.activeRouter.params.subscribe(params => {
            
        });
    }

    getAllClubList() {
        this.http.get(environment.api + "/club").map((res: Response) => <any[]>res.json()).subscribe((res)=>{
            this.clubList.next(res)
        })
    }

    getClubList(): Observable <any> {
        return this.clubList.asObservable();
    }
}   