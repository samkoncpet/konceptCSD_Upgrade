import { Component, OnInit } from '@angular/core';import 
{ FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';

@Component({
  selector: 'app-newpackage',
  templateUrl: './newpackage.component.html',
  styleUrls: ['./newpackage.component.css']
})
export class NewpackageComponent implements OnInit {

  submitted = false;
  isUpdate = false;
  btntxt = "Submit";
  addpackage: FormGroup;
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

  ngOnInit(): void {
    this.addpackage = this._formBuilder.group({
      package: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      price: new FormControl('', [Validators.required, NumericValidator]),
      code: new FormControl('', Validators.required),
      is_active: new FormControl(true, Validators.required)
    });
  }

  addnewpackage(){
    this.submitted = true;
    if (!this.addpackage.valid) {
      return;
    }
    
    var url = this._appSettings.koncentAPI;
    var insertPackageAPI = this._appSettings.insertPackageAPI;
    url = url + insertPackageAPI;

    var data = {
      Package: this.addpackage.value.package,
      Price: this.addpackage.value.price,
      Code: this.addpackage.value.code,
      Is_Active: this.addpackage.value.is_active
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
    if (!this.addpackage.valid) {
      return;
    }
    
    var url = this._appSettings.koncentAPI;
    var updatePackageAPI = this._appSettings.updatePackageAPI;
    url = url + updatePackageAPI;

    var data = {
      Package_ID: this.param1,
      Package: this.addpackage.value.package,
      Price: this.addpackage.value.price,
      Code: this.addpackage.value.code,
      Is_Active: this.addpackage.value.is_active
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
    this.addpackage.reset();
  }

  get addpackageFormControl() {
    return this.addpackage.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addpackage, control);
  }

}
