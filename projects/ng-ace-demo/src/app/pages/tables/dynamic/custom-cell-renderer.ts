import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
    <span class="text-105">{{name}}</span>
    <div class="text-95 text-secondary-d1">{{position}}</div>
  `,
})
export class NameCellComponent implements ViewCell, OnInit {

  name!: string;
  position!: string;

  @Input() value!: string | number;
  @Input() rowData: any;

  ngOnInit() {
    this.name = this.value.toString()
    this.position =  this.rowData['position']
  }
}




@Component({
  template: `
    <span class="text-grey-d1">{{office}}</span>
    <div [innerHTML]="badge"></div>
  `,
})
export class OfficeCellComponent implements ViewCell, OnInit {

  office!: string;
  badge!: string;

  @Input() value!: string | number;
  @Input() rowData: any;

  ngOnInit() {
    this.office = this.value.toString()
    this.badge =  this.rowData['badge']
  }
}





@Component({
  template: `
    <i class="fa fa-{{stat}}"></i>
    <span class="text-grey-d2">{{salary}}</span>
  `,
})
export class SalaryCellComponent implements ViewCell, OnInit {

  salary!: string;
  stat!: string | null;

  @Input() value!: string | number;
  @Input() rowData: any;

  ngOnInit() {
    this.salary = this.value.toString()
    this.stat =  this.rowData['stat'] && this.rowData['stat'].length > 0 ? this.rowData['stat'] : null
  }
}
