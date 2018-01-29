// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { modulerstack } from "../../services/modules";
// import { AccessorService } from "../accessor.service";
// import { ToastrService } from 'ngx-toastr';
// @Injectable()
// export class RouteGuard implements CanActivate {
//   public modules = modulerstack.modules;
//   constructor(public router: Router, private route: ActivatedRoute, private toastr: ToastrService, private accr: AccessorService) { }
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     if (localStorage.getItem('modularPerms')) {
//       var moduleperm = JSON.parse(localStorage.getItem('modularPerms'));

//       for (var x = 0; x < moduleperm.length; x++) {
//         var modulename = Object.keys(moduleperm[x]).toString();
//         // console.log('test guard :: '+moduleperm[x][Object.keys(moduleperm[x]).toString()]);
//         if (modulename == "Organizer" && moduleperm[x][modulename] === true) {
//           alert('organizer');
//           return true;
//         }
//         if (modulename == "Club" && moduleperm[x][modulename] === true) {
//           alert('club');
//           return true;
//         }
//         // if(modulename.toLowerCase()=="Permission" && moduleperm[x][modulename]===true){
//         //   alert('permission');
//         //   return true;
//         // }
//       }
//     }
//     else{
//       this.router.navigate(['/']);
//       return false;
//     }
//   }
// }
