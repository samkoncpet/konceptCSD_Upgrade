import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { NgxSpinnerService } from "ngx-spinner";

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';

@Component({
  selector: 'app-neworganization',
  templateUrl: './neworganization.component.html',
  styleUrls: ['./neworganization.component.css']
})
export class NeworganizationComponent implements OnInit {

  submitted = false;
  addorganization: FormGroup;
  isPassword = true;
  passwordmatch = true;
  public countrylist = {};
  public statelist= {};

  constructor(
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private _notificationsService: NotificationsService,
    private spinner: NgxSpinnerService) {  }

  ngOnInit(): void {
    this.addorganization = this._formBuilder.group({
      fullname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      username: new FormControl('', [Validators.required, AlphaNumericValidator, Validators.minLength(2), Validators.maxLength(20)]),
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required),
      is_active: new FormControl(true, Validators.required),
      firstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, emailValidator]),
      mobile: new FormControl('', [Validators.required, NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      address: new FormControl('', [Validators.required, AlphaNumericValidator, Validators.minLength(2), Validators.maxLength(20)]),
      countryid: new FormControl(1, Validators.required),
      stateid: new FormControl('', Validators.required),
      city: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
    });
    this.getCountry();
  }

  getCountry(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var entityMasterAPI = this._appSettings.entityMasterAPI;
    url = url + entityMasterAPI;

    var data = {
      SQLFROM: "Country",
      SQLBY: "ByCountry"
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.countrylist = response["data"];
          }
          else {
            this.countrylist = {};
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
            console.log("status code--->" + err.status)
          });
   }
   geState(value:string){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var entityMasterAPI = this._appSettings.entityMasterAPI;
    url = url + entityMasterAPI;

    var data = {
      SQLFROM: "State",
      SQLBY: "ByCountry_ID_State",
      SQLPARAM: value
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.statelist = response["data"];
          }
          else {
            this.statelist = {};
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
            console.log("status code--->" + err.status)
          });
   }

  addneworganization(){
    this.submitted = true;
    if (!this.addorganization.valid) {
      return;
    }

    if (this.addorganization.get("password").value != this.addorganization.get("repassword").value) {
      this.passwordmatch = false;
    }

    /** spinner starts on init */
    this.spinner.show();

    var url = this._appSettings.koncentAPI;
    var insertUpdateUserAPI = this._appSettings.insertUpdateUserAPI;
    url = url + insertUpdateUserAPI;
    var data = {
      User_Type: "Organization",
      FullName: this.addorganization.value.fullname,
      Username: this.addorganization.value.username,
      Password: this.addorganization.value.password,
      Is_Active: this.addorganization.value.is_active,
      FirstName: this.addorganization.value.firstname,
      LastName: this.addorganization.value.lastname,
      Email: this.addorganization.value.email,
      MobileNo: this.addorganization.value.mobile,
      Address: this.addorganization.value.address,
      Country_ID: this.addorganization.value.mobile,
      State_ID: this.addorganization.value.stateid,
      City: this.addorganization.value.city,
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._notificationsService.showSuccess("Success", response["data"]["0"].message);
            this.cancel();
          }
          else {
            this._notificationsService.showWarning("warning", response["sys_message"]);
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
          });
  }
  onPasswordChange(){
    if (this.addorganization.get("password").value == this.addorganization.get("repassword").value) {
      this.passwordmatch = true;
    } else {
      this.passwordmatch = false;
    }
  }
  cancel(){
    this.addorganization.reset();
    this.statelist = {};
  }

  get addorganizationFormControl() {
    return this.addorganization.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addorganization, control);
  }

}
