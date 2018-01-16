import { Component } from '@angular/core';
import {Router} from '@angular/router';

declare var jQuery:any;

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html'
})

export class NavigationComponent {
    public loggedinUser;
    public isProfileSet;
    constructor(private router: Router) {}
    ngOnInit(){
        if(localStorage.getItem('uToken')){
            var x=JSON.parse(localStorage.getItem('uToken'));
            this.loggedinUser=x.user.username;
            this.isProfileSet = x.user.isProfileSet;
        }
    }
    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
    }

    activeRoute(routename: string): boolean{
        return this.router.url.indexOf(routename) > -1;
    }


}