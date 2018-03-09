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
    styleUrls: ['topnavbar.css']
})
export class TopnavbarComponent {
    public profilePhoto;
    public u: any;
    public loggedinUser;
    public roles: any;
    constructor(public userSer: UserService, public router: Router) {

        var tokendetails = JSON.parse(localStorage.getItem('uToken'));
        if (tokendetails) {
            this.userSer.getUsersById(tokendetails.user._id).subscribe(respo => {
                this.u = respo[0];
                if (this.u.person_photo) {
                    this.profilePhoto = environment.picpoint + this.u.person_photo;
                }
                else {
                    this.profilePhoto = "assets/defaultUser.png";
                }
                this.loggedinUser = this.u.username;
            });
            try {
                this.roles = JSON.parse(localStorage.getItem('roles'));
            }
            catch (err) {
//                this.router.navigate(['/login']);
            }
        }
    }
    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }
    goToProfile() {
        window.close();
    }

}
