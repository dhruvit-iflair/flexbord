import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Email } from "../class/email.class";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class EmailService {

  constructor(private http: Http, private toastr: ToastrService) { }

  getEmail(): Observable<Email[]> {
      return this.http.get(environment.api + '/email')
          .map((res: Response) => <Email[]>res.json())
          .catch(this.handleError);
  }
  getEmailById(id : String): Observable<Email[]> {
      return this.http.get(environment.api + '/email/'+id)
          .map((res: Response) => <Email[]>res.json())
          .catch(this.handleError);
  }
  addEmail(data: Email): Observable<any> {
      return this.http.post(environment.api + '/email', data)
          .map((res: Response) => <any[]>res.json())
          .catch(this.handleError);
  }
  updateEmail(data: Email,id:String): Observable<Email> {
      return this.http.put(environment.api + '/email/'+id, data)
          .map((res: Response) => <Email[]>res.json())
          .catch(this.handleError);
  }
  delEmail(id: String): Observable<Email> {
      return this.http.delete(environment.api + '/email/'+id)
          .map((res: Response) => <Email[]>res.json())
          .catch(this.handleError);
  }
  handleError(error: Response) {
      console.error(error);
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
      return Observable.throw(error.json().error || 'Server error');
  }
}
