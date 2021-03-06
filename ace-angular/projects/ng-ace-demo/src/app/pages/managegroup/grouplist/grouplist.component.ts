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
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {

  searchForm: FormGroup;
  public grouplist = [];
    
  public CommonAccessModule = new CommonAccessModule();

  columnDefs = [
    { field: 'Index', headerName: 'Sr. No.', sortable: true, editable: false, resizable: true, width: 100, maxWidth: 100, minWidth: 100, },
    { field: 'User_Group_Name', headerName: 'Group Name', sortable: true, editable: false, resizable: true, width: 100, maxWidth: 200, minWidth: 200, },
    { field: 'Predefined_Status', headerName: 'Predefined Status', sortable: true, editable: false, resizable: true, width: 100, maxWidth: 200, minWidth: 200, },
    { field: 'Is_Active',headerName: 'Status', sortable: true, editable: false, resizable: true, width: 100, cellRendererFramework: CellCustomActiveComponent, maxWidth: 200, minWidth: 200, },
    { field: 'User_Group_ID', headerName: 'Actions', cellRendererFramework: CellGrouplistComponent,
      cellRendererParams: {
        type: JSON.stringify(this.CommonAccessModule),
        editRouterLink: '/group/update/',
        viewRouterLink: '/group/view/',
        pageType: 'group'
      }, maxWidth: 200, minWidth: 200, }
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
      groupid: new FormControl('', Validators.required),
      searchtext: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
      is_active: new FormControl(true, Validators.required),
    });
    this.getUserGroup();
  }
  getUserGroup(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchusergroup = this._appSettings.fetchusergroup;
    url = url + fetchusergroup;

    var data = {
      User_Group_ID: 0,
      Search: "",
      Is_Predefined: null,
      Is_Active: null
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
   filterGrouplist(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchusergroup = this._appSettings.fetchusergroup;
    url = url + fetchusergroup;

    var data = {
      User_Group_ID: 0,
      Search: this.searchForm.get('searchtext').value,
      Is_Predefined: null,
      Is_Active: this._commonfunctionsService.getBoolean(this.searchForm.get('is_active').value)
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
  addgroup(){
    this.router.navigateByUrl('/group/add');
  }

  reset(){
    this.searchForm.reset();
    this.getUserGroup();
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

    this.lastId = this.grouplist.length;
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
     this.grouplist.splice(selectedRows[0].rowIndex + 1 , 0, row)
    }
    else {
      this.grouplist.push(row)
    }    
    this.gridApi.setRowData(this.grouplist)
  }

  removeRows() {
    let selectedRows = this.gridApi.getSelectedNodes()
    if (selectedRows.length == 0) return

    let removed = 0
    selectedRows.forEach((row: any) => {
      this.grouplist.splice(row.rowIndex - removed , 1)
      removed++
    })


    this.gridApi.setRowData(this.grouplist)
  }
  
  reloadData() {
    this.gridApi.setRowData(this.grouplist)
  }
}
