import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessorService } from "../accessor.service";
import { environment } from "../../../../environments/environment";
import { UserService } from '../../services/users';
declare const jQuery: any;
// import * as jQuery from 'jquery'


@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html',
    styleUrls: ['navigation.css']
})

export class NavigationComponent {
    public loggedinUser;
    public isProfileSet;
    public perms; haspermission = []; checker = [];
    public profilePhoto;
    public u: any={
        firstname:'',
        lastname:''
    };
    public modules = this.accr.getmodules();
    public modulesize = this.modules.length * 4;
    public roles: any={
        title : ''
    };
    public check: Boolean = true;
    constructor(private router: Router, private accr: AccessorService, public userSer: UserService) { }

    ngOnInit() {
        var tokendetails=JSON.parse(localStorage.getItem('uToken'));
        if (tokendetails) {
            this.userSer.getUsersById(tokendetails.user._id).subscribe(respo => {
                this.u = respo[0];
               // var xy = this.accr.getCurrentUser();
                //this.u = JSON.parse(localStorage.getItem('uToken'));
                if(localStorage.getItem('roles')) {
                    this.roles = JSON.parse(localStorage.getItem('roles'));
                }
                else{
                    this.router.navigate(['/login']);
                }
                if (this.u.person_photo) {
                    this.profilePhoto = environment.picpoint + this.u.person_photo;
                }
                else {
                    this.profilePhoto = "assets/defaultUser.png";
                }
                this.loggedinUser = this.u.username;
                this.isProfileSet = this.u.isProfileSet;
                if (localStorage.getItem('fullPerms')) {
                    this.haspermission = this.accr.getUserPermissions();
                }
                else {
                    this.accr.setUserPermissions();
                }
            });
        }
    }
    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
    }

    activeRoute(routename: string): boolean {
        return this.router.url.indexOf(routename) > -1;
    }


}