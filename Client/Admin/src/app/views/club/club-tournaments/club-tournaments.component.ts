import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Router ,ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Http } from "@angular/http";
import { HttpObserve } from '@angular/common/http/src/client';
import { Subscription } from 'rxjs/Subscription';
import { ClubService } from '../../../components/services/club.service';


@Component({
  selector: 'app-club-tournaments',
  templateUrl: './club-tournaments.component.html',
  styleUrls: ['./club-tournaments.component.css']
})
export class ClubTournamentsComponent implements OnInit {

  public dtOptions;clubid;
  public rows :Array<any>;
  public dataRenderer = true;
  public subscription:Subscription;
  constructor(private http : Http, private toastr : ToastrService, private router: Router,public activeRouter:ActivatedRoute,public clubService:ClubService) { }

  ngOnInit() {
    this.initializer();
    this.subscription = this.clubService.getTournamentsList().subscribe(res=>{ 
      this.rows = res; 
      this.dataRenderer = false;
        setTimeout(() => {
          this.dataRenderer = true;
        }, 50);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  initializer(){
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order:[[ 0, 'desc' ]],
      columns: [{"visible":false},null,null,null,null,{ "orderable": false }]
    };
    this.clubid=localStorage.getItem('clubid');
  }
  delTour(id){
      var del = confirm("Confirm to delete this Tournament!");
      if (del) {
        this.clubService.deleteTournaments(id);
      }
  }
  edit(id){
    this.clubService.getSingleTournaments(id);
  }
}
