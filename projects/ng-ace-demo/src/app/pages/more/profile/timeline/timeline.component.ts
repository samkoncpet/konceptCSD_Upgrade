import { Component, OnInit } from '@angular/core';

import timeline from './timeline.json'

@Component({
  selector: 'app-profile-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: []
})
export class TimelineComponent implements OnInit {

  constructor() { }

  timeline = timeline
  ngOnInit(): void {
  }

}
