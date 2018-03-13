import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ConfirmBoxService } from '../../services/confirm-box.service';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {
  public subscription :Subscription;
  public modal = document.getElementById('myModal');
  constructor(public confirmService:ConfirmBoxService) { }
  public message = {
    noFn:function(){},
    siFn:function(){},
    text:'',
    title:'',
    type:''
  };
  ngOnInit() {
    var modal =  document.getElementById('myModal');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    this.confirmService.getMessage().subscribe(message => {
        modal.style.display = "block";
        if(message) this.message = message;
    });
  }
  close(){
    var modal =  document.getElementById('myModal');
    modal.style.display = "none";    
  }
}
