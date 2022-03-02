import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { CommonAccessModule, OrganizationAccessModule } from '../../../shared/models/user-access/user-access.model';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { LocalstorageService } from '../../../config/localstorage.service';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';


@Component({
  selector: 'app-requestlist',
  templateUrl: './requestlist.component.html',
  styleUrls: ['./requestlist.component.css']
})
export class RequestlistComponent implements OnInit {

  submitted = false;
  searchForm: FormGroup;
  public requestlist = [];
  public grouplist = [];
    
  public CommonAccessModule = new CommonAccessModule();
  public OrganizationAccessModule = new OrganizationAccessModule();

  columnDefs = [
    { field: 'Index', headerName: 'Sr. No.', sortable: true, editable: false, resizable: true, width: 100, maxWidth: 80, minWidth: 80, },
    { field: 'Subject', headerName: 'Subject', autoSizeColumns:false, sortable: true, wrapText: true, autoHeight: true, editable: false, resizable: true, width: 150, maxWidth: 200, minWidth: 200, },
    { field: 'CustomerPO', headerName: 'Customer-PO', autoSizeColumns:false, sortable: true, wrapText: true, autoHeight: true, editable: false, resizable: true, width: 150, maxWidth: 200, minWidth: 200, },
    { field: 'Status', headerName: 'Status', autoSizeColumns:false, sortable: true, wrapText: true, autoHeight: true, editable: false, resizable: true, width: 150, maxWidth: 200, minWidth: 200, },
    { field: 'CreatedBy', headerName: 'Created By', autoSizeColumns:false, sortable: true, wrapText: true, autoHeight: true, editable: false, resizable: true, width: 150, maxWidth: 200, minWidth: 200, },
  ]

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _localstorageService: LocalstorageService,
    private _ConfigurationService: ConfigurationService,
    private spinner: NgxSpinnerService,
    private _commonfunctionsService: CommonfunctionsService) { 
      this.CommonAccessModule = JSON.parse(this._localstorageService.localstorageGet("CommonAccess"));
      
    if(!this.CommonAccessModule.Is_Retrieve){
      this._ConfigurationService.logout();
    }
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      Customertext: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
      Subject: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
      CreatedBy: new FormControl('1', [Validators.minLength(2), Validators.maxLength(20)]),
      IsActive: new FormControl(true, Validators.required),
    });
    this.getUserGroup();
    //this.getRequestList();
  }
  getUserGroup(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var entityMasterAPI = this._appSettings.entityMasterAPI;
    url = url + entityMasterAPI;

    var data = {
      SQLFROM: "User_Group",
      SQLBY: "ByUser_Group"
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.grouplist = response["data"];
          }
          else {
            this.grouplist = [];
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
  getRequestList(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchUserAPI = this._appSettings.fetchUserAPI;
    url = url + fetchUserAPI;

    var data = {
      User_ID: null,
      Search: '',
      User_Type: 'Organization',
      User_Group_ID: null,
      Is_Active: null
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.requestlist = response["data"];
          }
          else {
            this.requestlist = [];
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
   filterRequestList(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchUserAPI = this._appSettings.fetchUserAPI;
    url = url + fetchUserAPI;

    var data = {
      User_ID: null,
      Search: this.searchForm.get('Customertext').value,
      User_Type: 'Organization',
      User_Group_ID: null,
      Is_Active: this._commonfunctionsService.getBoolean(this.searchForm.get('IsActive').value)
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            //this.requestlist = response["data"];
          }
          else {
            //this.requestlist = [];
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
   addRequest(){
    this.router.navigateByUrl('/request/add');
  }  
  reset(){
    this.searchForm.reset();
    this.filterRequestList();
   }
  get searchFormControl() {
    return this.searchForm.controls;
  }
  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.searchForm, control);
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

    this.lastId = this.requestlist.length;
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
     this.requestlist.splice(selectedRows[0].rowIndex + 1 , 0, row)
    }
    else {
      this.requestlist.push(row)
    }    
    this.gridApi.setRowData(this.requestlist)
  }

  removeRows() {
    let selectedRows = this.gridApi.getSelectedNodes()
    if (selectedRows.length == 0) return

    let removed = 0
    selectedRows.forEach((row: any) => {
      this.requestlist.splice(row.rowIndex - removed , 1)
      removed++
    })


    this.gridApi.setRowData(this.requestlist)
  }
  
  reloadData() {
    this.gridApi.setRowData(this.requestlist)
  }
}
