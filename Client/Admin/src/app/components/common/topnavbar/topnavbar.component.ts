import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { environment } from "../../../../environments/environment";

declare var jQuery:any;

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.template.html',
    styleUrls:['topnavbar.css']
})
export class TopnavbarComponent {
    public profilePhoto;
    public u : any;
    public loggedinUser;

    constructor(){
        this.u = JSON.parse(localStorage.getItem('uToken'));
            this.profilePhoto = environment.picpoint + this.u.user.person_photo;
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
