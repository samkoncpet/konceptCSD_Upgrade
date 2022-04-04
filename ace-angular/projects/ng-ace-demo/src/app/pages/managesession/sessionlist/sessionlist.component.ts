import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { CommonAccessModule, OrganizationAccessModule } from '../../../shared/models/user-access/user-access.model';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { LocalstorageService } from '../../../config/localstorage.service';
import { CellCustomSessionlistComponent } from '../../../common/cell-custom-sessionlist/cell-custom-sessionlist.component';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';


@Component({
  selector: 'app-sessionlist',
  templateUrl: './sessionlist.component.html',
  styleUrls: ['./sessionlist.component.css']
})
export class SessionlistComponent implements OnInit {

  submitted = false;
  searchForm: FormGroup;
  public dueSessionList = [];

  public CommonAccessModule = new CommonAccessModule();
  public OrganizationAccessModule = new OrganizationAccessModule();

  columnDefs = [
    { field: 'Index', headerName: 'Sr. No.', sortable: true, editable: false, resizable: true, width: 100 },
    { field: 'PONO', headerName: 'PO NO.', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'Father_FirstName', headerName: 'Father Name', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'Mother_FullName', headerName: 'Mother Name', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'Last_CS_Call_Date', headerName: 'CS Last Call', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'Last_TV_Date', headerName: 'Last TV', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'Next_TV_Date', headerName: 'Next TV', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'Package',headerName: 'Package', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'User_ID', headerName: 'Actions', resizable: true, cellRendererFramework: CellCustomSessionlistComponent,
      cellRendererParams: {
        type: JSON.stringify(this.CommonAccessModule),
        editRouterLink: '/session/add/',
        viewRouterLink: '/session/add/',
        pageType: 'duesession'
      }, maxWidth: 200, minWidth: 200, },
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
      Search: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
      Is_Show_Cancel_Request: new FormControl(true, Validators.required)
    });
    this.getPackageList();
  }

  getPackageList(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchcustomerduesession = this._appSettings.fetchcustomerduesessionAPI;
    url = url + fetchcustomerduesession;

    var data = {
      Package_ID: 0,
      Search: '',
      Is_Show_Cancel_Request: 0,
      Next_TV: 0
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.dueSessionList = response["data"];
          }
          else {
            this.dueSessionList = [];
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
   filterSessionList(){
     /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchcustomerduesession = this._appSettings.fetchcustomerduesessionAPI;
    url = url + fetchcustomerduesession;

    var data = {
      Package_ID: 0,
      Search: this.searchForm.get('Search').value,
      Is_Show_Cancel_Request: this.searchForm.get('Is_Show_Cancel_Request').value,
      Next_TV: 0
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.dueSessionList = response["data"];
          }
          else {
            this.dueSessionList = [];
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
  reset(){
    this.searchForm.reset();
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

    this.lastId = this.dueSessionList.length;
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
     this.dueSessionList.splice(selectedRows[0].rowIndex + 1 , 0, row)
    }
    else {
      this.dueSessionList.push(row)
    }
    this.gridApi.setRowData(this.dueSessionList)
  }

  removeRows() {
    let selectedRows = this.gridApi.getSelectedNodes()
    if (selectedRows.length == 0) return

    let removed = 0
    selectedRows.forEach((row: any) => {
      this.dueSessionList.splice(row.rowIndex - removed , 1)
      removed++
    })


    this.gridApi.setRowData(this.dueSessionList)
  }

  reloadData() {
    this.gridApi.setRowData(this.dueSessionList)
  }

}
