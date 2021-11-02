import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgAceModalService } from 'ng-ace-admin';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnDestroy {
  columnDefs = [
      { 
        field: 'checkbox',
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        // headerCheckboxSelectionFilteredOnly: false,
        width: 52 
      },
      { field: 'id', width: 64, headerName: 'ID', sortable: true, editable: false },
      { field: 'sdate', headerName: 'Last Sales', sortable: true, editable: true },
      { field: 'name', headerName: 'Name', sortable: true, editable: true },
      { field: 'stock', headerName: 'Stock', sortable: true, editable: true },
      { field: 'ship', headerName: 'Ship Via', sortable: true, editable: true },
      { field: 'note', headerName: 'Note', sortable: true, editable: true },   
  ]

  rowData = [
      {id:"1",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2017-12-13"},
      {id:"2",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2018-02-03"},
      {id:"3",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2016-01-17"},
      {id:"4",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2015-12-23"},
      {id:"5",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2019-08-06"},
      {id:"6",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2017-12-14"},
      {id:"7",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2016-06-20"},
      {id:"8",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2015-11-11"},
      {id:"9",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2009-02-10"},
      {id:"10",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
      {id:"11",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
      {id:"12",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
      {id:"13",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
      {id:"14",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
      {id:"15",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
      {id:"16",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
      {id:"17",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
      {id:"18",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
      {id:"19",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
      {id:"20",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
      {id:"21",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
      {id:"22",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
      {id:"23",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"}
  ]

  constructor(public modalService: NgAceModalService) { }


  private gridApi!: any

  lastId = 0
  currentPage: any;
  totalPages: any;
  itemPerPage : any = 10

  resizeCallback: any;

  onGridReady(params: any) {
    this.gridApi = params.api

    this.gridApi.sizeColumnsToFit()

    this.resizeCallback = () => {
      this.gridApi.sizeColumnsToFit()
    }
    window.addEventListener('resize', this.resizeCallback)

    this.currentPage = this.gridApi.paginationGetCurrentPage() + 1
    this.totalPages = this.gridApi.paginationGetTotalPages()

    this.lastId = this.rowData.length;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeCallback)
  }

  updatePerPage() {
    this.gridApi.paginationSetPageSize(Number(this.itemPerPage))
  }

  ///////

  gotoFirst() {
    this.gridApi.paginationGoToFirstPage()
  }

  gotoPrev() {
    this.gridApi.paginationGoToPreviousPage()
  }

  gotoLast() {
    this.gridApi.paginationGoToLastPage()
  }

  gotoNext() {
    this.gridApi.paginationGoToNextPage()
  }

  gotoPage() {
    let page = this.currentPage
    if (page < 1) page = 1
    if (page > this.totalPages) page = this.totalPages

    this.gridApi.paginationGoToPage(page - 1)
    this.currentPage = page
  }



  onPaginationChanged() {
    if (this.gridApi) {
      this.currentPage = this.gridApi.paginationGetCurrentPage() + 1
      this.totalPages = this.gridApi.paginationGetTotalPages()
    }
  }


  //


  newRow: any = {}

  addRow() {
    if (!this.newRow.name) return;
    let row: any = {...this.newRow}

    row['id'] = ++this.lastId;
    row.stock = row.stock ? "Yes" : "No"
    row.sdate = ""

    let selectedRows = this.gridApi.getSelectedNodes()
    if (selectedRows.length > 0) {
     this.rowData.splice(selectedRows[0].rowIndex + 1 , 0, row)
    }
    else {
      this.rowData.push(row)
    }    
    this.gridApi.setRowData(this.rowData)
  }


  removeRows() {
    let selectedRows = this.gridApi.getSelectedNodes()
    if (selectedRows.length == 0) return

    let removed = 0
    selectedRows.forEach((row: any) => {
      this.rowData.splice(row.rowIndex - removed , 1)
      removed++
    })


    this.gridApi.setRowData(this.rowData)
  }


  reloadData() {
    this.gridApi.setRowData(this.rowData)
  }
}
