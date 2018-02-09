import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-managegame',
  templateUrl: './managegame.component.html',
  styleUrls: ['./managegame.component.css']
})
export class ManagegameComponent implements OnInit {

  constructor(public http: HttpClient, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public mForm = { sports: '', settings: '', gameType: '', competition: '', hometeam: '', visitorteam: '', gamenumber: '', round: '', gamedate: '', gametime: '', gamelocation: '', gameplace: '', referee: '', timer: '', umpire1: '', umpire2: '', scorer: '', shotclockoperator: '' };
  public sports; teams;
  public types = ['Division', 'Friendly', 'Tournament'];
  public settings=['Setting-1','Setting-2','Setting-3','Setting-4','Setting-5'];
  public competetions=['Competetion-1','Competetion-2','Competetion-3','Competetion-4','Competetion-5'];
  public paramdetails = false;
  public userId;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params._id;
      if (this.userId) {
        this.paramdetails = true;
        this.http.get(environment.api + '/games/' + this.userId)
          .subscribe(res => {
            this.mForm = res[0];
            if (res[0].gamedate) {
              var x = res[0].gamedate.split('T');
              this.mForm.gamedate = x[0];
            }
            this.mForm.hometeam = res[0].hometeam._id;
            this.mForm.visitorteam = res[0].visitorteam._id;
          });
      }
    });
    this.initializedata();
  }
  initializedata() {
    this.http.get(environment.api + '/sports').subscribe(res => {
      this.sports = res;
    });
    this.http.get(environment.api + '/clubteams').subscribe(resp => {
      this.teams = resp;
    });
  }
  managegames(gotdata) {
    if (this.paramdetails) {
      this.http.patch(environment.api + '/games/' + this.userId, gotdata)
        .subscribe(result => {
          this.toastr.success('Game', 'Updated Successfully.');
          this.router.navigate(['/games']);
        });
    }
    else {
      this.http.post(environment.api + '/games', gotdata)
        .subscribe(dt => {
          this.toastr.success('Game', 'Added Successfully.');
          this.router.navigate(['/games']);
        });
    }
  }

}
