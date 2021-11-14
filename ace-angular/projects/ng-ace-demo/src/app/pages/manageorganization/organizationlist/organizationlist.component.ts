import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';

@Component({
  selector: 'app-organizationlist',
  templateUrl: './organizationlist.component.html',
  styleUrls: ['./organizationlist.component.css']
})
export class OrganizationlistComponent implements OnInit {

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
      SQLBY: "ByOrganization"
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

   addorganization(){
    this.router.navigateByUrl('/addorganization');
  }

}
