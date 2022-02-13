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
  selector: 'app-cell-custom-customerslist-modal',
  templateUrl: './cell-custom-customerslist-modal.component.html',
  styleUrls: ['./cell-custom-customerslist-modal.component.css']
})
export class CellCustomCustomerslistModalComponent implements OnInit {
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
    private _customerslistComponent: CustomerslistComponent) {    
  }
  agInit(params) {
    this.params = params;
    this.data = params.value;
    this.id = this.data; 
  }
  ngOnInit() {
    
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
}
