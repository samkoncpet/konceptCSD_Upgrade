import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.css']
})
export class UsertypeComponent implements OnInit {

  submitted = false;
  isUpdate = false;
  btntxt = "Submit";
  addusertype: FormGroup;
  isPassword = true;
  passwordmatch = true;
  public usertypeList: [];
  
  constructor(
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private _notificationsService: NotificationsService) {
    }

  ngOnInit(): void {
    this.addusertype = this._formBuilder.group({
      user_type: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      is_active: new FormControl(true, Validators.required)
    });
    //this.getusertype();
  }

  getusertype(){
    var url = this._appSettings.koncentAPI;
    var getUserTypeAPI = this._appSettings.getUserTypeAPI;
    url = url + getUserTypeAPI;

    var data = {
      User_ID: 0,
      Search: "",
      User_Type_ID: 0,
      Is_Active: true
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.usertypeList = response["data"];
          }
          else {
           
          }
        },
          err => {
            console.log("status code--->" + err.status)
          });
  }

  addnewusertype(){
    this.submitted = true;
    if (!this.addusertype.valid) {
      return;
    }
    
    var url = this._appSettings.koncentAPI;
    var insertUserTypeAPI = this._appSettings.insertUserTypeAPI;
    url = url + insertUserTypeAPI;

    var data = {
      User_Type: this.addusertype.value.user_type,
      Is_Active: this.addusertype.value.is_active
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

  updateusertype(){
    this.submitted = true;
    if (!this.addusertype.valid) {
      return;
    }
    
    var url = this._appSettings.koncentAPI;
    var updatePackageAPI = this._appSettings.insertUpdatetPackageAPI;
    url = url + updatePackageAPI;

    var data = {
      Package: this.addusertype.value.package
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
    this.addusertype.reset();
  }

  get addusertypeFormControl() {
    return this.addusertype.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addusertype, control);
  }

}
