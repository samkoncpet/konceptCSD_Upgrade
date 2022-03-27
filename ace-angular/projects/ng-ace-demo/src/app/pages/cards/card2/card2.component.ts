import { Component, OnInit } from '@angular/core';

import { csv2json } from 'json-2-csv';

@Component({
  selector: 'app-demo-card#card2',
  templateUrl: './card2.component.html',
  styleUrls: []
})
export class Card2Component implements OnInit {

  constructor() { }

  members : any;

  ngOnInit(): void {
    let members = `name,email,status
    "Alex","alex@email.com",pending
    "Fred","fred@email.com",approved
    "John","john@email.com",blocked
    "James","james@email.com",online`

    csv2json(members, (err, data) => {
      setTimeout(() => {
        this.members = data
      })
    })

  }

}
