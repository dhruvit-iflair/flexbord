import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Users } from "../class/users";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserService {
    
    constructor(private http: Http, private toastr: ToastrService) { }

    getUsers(): Observable<Users[]> {
        return this.http.get(environment.api + '/users')
            .map((res: Response) => <Users[]>res.json())
            .catch(this.handleError);
    }
    getUsersById(id : String): Observable<Users[]> {
        return this.http.get(environment.api + '/users/listonly/'+id)
            .map((res: Response) => <Users[]>res.json())
            .catch(this.handleError);
    }
    getRoles(): Observable<Users[]> {
        return this.http.get(environment.api + '/roles')
            .map((res: Response) => <any[]>res.json())
            .catch(this.handleError);
    }
    addUsers(data: Users): Observable<any> {
        return this.http.post(environment.api + '/users', data)
            .map((res: Response) => <any[]>res.json())
            .catch(this.handleError);
    }
    updateUsers(data: Users,id:String): Observable<Users> {
        return this.http.patch(environment.api + '/users/'+id, data)
            .map((res: Response) => <Users[]>res.json())
            .catch(this.handleError);
    }
    usersPhoto(data: any): Observable<Users> {
        return this.http.post(environment.api + '/users/upload', data)
            .map((res: Response) => <any[]>res.json())
            .catch(this.handleError);
    }
    delUsers(id: String): Observable<Users> {
        return this.http.delete(environment.api + '/users/'+id)
            .map((res: Response) => <Users[]>res.json())
            .catch(this.handleError);
    }
    handleError(error: Response) {
        console.error(error);
        this.toastr.error('Something went wrong !! Please try again later', 'Error');
        return Observable.throw(error.json().error || 'Server error');
    }
    
}