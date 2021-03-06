import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { NgAceModalService } from 'ng-ace-admin';

import { CommonAccessModule, UserAccessModule, OrganizationAccessModule, CustomersAccessModule, PackagesAccessModule, SettingsAccessModule } from '../../shared/models/user-access/user-access.model';
import { LocalstorageService } from '../../config/localstorage.service';
import { CommonfunctionsService } from '../functions/commonfunctions.service';
import { ConfigurationService } from '../../config/configuration.service';
import { AppsettingsService } from '../../config/appsettings.service';
import { NgAceToasterService } from 'ng-ace-admin';
import { NotificationsService } from '../../config/notifications.service';
import { GrouplistComponent } from '../../pages/managegroup/grouplist/grouplist.component';

@Component({
  selector: 'app-cell-grouplist',
  templateUrl: './cell-grouplist.component.html',
  styleUrls: ['./cell-grouplist.component.css']
})
export class CellGrouplistComponent implements OnInit {
  data: any;
  params: any;
  id: string = "";
  Is_Predefined: boolean;
  

  public CommonAccessModule = new CommonAccessModule();
  public UserAccessModule = new UserAccessModule();
  public OrganizationAccessModule = new OrganizationAccessModule();
  public CustomersAccessModule = new CustomersAccessModule();
  public PackagesAccessModule = new PackagesAccessModule();
  public SettingsAccessModule = new SettingsAccessModule();

  constructor(private http: HttpClient, private router: Router,    
    private spinner: NgxSpinnerService,
    private _commonfunctionsService: CommonfunctionsService,
    private _appSettings: AppsettingsService,
    public _modalService: NgAceModalService,
    private _ConfigurationService: ConfigurationService,
    private _notificationsService: NotificationsService,
    public _grouplistComponent: GrouplistComponent) {    
  }
  agInit(params) {
    this.params = params;
    this.data = params.value;
    this.id = this.data; 
    this.Is_Predefined = this._commonfunctionsService.getBoolean(params.data.Is_Predefined);
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
    if(pageType === 'group') {
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var deleteUserGroupAPI = this._appSettings.deleteUserGroupAPI;
    url = url + deleteUserGroupAPI;
    
    var datagroup = {
      User_Group_ID : this.params.value,
      Is_Deleted: true
    }
    this._ConfigurationService.post(url, datagroup)
        .subscribe(response => { 
          if (response["response"] == 1) {   
            this._grouplistComponent.getUserGroup();
            document.getElementById('close').click();          
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
