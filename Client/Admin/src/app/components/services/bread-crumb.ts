import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { BreadCrumb } from "../class/breadCrumb";
import { Router ,NavigationStart} from "@angular/router";

@Injectable()
export class BreadCrumbService {
    routeChange: Subject<BreadCrumb> = new Subject<BreadCrumb>();

    constructor(public router:Router) {
        this.router.events
        .filter(event => event instanceof NavigationStart)
    .subscribe((event:NavigationStart) => {
            console.log(event);
          });
     }
}