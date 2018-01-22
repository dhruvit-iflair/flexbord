import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessorService } from "../accessor.service";

declare var jQuery: any;

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html'
})

export class NavigationComponent {
    public loggedinUser;
    public isProfileSet;
    public perms;haspermission=[];checker=[];
    public modules=this.accr.getmodules();
    constructor(private router: Router, private accr:AccessorService) { }

    ngOnInit() {
        if (localStorage.getItem('uToken')) {
            var xy = this.accr.getCurrentUser();
            this.loggedinUser = xy.user.username;
            this.isProfileSet = xy.user.isProfileSet;
            if(localStorage.getItem('fullPerms')){
                this.haspermission=this.accr.getUserPermissions();
            }
            else{
                this.accr.setUserPermissions();
            }
        }
    }
    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
    }

    activeRoute(routename: string): boolean {
        return this.router.url.indexOf(routename) > -1;
    }


}