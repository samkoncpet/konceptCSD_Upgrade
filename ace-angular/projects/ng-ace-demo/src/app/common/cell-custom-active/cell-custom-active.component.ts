import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cell-custom-active',
  templateUrl: './cell-custom-active.component.html',
  styleUrls: ['./cell-custom-active.component.css']
})
export class CellCustomActiveComponent implements OnInit {

  data: any;
  params: any;
  constructor(private http: HttpClient, private router: Router) {}
  isActive: string = "";
  agInit(params) {
    this.params = params;
    this.data = params.value;
    this.isActive = this.data; 
  }

  ngOnInit() {}

  editRow() {
    let rowData = this.params.value;
    let i = rowData.rowIndex;   
    this.isActive = rowData;
  }

  viewRow() {
    let rowData = this.params.value;
    this.isActive = rowData;
  }

}
