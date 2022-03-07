import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { CommonAccessModule } from '../../../shared/models/user-access/user-access.model';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { LocalstorageService } from '../../../config/localstorage.service';
import { CellCustomCustomerslistComponent } from '../../../common/cell-custom-customerslist/cell-custom-customerslist.component';
import { CellCustomCustomerslistModalComponent } from '../../../common/cell-custom-customerslist-modal/cell-custom-customerslist-modal.component';
import { CellCustomActiveComponent } from '../../../common/cell-custom-active/cell-custom-active.component';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';

@Component({
  selector: 'app-customerslist',
  templateUrl: './customerslist.component.html',
  styleUrls: ['./customerslist.component.css']
})
export class CustomerslistComponent implements OnInit {

  searchForm: FormGroup;
  public customerlist = [];
  public userlist = [];
    
  public CommonAccessModule = new CommonAccessModule();

  columnDefs = [
    { field: 'Index', headerName: 'Sr. No.', sortable: true, wrapText: true, resizable: true, maxWidth: 80, minWidth: 80, },
    { field: 'PONO', headerName: 'PONO', sortable: true, wrapText: true, resizable: true, maxWidth: 150, minWidth: 150, },
    { field: 'Father_FullName', headerName: 'Father Full Name', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true, maxWidth: 150, minWidth: 150, },
    { field: 'Father_Email', headerName: 'Father Email', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true, maxWidth: 150, minWidth: 150, },
    { field: 'Father_MobileNo', headerName: 'Father Mobile No', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true, maxWidth: 150, minWidth: 150, },
    { field: 'Mother_FullName', headerName: 'Mother Full Name', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true, maxWidth: 150, minWidth: 150, },
    // { field: 'Mother_Email', headerName: 'Mother Email', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true, maxWidth: 200, minWidth: 200, },
    // { field: 'Mother_MobileNo', headerName: 'Mother Mobile No', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true, maxWidth: 200, minWidth: 200, },
    // { field: 'Country', headerName: 'Country', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true, maxWidth: 200, minWidth: 200, },
    // { field: 'State', headerName: 'State', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true, maxWidth: 200, minWidth: 200, },
    // { field: 'Address', headerName: 'Address', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true, maxWidth: 200, minWidth: 200, },
    { field: 'Is_Active',headerName: 'Status', autoSizeColumns:false, sortable: true, wrapText: true, editable: false, resizable: true,  cellRendererFramework: CellCustomActiveComponent, maxWidth: 150, minWidth: 150, },
    // { field: 'Customer_ID', headerName: 'View', cellRendererFramework: CellCustomCustomerslistModalComponent,
    //   cellRendererParams: {
    //     type: JSON.stringify(this.CommonAccessModule),
    //     editRouterLink: '/customer/update/',
    //     viewRouterLink: '/customer/view/',
    //     pageType: 'customer'
    //   }, resizable: true, maxWidth: 200, minWidth: 200, },
    { field: 'Customer_ID', headerName: 'Actions', cellRendererFramework: CellCustomCustomerslistComponent,
      cellRendererParams: {
        type: JSON.stringify(this.CommonAccessModule),
        editRouterLink: '/customer/update/',
        viewRouterLink: '/customer/view/',
        pageType: 'customer'
      }, resizable: true, maxWidth: 200, minWidth: 200, },
  ]

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _localstorageService: LocalstorageService,
    private _ConfigurationService: ConfigurationService,
    private spinner: NgxSpinnerService,
    private _commonfunctionsService: CommonfunctionsService) { 
      this.CommonAccessModule = JSON.parse(this._localstorageService.localstorageGet("CommonAccess"));
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      User_ID: new FormControl(''),
      Customer_ID: new FormControl(0),
      Search: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
      State_ID: new FormControl(0),
      Is_Active: new FormControl(true, Validators.required),
    });
    this.getUserList();
    this.filterCustomerList();
  }
  getUserList(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchUserAPI = this._appSettings.fetchUserAPI;
    url = url + fetchUserAPI;

    var data = {
      Customer_ID: 0,
      Search: '',
      Organization_User_ID: 0,
      State_ID: 0,
      Package_ID: 0,
      Is_Active: this._commonfunctionsService.getBoolean(this.searchForm.get('Is_Active').value)
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.userlist = response["data"];
          }
          else {
            this.userlist = [];
          }
          this.spinner.hide();
        },
        (error) => {
            this.spinner.hide();
            this._commonfunctionsService.exactionLog(error.status, error.message);
        },
        () => {
          this.spinner.hide();
        });
   }
   filterCustomerList(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchcustomerAPI = this._appSettings.fetchcustomerAPI;
    url = url + fetchcustomerAPI;

    var data = {
      Organization_User_ID: this.searchForm.get('User_ID').value,
      Customer_ID: this.searchForm.get('User_ID').value,
      Search: this.searchForm.get('Search').value,
      State_ID: 0,
      Package_ID: 0,
      Is_Active: this._commonfunctionsService.getBoolean(this.searchForm.get('Is_Active').value)
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.customerlist = response["data"];
          }
          else {
            this.customerlist = [];
          }
          this.spinner.hide();
        },
        (error) => {
            this.spinner.hide();
            this._commonfunctionsService.exactionLog(error.status, error.message);
        },
        () => {
          this.spinner.hide();
        });
   }

   addnewcustomer(){
     this.router.navigateByUrl('/customer/add');
   }

  reset(){
    this.searchForm.reset();
    this.filterCustomerList();
   }
  // Pagination table code
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

    this.lastId = this.customerlist.length;
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
     this.customerlist.splice(selectedRows[0].rowIndex + 1 , 0, row)
    }
    else {
      this.customerlist.push(row)
    }    
    this.gridApi.setRowData(this.customerlist)
  }

  removeRows() {
    let selectedRows = this.gridApi.getSelectedNodes()
    if (selectedRows.length == 0) return

    let removed = 0
    selectedRows.forEach((row: any) => {
      this.customerlist.splice(row.rowIndex - removed , 1)
      removed++
    })


    this.gridApi.setRowData(this.customerlist)
  }
  
  reloadData() {
    this.gridApi.setRowData(this.customerlist)
  }
}
