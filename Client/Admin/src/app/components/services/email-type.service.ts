import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EmailType } from "../class/emailType.class";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class EmailTypeService {

 
  constructor(private http: Http, private toastr: ToastrService) { }

  getEmailType(): Observable<EmailType[]> {
      return this.http.get(environment.api + '/emailType')
          .map((res: Response) => <EmailType[]>res.json())
          .catch(this.handleError);
  }
  getEmailTypeById(id : String): Observable<EmailType[]> {
      return this.http.get(environment.api + '/emailType/'+id)
          .map((res: Response) => <EmailType[]>res.json())
          .catch(this.handleError);
  }
  addEmailType(data: EmailType): Observable<any> {
      return this.http.post(environment.api + '/emailType', data)
          .map((res: Response) => <any[]>res.json())
          .catch(this.handleError);
  }
  updateEmailType(data: EmailType,id:String): Observable<EmailType> {
      return this.http.put(environment.api + '/emailType/'+id, data)
          .map((res: Response) => <EmailType[]>res.json())
          .catch(this.handleError);
  }
  delEmailType(id: String): Observable<EmailType> {
      return this.http.delete(environment.api + '/emailType/'+id)
          .map((res: Response) => <EmailType[]>res.json())
          .catch(this.handleError);
  }
  handleError(error: Response) {
      console.error(error);
      this.toastr.error('Something went wrong !! Please try again later', 'Error');
      return Observable.throw(error.json().error || 'Server error');
  }
}
