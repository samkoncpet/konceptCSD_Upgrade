import { Component, OnInit } from '@angular/core';

import { NgAceActionService } from 'ng-ace-admin';

@Component({
  selector: 'app-inbox-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: []
})
export class SideMenuComponent implements OnInit {

  inboxMenuItem = 1;
  constructor(private actionService: NgAceActionService) { }

  ngOnInit(): void {
  }

  openComposeDialog() {
    this.actionService.action("#inbox-compose-dialog", 'show')
    this.actionService.action("#inbox-side-menu", 'hide')
  }

}
