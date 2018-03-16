import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ConfirmBoxService {
  public openBox = new Subject <any>();
  public subscription :Subscription;
  constructor() { }
  confirm(message: any,siFn:()=>void,noFn:()=>void){
    this.setConfirmation(message,siFn,noFn);
  }
  setConfirmation(message: any,siFn:()=>void,noFn:()=>void) {
    let that = this;
    this.openBox.next({ type: "confirm",
                text: message.text,
                title: message.title,
                siFn:
                function(){
                    that.openBox.next(); //this will close the modal
                    siFn();
                },
                noFn:function(){
                    that.openBox.next();
                    noFn();
                }
             });
  
         }
  
  getMessage(): Observable<any> {
     return this.openBox.asObservable();
  }
}