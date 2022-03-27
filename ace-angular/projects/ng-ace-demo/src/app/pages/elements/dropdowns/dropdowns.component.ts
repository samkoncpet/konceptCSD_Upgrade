import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: []
})
export class DropdownsComponent implements OnInit {

  timeFormat: number = 1;
  selectSize!: number;

  userShares = [
    {
      avatar: 'avatar3.jpg',
      selected: true
    },
    {
      avatar: 'avatar4.jpg',
      selected: false
    },
    {
      avatar: 'avatar1.jpg',
      selected: false
    },
    {
      avatar: 'avatar2.jpg',
      selected: false
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
