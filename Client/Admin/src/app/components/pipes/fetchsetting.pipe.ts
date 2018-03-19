import { Pipe, PipeTransform } from '@angular/core';
import { Http } from "@angular/http";
import { Subject } from 'rxjs/Subject';
import { environment } from "../../../environments/environment";

@Pipe({
  name: 'fetchsetting'
})
export class FetchsettingPipe implements PipeTransform {
public http:Http;returnedval;
  transform(value: any, args?: any): any {
    debugger;
    this.http.get(environment.api + '/gamesettings/bysport/5a65b56fe531d0253623c2bc')
    .subscribe(res=>{
      var x=res.json();
      this.returnedval=x.settingname;
      console.log(this.returnedval);
    })
    return this.returnedval;
  }
  caller(value){
    
  }

}
