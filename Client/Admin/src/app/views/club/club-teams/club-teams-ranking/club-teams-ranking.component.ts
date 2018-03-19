import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-club-teams-ranking',
  templateUrl: './club-teams-ranking.component.html',
  styleUrls: ['./club-teams-ranking.component.css']
})
export class ClubTeamsRankingComponent implements OnInit {
  public dataRemderer = true;
  public isSelected = true;
  public dtOptions :any;
  public rows:Array<any>=[];
  public data:Array<any> = [
    {
      _id:"jh234bgh2j3b54h2345hjb23l4b5",
      rank:1,
      team:"Team 1",
      logo:'',
      played: 2,
      wins:1,
      draws:0,
      losses:1,
      scores:0,
      against:0,
      type:"Tournamnet"
    },{
      _id:"dfhgdfgdghjfghjw56w53bwe5",
      rank:2,
      team:"Team 2",
      logo:'',
      played: 1,
      wins:1,
      draws:0,
      losses:0,
      scores:0,
      against:0,
      type:"Tournamnet"
    },{
      _id:"dfhge6d4bb46dthdfghdfhg",
      rank:3,
      team:"Team 3",
      logo:'',
      played: 4,
      wins:1,
      draws:2,
      losses:1,
      scores:0,
      against:0,
      type:"Tournamnet"
    },{
      _id:"fhgb56ebetrybhetrhybetber",
      rank:4,
      team:"Team 4",
      logo:'',
      played: 9,
      wins:1,
      draws:0,
      losses:8,
      scores:0,
      against:0,
      type:"Tournamnet"
    },{
      _id:"jh234bgh2j3b54h2345hjb23l4b5",
      rank:1,
      team:"Division Team 1",
      logo:'',
      played: 2,
      wins:1,
      draws:0,
      losses:1,
      scores:0,
      against:0,
      type:"Division"
    },{
      _id:"dfhgdfgdghjfghjw56w53bwe5",
      rank:2,
      team:"Division Team 2",
      logo:'',
      played: 1,
      wins:1,
      draws:0,
      losses:0,
      scores:0,
      against:0,
      type:"Division"
    },{
      _id:"dfhge6d4bb46dthdfghdfhg",
      rank:3,
      team:"Division Team 3",
      logo:'',
      played: 4,
      wins:1,
      draws:2,
      losses:1,
      scores:0,
      against:0,
      type:"Division"
    },{
      _id:"fhgb56ebetrybhetrhybetber",
      rank:4,
      team:"Division Team 4",
      logo:'',
      played: 9,
      wins:1,
      draws:0,
      losses:8,
      scores:0,
      against:0,
      type:"Division"
    }
  ]
  constructor() { 
    this.filterTournament();
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null,null, null,null, null,null, null,null,null]
    };
  }

  ngOnInit() {
  }
  filterTournament(){
    this.dataRemderer = false;
    this.rows = this.data.filter((d)=> d.type == "Tournamnet");
    setTimeout(() => {
      this.dataRemderer = true;     
    }, 150);    
  }
  filterDivision(){
    this.dataRemderer = false;
    this.rows = this.data.filter((d)=> d.type == "Division");
    setTimeout(() => {
      this.dataRemderer = true;     
    }, 150);
  }
}
