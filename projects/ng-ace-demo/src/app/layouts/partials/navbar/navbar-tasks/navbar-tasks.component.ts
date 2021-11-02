import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-tasks',
  templateUrl: './navbar-tasks.component.html',
  styleUrls: []
})
export class NavbarTasksComponent implements OnInit {

  constructor() { }

  tasks = [
    {
       "title": "Software update",
       "percent": "60",
       "color": "bgc-info"
    },
   
    {
        "title": "Hardware upgrade",
        "percent": "40",
        "color": "bgc-warning"
    },
   
    {
        "title": "Customer support",
        "percent": "30",
        "color": "bgc-danger"
    },
   
    {
        "title": "Fixing bugs",
        "percent": "85",
        "color": "bgc-success progress-bar-striped progress-bar-animated"
    }
  ]

  ngOnInit(): void {
  }

}
