import { Component, OnInit } from '@angular/core';import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CommonAccessModule, UserAccessModule, OrganizationAccessModule, CustomersAccessModule, PackagesAccessModule, SettingsAccessModule } from '../../shared/models/user-access/user-access.model';
import { LocalstorageService } from '../../config/localstorage.service';
import { CommonfunctionsService } from '../functions/commonfunctions.service';

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
    private _localstorageService: LocalstorageService,
    private _commonfunctionsService: CommonfunctionsService) {    
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
}
