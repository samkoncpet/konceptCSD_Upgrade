import { Component, OnInit } from '@angular/core';

import activity from './activity.json'

@Component({
  selector: 'app-profile-activity',
  templateUrl: './activity.component.html',
  styleUrls: []
})
export class ActivityComponent implements OnInit {

  constructor() { }

  activity = activity
  ngOnInit(): void {
  }

}
