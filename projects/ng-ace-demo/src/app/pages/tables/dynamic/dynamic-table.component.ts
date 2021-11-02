import { Component, ElementRef, AfterViewInit, ViewEncapsulation, ChangeDetectorRef, ViewChild } from '@angular/core';
import { csv2json } from 'json-2-csv';

import { Ng2SmartTableComponent } from 'ng2-smart-table';

import { NameCellComponent, OfficeCellComponent, SalaryCellComponent  } from './custom-cell-renderer'


@Component({
  selector: 'app-datatable',
  templateUrl: './dynamic-table.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class DynamicTableComponent implements AfterViewInit {

  employees: any;
  settings: any;
  element: any;

  @ViewChild(Ng2SmartTableComponent) smartTable!: Ng2SmartTableComponent;

  constructor(private el: ElementRef, private ref: ChangeDetectorRef) {

    this.element = this.el.nativeElement;

    let csvData = `name,position,location,age,date,salary,highlight,stat,badge
    "Tigerd Nixon","System Architect","Edinburgh",61,"2011/04/25","$320,800","purple-m1","arrow-down text-orange-d1","<span class='badge bgc-orange-d1 text-white badge-sm'>On Vacation</span>"
    "Garrett Winters","Accountant","Tokyo",63,"2011/07/25","$170,750",,"arrow-down text-orange-d1","<span class='badge badge-primary badge-sm'>2011/04/25</span>"
    "Ashton Cox","Junior Technical Author","San Francisco",66,"2009/01/12","$86,000",,"arrow-up text-blue-d1",
    "Cedric Kelly","Senior Javascript Developer","Edinburgh",22,"2012/03/29","$433,060","blue-m1",,
    "Airi Satou","Accountant",Tokyo,33,"2008/11/28","$162,700","success-m2","arrow-down text-danger",
    "Brielle Williamson","Integration Specialist","New York",61,"2012/12/02","$372,000",,,
    "Herrod Chandler","Sales Assistant","San Francisco",59,"2012/08/06","$137,500","danger-m1",,
    "Rhona Davidson","Integration Specialist","Tokyo",55,"2010/10/14","$327,900","purple-m1",,
    "Colleen Hurst","Javascript Developer","San Francisco",39,"2009/09/15","$205,500",,,
    "Sonya Frost","Software Engineer","Edinburgh",23,"2008/12/13","$103,600",,,
    "Jena Gaines","Office Manager","London",30,"2008/12/19","$90,560","success",,
    "Quinn Flynn","Support Lead","Edinburgh",22,"2013/03/03","$342,000",,,
    "Charde Marshall","Regional Director","San Francisco",36,"2008/10/16","$470,600",,,`

    csv2json(csvData, (err, data) => {
      this.employees = data
    })


    this.settings = {
      selectMode: 'multi',
      hideSubHeader: true,
      rowClassFunction: (row: any) => {if (row.isSelected) return 'bgc-green-l3'; return 'bgc-h-default-l4';},
      actions: {
        position: 'right'
      },
      edit: {
        editButtonContent: '<i class="fa fa-pencil-alt text-blue"></i>',
        saveButtonContent: '<i class="fa fa-check text-success mr-2px"></i>',
        cancelButtonContent: '<i class="fa fa-times text-orange-d2 ml-2px"></i>'
      },
      delete: {
        deleteButtonContent: '<i class="fa fa-trash-alt text-danger"></i>',
      },
      add: {
        addButtonContent: '<i class="fa fa-plus text-purple"></i> Add',
        createButtonContent: '<i class="fa fa-check text-success mr-1"></i>',
        cancelButtonContent: '<i class="fa fa-times text-orange-d2 ml-1"></i>'
      },

      attr: {
        class: 'd-style w-100 table text-dark-m1 border-y-1 brc-black-tp11 mb-0'
      },
      columns: {
        name: {
          title: 'Name',
          class: 'bgc-h-yellow-l3 p-0',
          type: 'custom',
          renderComponent: NameCellComponent
        },
        location: {
          title: 'Office',
          class: 'bgc-h-yellow-l3 p-0',
          type: 'custom',
          renderComponent: OfficeCellComponent
        },
        age: {
          title: 'Age',
          class: 'bgc-h-yellow-l3 p-0'
        },
        date: {
          title: 'Start Date',
          class: 'bgc-h-yellow-l3 p-0'
        },
        salary: {
          title: 'Salary',
          class: 'bgc-h-yellow-l3 p-0',
          type: 'custom',
          renderComponent: SalaryCellComponent
        }
      },
      pager: {
        perPageSelect: [5, 10, 20]
      }
    };

  }

  ngAfterViewInit() {
    try {
      //make thead sticky
      let thead = this.element.querySelector('ng2-smart-table').querySelector('thead')
      thead.classList.add('sticky-nav')
      thead.classList.add('text-dark-l4')

      // customize page select dropdown
      let select = this.element.querySelector('.ng2-smart-pagination-per-page select');
      select.classList.add('ace-select');
      select.style.width = '100px';
    } catch(e) {}
  }


  displayCreateRow() { 
    this.smartTable.grid.createFormShown = true
  }

}
