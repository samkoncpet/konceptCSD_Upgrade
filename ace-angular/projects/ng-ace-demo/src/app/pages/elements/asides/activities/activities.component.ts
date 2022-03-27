import { Component, OnInit } from '@angular/core';

import activities from './activities.json';

@Component({
  selector: 'asides-activities',
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent implements OnInit {

  activities: any;
  constructor() { }

  ngOnInit(): void {
    this.activities = activities
  }
  

}
