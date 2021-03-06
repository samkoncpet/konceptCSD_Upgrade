import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';

@Component({
  selector: 'app-newpackage',
  templateUrl: './newpackage.component.html',
  styleUrls: ['./newpackage.component.css']
})
export class NewpackageComponent implements OnInit {
  param1: string;
  param2: string;
  submitted = false;
  isUpdate = false;
  isView = false;
  public packagedetail = [];
  public currencylist = [];
  addpackage: FormGroup;
  isPassword = true;
  passwordmatch = true;
  
  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private _notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private _commonfunctionsService: CommonfunctionsService,
    private spinner: NgxSpinnerService) { 
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
    this.addpackage = this._formBuilder.group({
      Package: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),      
      Package_Price: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]), 
      Code: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]), 
      Session_Type_Period: new FormControl(0, Validators.required),
      Session_Number_Visits: new FormControl(1, Validators.required),
      Session_Reports_Period: new FormControl(1, Validators.required),
      Session_Hours: new FormControl(1, Validators.required),
      Currency_ID: new FormControl('', Validators.required),
      Is_Active: new FormControl(true),
    });
    this.getCurrency();
    if(this.isUpdate || this.isView){
      this.getPackageDetail();
    }
  }

  addnewpackage(){
    this.submitted = true;
    if (!this.addpackage.valid) {
      return;
    }
    
    var url = this._appSettings.koncentAPI;
    var insertUpdatetPackageAPI = this._appSettings.insertUpdatetPackageAPI;
    url = url + insertUpdatetPackageAPI;
    var data = {};
    if(!this.isUpdate){
      data = {
        Package_ID: 0,
        Package: this.addpackage.value.Package,
        Package_Price: this.addpackage.value.Package_Price,
        Code: this.addpackage.value.Code,
        Session_Type_Period: this.addpackage.value.Session_Type_Period,
        Session_Number_Visits: this.addpackage.value.Session_Number_Visits,
        Session_Reports_Period: this.addpackage.value.Session_Reports_Period,
        Session_Hours: this.addpackage.value.Session_Hours,
        Currency_ID: this.addpackage.value.Currency_ID,
        Is_Active: this._commonfunctionsService.getBoolean(this.addpackage.value.Is_Active)
    }
    }
    else{
      data = {
        Package_ID: parseInt(this.param2),
        Package: this.addpackage.value.Package,
        Package_Price: this.addpackage.value.Package_Price,
        Code: this.addpackage.value.Code,
        Session_Type_Period: this.addpackage.value.Session_Type_Period,
        Session_Number_Visits: this.addpackage.value.Session_Number_Visits,
        Session_Reports_Period: this.addpackage.value.Session_Reports_Period,
        Session_Hours: this.addpackage.value.Session_Hours,
        Currency_ID: this.addpackage.value.Currency_ID,
        Is_Active: this._commonfunctionsService.getBoolean(this.addpackage.value.Is_Active)
      }
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._notificationsService.showSuccess("Success", response["data"]["0"].message);
            this.router.navigateByUrl('/package/list');
          }
          else {
            this._notificationsService.showWarning("Success", response["data"]["0"].message);
          }
        },
          err => {
            console.log("status code--->" + err.status)
          });
  }
  getPackageDetail(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchpackage = this._appSettings.fetchpackage;
    url = url + fetchpackage;

    var data = {
      Package_ID: parseInt(this.param2),
      Search: '',
      Is_Active: null
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.packagedetail = response["data"][0];
            this.addpackage.patchValue(this.packagedetail);
            this.addpackage.patchValue({
              Is_Active: this._commonfunctionsService.getBoolean(response["data"][0].Is_Active)
           });
           if(this.isView){
            this.addpackage.disable();
           }
          }
          else {
            this.packagedetail = [];
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
          },
          );
   }
   getCurrency(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var entityMasterAPI = this._appSettings.entityMasterAPI;
    url = url + entityMasterAPI;

    var data = {
      SQLFROM: "Currency",
      SQLBY: "ByCurrency"
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.currencylist = response["data"];
          }
          else {
            this.currencylist = [];
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
          },
          );
   }
  cancel(){ 
    if(!this.isUpdate) {
      this.addpackage.reset();
    }
    else {
      this.router.navigateByUrl('/package/list');
    }
  }

  get addpackageFormControl() {
    return this.addpackage.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addpackage, control);
  }

}
