import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-classifications',
  templateUrl: './organizer-classifications.component.html',
  styleUrls: ['./organizer-classifications.component.css']
})
export class OrganizerClassificationsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
