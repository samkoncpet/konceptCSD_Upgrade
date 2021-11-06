import { Component, OnInit } from '@angular/core';

import results from './results.json';


@Component({
  selector: 'app-search-sponsored-results',
  templateUrl: './sponsored-results.component.html',
  styleUrls: []
})
export class SponsoredResultsComponent implements OnInit {

  results = results

  Array = Array;
  Math = Math;
  
  constructor() { }

  ngOnInit(): void {
  }

}
