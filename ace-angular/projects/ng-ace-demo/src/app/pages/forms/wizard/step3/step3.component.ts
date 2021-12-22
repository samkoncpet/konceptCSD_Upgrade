import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-step3',
  templateUrl: './step3.component.html',
  styleUrls: []
})
export class Step3Component implements OnInit {

  payment!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
