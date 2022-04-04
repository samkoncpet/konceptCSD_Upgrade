import { ManagerequestComponent } from './../../pages/managerequest/newrequest/managerequest.component';
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
import { SessionlistComponent } from '../../pages/managesession/sessionlist/sessionlist.component';

@Component({
  selector: 'app-cell-custom-sessionlist',
  templateUrl: './cell-custom-sessionlist.component.html',
  styleUrls: ['./cell-custom-sessionlist.component.css']
})
export class CellCustomSessionlistComponent implements OnInit {
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
    public _sessionlistComponent: SessionlistComponent) {
  }
  agInit(params) {
    this.params = params;
    this.data = params.data;
    this.id = this.data.Customer_ID;
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

  open(content: any, options?: any) {
    this._notificationsService.toasterModalOpen(content, options)
  }
}
