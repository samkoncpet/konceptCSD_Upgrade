import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { CommonAccessModule } from '../../../shared/models/user-access/user-access.model';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { LocalstorageService } from '../../../config/localstorage.service';
import { CellGrouplistComponent } from '../../../common/cell-grouplist/cell-grouplist.component';
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
    { field: 'Index', headerName: 'Sr. No.', sortable: true, editable: false, resizable: true, width: 100 },
    { field: 'Father_First_Name', headerName: 'Father First Name', sortable: true, editable: false, resizable: true },
    { field: 'Mother_First_Name', headerName: 'Mother First Name', sortable: true, editable: false, resizable: true, width: 100 },
    { field: 'Father_Cell_No', headerName: 'Father Cell No.', sortable: true, editable: false, resizable: true, width: 100 },
    { field: 'Mother_Cell_No', headerName: 'Mother Cell No.', sortable: true, editable: false, resizable: true, width: 100 },
    { field: 'Father_Email', headerName: 'Father Email', sortable: true, editable: false, resizable: true, width: 100 },
    { field: 'Country', headerName: 'Country', sortable: true, editable: false, resizable: true, width: 100 },
    { field: 'State', headerName: 'State', sortable: true, editable: false, resizable: true, width: 100 },
    { field: 'Is_Active',headerName: 'Status', sortable: true, editable: false, resizable: true, width: 100, cellRendererFramework: CellCustomActiveComponent},
    { field: 'User_Group_ID', headerName: 'Actions', cellRendererFramework: CellGrouplistComponent,
      cellRendererParams: {
        type: JSON.stringify(this.CommonAccessModule),
        editRouterLink: '/customer/update/',
        viewRouterLink: '/customer/view/',
        pageType: 'customer'
      } }
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
      User_ID: 0,
      Search: '',
      User_Type: "user",
      User_Group_ID: 0,
      Is_Active: true
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
      User_ID: this.searchForm.get('User_ID').value,
      Customer_ID: this.searchForm.get('Customer_ID').value,
      Search: this.searchForm.get('Search').value,
      State_ID: this.searchForm.get('State_ID').value,
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
