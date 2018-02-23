import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { environment } from "../../../../environments/environment";
import * as jQuery from 'jquery'
import { UserService } from '../../services/users';
import { Router } from '@angular/router';

// declare var jQuery:any;

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.template.html',
    styleUrls:['topnavbar.css']
})
export class TopnavbarComponent {
    public profilePhoto;
    public u : any;
    public loggedinUser;
    public roles : any;
    constructor(public userSer: UserService,public router : Router){
        this.u = JSON.parse(localStorage.getItem('uToken'));
        try {
            this.roles = JSON.parse(localStorage.getItem('roles'));
        }
        catch(err) {
            this.router.navigate(['/login']);
        }        
        if (this.u.user.person_photo) {
            this.profilePhoto = environment.picpoint + this.u.user.person_photo;
        } 
        else {
            this.profilePhoto = "assets/defaultUser.png";
        }
        this.loggedinUser = this.u.user.username;
    }
    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }
    goToProfile(){
        window.close();
    }

}
