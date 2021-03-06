import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { AccessorService } from "../../components/common/accessor.service";
import { GameService } from '../../components/services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit {

  public rows: Array<any> = [];
  public data: Array<any> = [];
  public length: number = 0;
  public dtOptions;
  public dataRenderer = true;
  public hasEditPerm; hasDeletePerm; hasCreatePerm;
  public modules = this.accr.getmodules();
  public isInTeam = false;

  public hasTeamsPerm;hasMembersPerm;hasSeasonsPerm;hasClassificationsPerm;hasPointsPerm;hasStatusPerm;hasScoresPerm;hasFoulsPerm;
  constructor(public http: Http, private router: Router, private toastr: ToastrService, private accr: AccessorService,public gameService:GameService) { }
  ngAfterContentInit() {
    if(window.location.pathname.indexOf('team') > -1){
      this.isInTeam = true
    }
    else {
        this.isInTeam = false
    }
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, null, null, null, { "orderable": false }]
    }
  }
  ngOnInit(): void {
    this.gameService.getAllGames();
    this.gameService.getGameList().subscribe((res) => {
          this.dataRenderer = false;
          this.rows = res.json();
          this.length = this.rows.length;
          setTimeout(() => {
            this.dataRenderer = true;            
          }, 150);
    });
    this.checkpermissions();
  }
  checkpermissions() {
    var perms = this.accr.getUserPermissions();
    for (var z = 0; z < perms.length; z++) {
      if (Object.keys(perms[z]).toString().toLowerCase() == "game1" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasCreatePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "game2" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasEditPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "game3" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasDeletePerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportpoints0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasPointsPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportplayerstatus0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasStatusPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportscores0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasScoresPerm = true;
      }
      if (Object.keys(perms[z]).toString().toLowerCase() == "sportfouls0" && perms[z][Object.keys(perms[z]).toString()] == true) {
        this.hasFoulsPerm = true;
      }
    }
  }

  movetopoints(idx) {
    localStorage.setItem('sptid', idx);
    this.router.navigate(['/sports/points']);
  }

  movetostatus(idq) {
    localStorage.setItem('sptid', idq);
    this.router.navigate(['/sports/playerstatus']);
  }
  movetoscores(idx){
    localStorage.setItem('sptid', idx);
    this.router.navigate(['/sports/scores']);
  }
  movetofouls(idw) {
    localStorage.setItem('sptid', idw);
    this.router.navigate(['/sports/fouls']);
  }
  delClub(id){
    var del = confirm("Confirm to delete this Game?");
    if (del) {
        this.gameService.deleteGame(id);
    }
  }
  edit(id){
    this.gameService.getSingleGame(id);
  }
}
