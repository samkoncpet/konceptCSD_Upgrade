import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: []
})
export class ButtonsComponent implements OnInit {

  isCollapsed = false;
  constructor() { }

  ngOnInit(): void {
  }

}
