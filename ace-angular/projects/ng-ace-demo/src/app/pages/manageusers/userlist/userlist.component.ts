import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NgAceModalService } from 'ng-ace-admin';

import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { UserAccessModule } from '../../../shared/models/user-access/user-access.model';

import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { LocalstorageService } from '../../../config/localstorage.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  public isProcessing = false;
  
  submitted = false;
  searchForm: FormGroup;
  public userlist = [];
  public userlistlength = 0;
  public grouplist = [];
 
  public UserAccessModule = new UserAccessModule();

  Search_User_ID: number = 0; 
  Search_text: string = ""; 
  Search_User_Type: string = ""; 
  Search_User_Group_ID: number = 0; 
  Search_Is_Active: boolean = null;

  columnDefs = [
    // { 
    //   field: 'checkbox',
    //   headerName: '',
    //   checkboxSelection: true,
    //   headerCheckboxSelection: true,
    //   // headerCheckboxSelectionFilteredOnly: false,
    //   width: 52 
    // },
    { field: 'Index', headerName: 'Sr. No.', sortable: true, editable: false, },
    { field: 'User_Group_Name', headerName: 'Group', sortable: true, editable: false },
    { field: 'Username', headerName: 'User Name', sortable: true, editable: false },
    { field: 'FullName', headerName: 'Full Name', sortable: true, editable: false },
    { field: 'Email', headerName: 'Email', sortable: true, editable: false },
    { field: 'MobileNo', headerName: 'Mobile No.', sortable: true, editable: false } ,
    { field: 'Is_Active', headerName: 'Is Active', sortable: true, editable: false } 
]

rowData = [
    // {id:"1",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2017-12-13"},
    // {id:"2",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2018-02-03"},
    // {id:"3",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2016-01-17"},
    // {id:"4",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2015-12-23"},
    // {id:"5",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2019-08-06"},
    // {id:"6",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2017-12-14"},
    // {id:"7",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2016-06-20"},
    // {id:"8",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2015-11-11"},
    // {id:"9",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2009-02-10"},
    // {id:"10",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
    // {id:"11",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
    // {id:"12",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
    // {id:"13",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
    // {id:"14",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
    // {id:"15",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
    // {id:"16",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
    // {id:"17",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
    // {id:"18",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
    // {id:"19",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
    // {id:"20",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
    // {id:"21",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
    // {id:"22",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
    // {id:"23",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"}
]
  
  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _localstorageService: LocalstorageService,
    private _ConfigurationService: ConfigurationService,
    private spinner: NgxSpinnerService,
    public modalService: NgAceModalService) { 
      this.UserAccessModule = JSON.parse(this._localstorageService.localstorageGet("UserAccess"));
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      groupid: new FormControl(''),
      searchtext: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
      is_active: new FormControl(true),
    });
    this.getUserList();
    this.getUserGroup();
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
          err => {
            this.spinner.hide();
          });
   }
   SearchByUsertype(value:string){
    this.Search_User_Type = value;
   }
   SearchByUserGroup(value:string){
    this.Search_User_Group_ID = parseInt(value);
   }
   SearchByIsActive(value:boolean){
    this.Search_Is_Active = value;
   }
   SearchByText(value:string){
    this.Search_text = value;
   }
   SearchUserList(){
     this.getUserList();
   }
   getUserList(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchUserAPI = this._appSettings.fetchUserAPI;
    url = url + fetchUserAPI;

    var data = {
      User_ID: this.Search_User_ID,
      Search: this.Search_text,
      User_Type: this.Search_User_Type,
      User_Group_ID: this.Search_User_Group_ID,
      Is_Active: this.Search_Is_Active
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
          err => {
            this.spinner.hide();
          });
   }

   filterUserList(){
    this.submitted = true;
    if (!this.searchForm.valid) {
      return;
    }
    this.getUserList();
   }
   reset(){
    this.searchForm.reset();
   }
  addnewuser(){
    this.router.navigateByUrl('/addnewuser');
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

    this.lastId = this.userlist.length;
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
     this.userlist.splice(selectedRows[0].rowIndex + 1 , 0, row)
    }
    else {
      this.userlist.push(row)
    }    
    this.gridApi.setRowData(this.userlist)
  }


  removeRows() {
    let selectedRows = this.gridApi.getSelectedNodes()
    if (selectedRows.length == 0) return

    let removed = 0
    selectedRows.forEach((row: any) => {
      this.userlist.splice(row.rowIndex - removed , 1)
      removed++
    })


    this.gridApi.setRowData(this.userlist)
  }


  reloadData() {
    this.gridApi.setRowData(this.userlist)
  }
}
