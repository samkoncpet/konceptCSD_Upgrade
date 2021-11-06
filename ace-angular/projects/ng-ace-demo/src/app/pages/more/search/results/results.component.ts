import { Component, OnInit } from '@angular/core';

import results from './results.json';

@Component({
  selector: 'app-search-results',
  templateUrl: './results.component.html',
  styleUrls: []
})
export class ResultsComponent implements OnInit {

  results = results
  
  constructor() { }

  ngOnInit(): void {
  }

}
