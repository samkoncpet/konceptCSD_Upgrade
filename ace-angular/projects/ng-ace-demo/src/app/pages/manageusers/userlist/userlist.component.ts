import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  public userlist = [];
  public userlistlength = 0;

  constructor(private router: Router,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private spinner: NgxSpinnerService) { 
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var entityMasterAPI = this._appSettings.entityMasterAPI;
    url = url + entityMasterAPI;

    var data = {
      SQLFROM: "User",
      SQLBY: "ByUser"
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
            console.log("status code--->" + err.status)
          });
   }

  addnewuser(){
    this.router.navigateByUrl('/addnewuser');
  }
}
