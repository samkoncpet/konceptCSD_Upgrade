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
import { CustomerslistComponent } from '../../pages/managecustomers/customerslist/customerslist.component';

@Component({
  selector: 'app-cell-custom-customerslist',
  templateUrl: './cell-custom-customerslist.component.html',
  styleUrls: ['./cell-custom-customerslist.component.css']
})
export class CellCustomCustomerslistComponent implements OnInit {
  data: any;
  params: any;
  id: string = "";
  public userDetail = [];

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
    private _customerslistComponent: CustomerslistComponent) {    
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

  openView(content: any, id?: any, options?: any) { 
    this._modalService.open(content, options)
    this.getUserDetail(id);
  }

  getUserDetail(id?: any){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchcustomerAPI = this._appSettings.fetchcustomerAPI;
    url = url + fetchcustomerAPI;

    var data = {
      User_ID: '',
      Customer_ID: id,
      Search: ''
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.userDetail = response["data"][0];
          }
          else {
            this.userDetail = [];
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
  delete(){
    let pageType = this.params.pageType;
    if(pageType === 'organization') {
      /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var deleteUserAPI = this._appSettings.deleteUserAPI;
    url = url + deleteUserAPI;
    
    var datauser = {
      Package_ID: this.params.value,
      Is_Deleted: true
    }
    this._ConfigurationService.post(url, datauser)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._customerslistComponent.getUserList();  
            this._notificationsService.showSuccessSmallDelay("Success", response["data"][0]["message"]);
          }        
          document.getElementById('close').click();          
          document.getElementById('grid').click();    
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
