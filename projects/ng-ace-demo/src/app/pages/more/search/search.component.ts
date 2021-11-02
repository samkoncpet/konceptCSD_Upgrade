import { Component, OnInit } from '@angular/core';

// @ts-ignore
import HolderJS from 'holderjs';

import { NgAceActionService } from 'ng-ace-admin';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: []
})
export class SearchComponent implements OnInit {

  constructor(private actionService: NgAceActionService) { }

  ngOnInit(): void {
    // should be called (initiated)
    let holderJS = HolderJS
  }

  showFiltersModal() {
    this.actionService.action('#search-filters', 'toggle')
  }

}
