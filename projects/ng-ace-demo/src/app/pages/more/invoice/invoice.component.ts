import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: []
})
export class InvoiceComponent implements OnInit {

  payment!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
