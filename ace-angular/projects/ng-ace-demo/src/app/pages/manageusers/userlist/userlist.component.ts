import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public grievanceHistoryList: Array<IGrievanceHistoryListResponse> = {} as Array<IGrievanceHistoryListResponse>;
  public dataSource = new MatTableDataSource<IGrievanceHistoryListResponse>();
  public isProcessing = false;


  public userlist = [];
  public userlistlength = 0;
  public grouplist = [];

  Search_User_ID: number = 0; 
  Search_text: string = ""; 
  Search_User_Type: string = ""; 
  Search_User_Group_ID: number = 0; 
  Search_Is_Active: boolean = null;
  
  constructor(private router: Router,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private spinner: NgxSpinnerService) { 
  }

  ngOnInit(): void {
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

  addnewuser(){
    this.router.navigateByUrl('/addnewuser');
  }


  /////////////////////////////////////////
  public tableColumns: string[] = ['grievance_id', 'status', 'title', 'date', 'department', 'action'];
  public tableOptions: TableSortingInterface = {
    total: 0,
    pageIndex: 0,
    previousPageIndex: 0,
    pageSize: 10,
    sortOption: {
      active: 'grievance_id',
      direction: 'asc'
    },
    searchBy: '',
    searchValue: ''
  };

  public searchByOptions: { text: string, value: string, type: string }[] = [
    { text: 'None', value: '', type: '' },
    { text: 'Grievance Id', value: 'grievance_id', type: 'text' },
    { text: 'Status', value: 'status', type: 'text' },
    { text: 'Title', value: 'title', type: 'text' },
    { text: 'Department', value: 'department', type: 'text' },
  ];
  private resetTable(): void {
    this.grievanceHistoryList = [];
    this.tableOptions = this.generateTableOptions(this.grievanceHistoryList);
    this.dataSource = new MatTableDataSource(this.grievanceHistoryList);
  }


  private generateTableOptions(data?: any): any {
    if (data) {
      const total = data.length > 0 ? data[0].total_count : 0;
      return {
        total,
        pageIndex: (this.tableOptions.searchValue && total <= this.tableOptions.pageSize) ? 0 : this.tableOptions.pageIndex,
        previousPageIndex: (this.tableOptions.searchValue && total <= this.tableOptions.pageSize) ? 0 : this.tableOptions.previousPageIndex,
        pageSize: this.tableOptions.pageSize,
        sortOption: {
          active: this.tableOptions.sortOption.active,
          direction: this.tableOptions.sortOption.direction
        },
        searchBy: this.tableOptions.searchBy,
        searchValue: this.tableOptions.searchValue
      };
    }
    else {
      return {
        total: 0,
        pageIndex: 0,
        previousPageIndex: 0,
        pageSize: this.tableOptions.pageSize,
        sortOption: {
          active: this.tableOptions.sortOption.active,
          direction: this.tableOptions.sortOption.direction
        },
        searchBy: this.tableOptions.searchBy,
        searchValue: this.tableOptions.searchValue
      };
    }
  }
  paginateApplications(event: PageEvent): PageEvent {

    this.tableOptions.pageIndex = event.pageIndex;
    this.tableOptions.previousPageIndex = event.previousPageIndex ?? 0;
    this.tableOptions.pageSize = event.pageSize;

    return event;
  }

  sortGrievances(event: any): void {
    let direction: string;
    if (this.tableOptions.sortOption.active === event.active) { direction = this.tableOptions.sortOption.direction === 'asc' ? 'desc' : 'asc'; }
    else { direction = event.direction === 'asc' ? 'desc' : 'asc'; }

    this.tableOptions.sortOption = { active: event.active, direction };

  }

  searchGrievances(event: Event, searchBy: string): void {

    this.tableOptions = this.generateTableOptions();
    this.tableOptions.searchBy = searchBy;
    this.tableOptions.searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  clearSearch(): void {
    this.tableOptions.searchBy = '';
  }

}

export interface TableSortingInterface {
  total: number;
  pageIndex: number;
  previousPageIndex: number;
  pageSize: number;
  sortOption: {
      active: string;
      direction: string;
  };
  searchBy: string;
  searchValue: string;
}


export interface TableInterface {
  total: number;
  pageIndex: number;
  previousPageIndex: number;
  pageSize: number;
}

export interface IGrievanceHistoryListRequest {
  page_number: number;
  page_size: number;
  sort_by: string;
  sort_order: string;
  search_by: string;
  search_value: string;
}

export interface IGrievanceHistoryListResponse {
  Grievance_ID: string;
  Application_Title: string;
  Application_Description: string;
  Application_District: string;
  Application_Department: string;
  Citizen_EA_User_ID: string;
  Citizen_Name: string;
  Citizen_Email: string;
  Citizen_Mobile_No: string;
  Citizen_Address: string;
  Citizen_District: string;
  Citizen_District_ID: string;
  Citizen_Village: string;
  Citizen_State: string;
  Citizen_State_ID: string;
  Citizen_Pincode: string;
  Citizen_Type: string;
  Previous_Grievance: string;
  Otp: string;
  Is_Otp_Verified: string;
  Color: string;
  Overdue_Flag: string;
  current_sla: string;
  Sub_Category_ID: string;
  Created_On: string;
  Current_Application_Status: string;
  Current_Assigned_User: string;
  Assigned_To_User_On: string;
  Category_ID: string;
  Application_Department_Name: string;
  Application_District_Name: string;
  Flow_Type: string;
  Nodel_Officer_ID: string;
  Origin_Officer_ID: string;
  Origin_Type: string;
  Request_type: string;
  System_type: string;
  Citizen_Village_ID: string;
  Citizen_Tehsil: string;
  Citizen_Tehsil_ID: string;
  Citizen_Municipality: string;
  Citizen_Municipality_ID: string;
  submittedby: string;
  Reapeal_one: string;
  Reapealone_on: string;
  Reapeal_two: string;
  Reapealtwo_on: string;
  Reappeal_state: string;
  Location_type: string;
  Process_Id: string;
  Current_Stage: string;
  Previous_Process_Id: string;
  CPGrievance: string;
  Grievance_level: string;
  NFSAGrievanceId: string;
  Init_Application_District: string;
  total_count: string;
}
