import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { NgxSpinnerService } from "ngx-spinner";

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';
import { ErrorHandlerService } from '../../../common/errorhandler/error-handler.service';

@Component({
  selector: 'app-neworganization',
  templateUrl: './neworganization.component.html',
  styleUrls: ['./neworganization.component.css']
})
export class NeworganizationComponent implements OnInit {
  
  param1: string;
  param2: string;
  isUpdate = false;
  isView = false;
  isDisabled = true;
  submitted = false;
  addorganization: FormGroup;
  isPassword = true;
  passwordmatch = true;
  public organizationDetail = [];
  public countrylist = [];
  public statelist= [];

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private _notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _commonfunctions: CommonfunctionsService,
    private _errorHandlerService: ErrorHandlerService) {
      this.param1 = this.route.snapshot.params.type;
      this.param2 = this.route.snapshot.params.id;
      if(this.param1 == 'update' && this.param2 != undefined && this.param2 != ''){
        this.isUpdate = true;
      }
      else if(this.param1 == 'view'){
        this.isView = true;
      }
    }

  ngOnInit(): void {
      this.addorganization = this._formBuilder.group({
        fullname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
        username: new FormControl('', [Validators.required, AlphaNumericValidator, Validators.minLength(2), Validators.maxLength(10)]),
        password: new FormControl('', Validators.required),
        repassword: new FormControl('', Validators.required),
        is_active: new FormControl(true),
        firstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
        lastname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
        email: new FormControl('', [Validators.required, emailValidator]),
        mobile: new FormControl('', [Validators.required, NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
        address: new FormControl('', [Validators.required, AlphaNumericValidator, Validators.minLength(2), Validators.maxLength(500)]),
        countryid: new FormControl('', Validators.required),
        stateid: new FormControl('', Validators.required),
        state: new FormControl(''),
        city: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)])
      });
      this.getCountry();
      if(this.isUpdate || this.isView){
        this.getUserDetail();
      }
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
            this.countrylist = [];
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
            this._errorHandlerService.handleError(err);
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
            this.statelist =  [];
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
    var data = {};
    if(!this.isUpdate) {
      data = {
        User_Type: "Organization",
        FullName: this.addorganization.value.fullname,
        Username: this.addorganization.value.username,
        Password: this.addorganization.value.password,
        Is_Active: this._commonfunctions.getBoolean(this.addorganization.value.is_active),
        FirstName: this.addorganization.value.firstname,
        LastName: this.addorganization.value.lastname,
        Email: this.addorganization.value.email,
        MobileNo: this.addorganization.value.mobile,
        Address: this.addorganization.value.address,
        Country_ID: parseInt(this.addorganization.value.countryid),
        State_ID: parseInt(this.addorganization.value.stateid),
        City: this.addorganization.value.city,
      }
  }
  else { 
    data = {
      User_ID: this.param2,
      User_Type: "Organization",
      FullName: this.addorganization.value.fullname,
      Username: this.addorganization.value.username,
      Password: this.addorganization.value.password,
      Is_Active: this._commonfunctions.getBoolean(this.addorganization.value.is_active),
      FirstName: this.addorganization.value.firstname,
      LastName: this.addorganization.value.lastname,
      Email: this.addorganization.value.email,
      MobileNo: this.addorganization.value.mobile,
      Address: this.addorganization.value.address,
      Country_ID: parseInt(this.addorganization.value.countryid),
      State_ID: parseInt(this.addorganization.value.stateid),
      City: this.addorganization.value.city,
    }
  }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._notificationsService.showSuccess("Success", response["data"]["0"].message);
            this.router.navigateByUrl('/organization/list');
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
    if(!this.isUpdate) {
      this.addorganization.reset();
      this.statelist =  [];
    }
    else {
      this.router.navigateByUrl('/organization/list');
    }
  }
  getUserDetail(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchUserAPI = this._appSettings.fetchUserAPI;
    url = url + fetchUserAPI;

    var data = {
      User_ID: this.param2,
      Search: "",
      User_Type: "Organization",
      User_Group_ID: 0,
      Is_Active: null
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.organizationDetail = response["data"][0];
            this.addorganization.patchValue({
              organizationid: response["data"][0].Parent_User_ID,
              groupid: response["data"][0].User_Group_ID,
              fullname: response["data"][0].FullName,
              firstname: response["data"][0].FirstName,
              lastname: response["data"][0].LastName,
              gender: response["data"][0].Gender,
              email: response["data"][0].Email,
              mobile: response["data"][0].MobileNo,
              username: response["data"][0].Username,
              is_active: response["data"][0].Is_Active === "True" ? true : false,
              countryid: response["data"][0].Country_ID,
              address: response["data"][0].Address,
              state: response["data"][0].State,
              city: response["data"][0].City
           });
           this.geState(this.addorganization.get('countryid').value);
           this.addorganization.get("stateid").setValue(response["data"][0].State_ID);

           this.addorganization.get('username').disable();
           this.addorganization.get('password').disable();
           this.addorganization.get('repassword').disable();
          
           this.addorganization.get('password').setValidators(null);
           this.addorganization.get('password').clearValidators();
           this.addorganization.get('password').updateValueAndValidity();

           this.addorganization.get('repassword').setValidators(null);
           this.addorganization.get('repassword').clearValidators();
           this.addorganization.get('repassword').updateValueAndValidity();
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
          });
   }
  get addorganizationFormControl() {
    return this.addorganization.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addorganization, control);
  }

}
