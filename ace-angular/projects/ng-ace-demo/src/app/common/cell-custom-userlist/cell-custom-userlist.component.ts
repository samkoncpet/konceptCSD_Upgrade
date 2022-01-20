import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { NgAceModalService } from 'ng-ace-admin';

import { CommonAccessModule, UserAccessModule, OrganizationAccessModule, CustomersAccessModule, PackagesAccessModule, SettingsAccessModule } from '../../shared/models/user-access/user-access.model';
import { LocalstorageService } from '../../config/localstorage.service';
import { ConfigurationService } from '../../config/configuration.service';
import { AppsettingsService } from '../../config/appsettings.service';
import { NgAceToasterService } from 'ng-ace-admin';
import { NotificationsService } from '../../config/notifications.service';
import { UserlistComponent } from '../../pages/manageusers/userlist/userlist.component';

@Component({
  selector: 'app-cell-custom-userlist',
  templateUrl: './cell-custom-userlist.component.html',
  styleUrls: ['./cell-custom-userlist.component.css']
})
export class CellCustomUserlistComponent implements OnInit {
  data: any;
  params: any;
  id: string = "";

  public CommonAccessModule = new CommonAccessModule();
  public UserAccessModule = new UserAccessModule();
  public OrganizationAccessModule = new OrganizationAccessModule();
  public CustomersAccessModule = new CustomersAccessModule();
  public PackagesAccessModule = new PackagesAccessModule();
  public SettingsAccessModule = new SettingsAccessModule();

  constructor(private http: HttpClient, private router: Router,    
    private _localstorageService: LocalstorageService,
    private toasterService: NgAceToasterService,
    private spinner: NgxSpinnerService,
    private _appSettings: AppsettingsService,
    public _modalService: NgAceModalService,
    private _ConfigurationService: ConfigurationService,
    private _notificationsService: NotificationsService,
    public _userlistComponent: UserlistComponent) {    
  }
  agInit(params) {
    this.params = params;
    this.data = params.value;
    this.id = this.data; 
  }
  ngOnInit() {
    this.getAccessModel();
  }

  getAccessModel(){
    this.CommonAccessModule = JSON.parse(this.params.type);
  }

  editRow() {
    let rowData = this.params.value;
    let i = rowData.rowIndex;   
    this.id = rowData; 
  }

  viewRow() {
    let rowData = this.params.value;
    this.id = rowData;
  }

  open(content: any, options?: any) { 
    this._notificationsService.toasterModalOpen(content, options)
  }

  delete(){
    let pageType = this.params.pageType;
    if(pageType === 'user') {
      /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var deleteUserAPI = this._appSettings.deleteUserAPI;
    url = url + deleteUserAPI;
    
    var datauser = {
        User_ID: this.params.value,
        Is_Deleted: true
    }
    this._ConfigurationService.post(url, datauser)
        .subscribe(response => {
          if (response["response"] == 1) {
          this._userlistComponent.getUserList();          
          document.getElementById('close').click();          
          document.getElementById('grid').click();        
          debugger
          this._notificationsService.showSuccessSmallDelay("Success", response["data"][0]["message"]);
          }
          this.spinner.hide();
        },
        (error) => {
            this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        });
    }
  }
}
