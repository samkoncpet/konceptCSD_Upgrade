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
  public packagelist = [];
  public organizationlist = [];
  public organizationlistlength = 0;
  public grouplist = [];
    
  public CommonAccessModule = new CommonAccessModule();
  public OrganizationAccessModule = new OrganizationAccessModule();

  columnDefs = [
    { field: 'Index', headerName: 'Sr. No.', sortable: true, editable: false, resizable: true, width: 100 },
    { field: 'Username', headerName: 'Customer ID', sortable: true, editable: false, resizable: true },
    { field: 'FullName', headerName: 'First Name', sortable: true, editable: false, resizable: true },
    { field: 'Email', headerName: 'Last name', sortable: true, editable: false, resizable: true },
    { field: 'MobileNo', headerName: 'CS Last Call', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'MobileNo', headerName: 'Last TV', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'MobileNo', headerName: 'Next TV', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'Is_Active',headerName: 'Package', sortable: true, editable: false, resizable: true, width: 150 },
    { field: 'Package_ID', headerName: 'Actions', cellRendererFramework: CellCustomSessionlistComponent,
      cellRendererParams: {
        type: JSON.stringify(this.CommonAccessModule),
        editRouterLink: '/session/addsession/',
        pageType: 'session'
      }, maxWidth: 200, minWidth: 200 }
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
      search: new FormControl(''),
      iscancelrequest: new FormControl(true)
    });
  }

  search(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchpackage = this._appSettings.fetchpackage;
    url = url + fetchpackage;
    this.spinner.hide();
   }
   addsession(){
    this.router.navigateByUrl('/session/add');
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

    this.lastId = this.organizationlist.length;
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
     this.organizationlist.splice(selectedRows[0].rowIndex + 1 , 0, row)
    }
    else {
      this.organizationlist.push(row)
    }    
    this.gridApi.setRowData(this.organizationlist)
  }

  removeRows() {
    let selectedRows = this.gridApi.getSelectedNodes()
    if (selectedRows.length == 0) return

    let removed = 0
    selectedRows.forEach((row: any) => {
      this.organizationlist.splice(row.rowIndex - removed , 1)
      removed++
    })


    this.gridApi.setRowData(this.organizationlist)
  }
  
  reloadData() {
    this.gridApi.setRowData(this.organizationlist)
  }

}
