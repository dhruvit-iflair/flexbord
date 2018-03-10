import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { Http } from "@angular/http";

@Component({
  selector: 'app-club-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public playersList:Array<any> = [];
  constructor(private http: Http) { }

  ngOnInit() {
    // this.playerList()
  }

  playerList() {
    this.http.get(environment.api + '/player')
      .subscribe(res => {
        this.playersList = res.json()
      })
  }
}
