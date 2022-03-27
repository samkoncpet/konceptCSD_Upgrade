import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: []
})
export class TabsComponent implements OnInit {

  nav2active = 1;
  nav4active = 1;
  nav10active = 1;
  nav11active = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
