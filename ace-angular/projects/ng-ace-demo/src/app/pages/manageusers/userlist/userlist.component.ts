import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';

import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  public userlist = [];
  public userlistlength = 0;
  public grouplist = [];

  Search_User_ID: number = 0; 
  Search: string = ""; 
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
    this.getUserList();
   }
   SearchByUserGroup(value:string){
    this.Search_User_Group_ID = parseInt(value);
    this.getUserList();
   }
   SearchByIsActive(value:boolean){
    this.Search_Is_Active = value;
    this.getUserList();
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
      Search: this.Search,
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
}
