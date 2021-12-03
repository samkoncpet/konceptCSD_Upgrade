import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cell-custom',
  templateUrl: './cell-custom.component.html',
  styleUrls: ['./cell-custom.component.css']
})
export class CellCustomComponent implements OnInit {
  data: any;
  params: any;
  constructor(private http: HttpClient, private router: Router) {}
  id: string = "";
  agInit(params) {
    this.params = params;
    this.data = params.value;
    this.id = this.data; 
  }

  ngOnInit() {}

  editRow() {
    let rowData = this.params.value;
    let i = rowData.rowIndex;   
    this.id = rowData; 
  }

  viewRow() {
    let rowData = this.params.value;
    this.id = rowData;
  }

}
