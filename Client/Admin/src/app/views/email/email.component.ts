import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../components/services/email.service';
import { Email } from '../../components/class/email.class';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  public dtOptions;
  public email : Array<Email>;
  public dataRenderer:Boolean=false;
  constructor(private emailService:EmailService,private tost : ToastrService) { }

  ngOnInit() {
    this.emailService.getEmail().subscribe((res)=>{ this.email=res; this.dataRenderer=true });
    this.dtOptions = {
      pagingType: 'simple_numbers',
      order: [[0, 'desc']],
      columns: [{ "visible": false }, null, null, null, { "orderable": false }]
    }
  }
  delMailva(id){
    var del = confirm("Confirm To Delete this Email!");
    if (del) {
      this.dataRenderer = false;
      this.emailService.delEmail(id).subscribe((res)=>{ 
        if(res) {
          this.tost.success("Successfully Deleted Email","Success");
          this.ngOnInit();
        }
        else{
          this.tost.error("Error in deleting this Email","Error");
        } 
      });
    }
  }

}
