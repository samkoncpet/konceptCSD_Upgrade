import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.css']
})
export class NewgroupComponent implements OnInit {

  submitted = false;
  isUpdate = false;
  btntxt = "Submit";
  addgroup: FormGroup;
  isPassword = true;
  passwordmatch = true;
  param1: string;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private _notificationsService: NotificationsService,
    private route: ActivatedRoute) {
      this.param1 = this.route.snapshot.params.id;
      if(this.param1!= undefined && this.param1 != ''){
        this.isUpdate = true;
        this.btntxt = "Update";
      }
    }

  checklist:any;
  checkedList:any;
    
  grouplist=[
    {id:1, Name:"Super Admin", Add:"true",Update:"true", View: true},
    {id:2, Name:"Customer", Add:"true",Update:"true", View: false},
    {id:3, Name:"Packages", Add:"true",Update:"true", View: false}
   ];

   // Get List of Checked Items
  getCheckedItemList(){
    this.checkedList  = [];
    for (var i = 0; i < this.grouplist.length; i++) {
      if(this.grouplist[i].View)
      this.grouplist.push(this.checklist[i]);
    }
    this.checkedList  = JSON.stringify(this.grouplist);
  }

  ngOnInit(): void {
    this.addgroup = this._formBuilder.group({
      name: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
      description: new FormControl('',[Validators.minLength(2), Validators.maxLength(50)])
    });
  }

  addnewpackage(){
    this.submitted = true;
    if (!this.addgroup.valid) {
      return;
    }
    
    var url = this._appSettings.koncentAPI;
    var insertPackageAPI = this._appSettings.insertPackageAPI;
    url = url + insertPackageAPI;

    var data = {
      Package: this.addgroup.value.name,
      Price: this.addgroup.value.description
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.cancel();
            this._notificationsService.success(response["sys_message"], "Success");
          }
          else {
            this._notificationsService.info(response["sys_message"], "info!");
          }
        },
          err => {
            console.log("status code--->" + err.status)
          });
  }

  updatepackage(){
    this.submitted = true;
    if (!this.addgroup.valid) {
      return;
    }
    
    var url = this._appSettings.koncentAPI;
    var updatePackageAPI = this._appSettings.updatePackageAPI;
    url = url + updatePackageAPI;

    var data = {
      Package_ID: this.param1,
      Package: this.addgroup.value.name,
      Price: this.addgroup.value.description
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._notificationsService.success(response["sys_message"], "Success");
          }
          else {
            this._notificationsService.info(response["sys_message"], "info!");
          }
        },
          err => {
            console.log("status code--->" + err.status)
          });
  }

  cancel(){
    this.addgroup.reset();
  }

  get addgroupFormControl() {
    return this.addgroup.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addgroup, control);
  }


}
