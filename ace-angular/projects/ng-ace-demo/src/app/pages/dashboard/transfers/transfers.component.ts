import { Component, OnInit } from '@angular/core';

import transfers from './transfers.json'

@Component({
  selector: 'dashboard-transfers',
  templateUrl: './transfers.component.html'
})
export class TransfersComponent implements OnInit {

  transfers!: any;
  isCollapsed!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.transfers = transfers
  }

}
