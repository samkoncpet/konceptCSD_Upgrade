import { Component, OnInit } from '@angular/core';import 
{ FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { NgxSpinnerService } from "ngx-spinner";

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';
import { PackagehistoryComponent } from '../packagehistory/packagehistory.component';

@Component({
  selector: 'app-newcustomers',
  templateUrl: './newcustomers.component.html',
  styleUrls: ['./newcustomers.component.css']
})
export class NewcustomersComponent implements OnInit {

  submitted = false;
  addcustomer: FormGroup;
  isPassword = true;
  passwordmatch = true;
  public packagelist = [];
  public countrylist = [];
  public statelist= [];

  nav2active = 1;
  nav4active = 1;
  nav10active = 1;
  nav11active = 1;

  constructor(
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private spinner: NgxSpinnerService,
    private _notificationsService: NotificationsService,
    private _commonfunctionsService: CommonfunctionsService) {  }

  ngOnInit(): void {
    this.addcustomer = this._formBuilder.group({
      fatherfirstrname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      fatherlastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      motherfirstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      motherlastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      fathercellno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      mothercellno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      fatheremail: new FormControl('', [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),      
      motheremail: new FormControl('', [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),
      homephone: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      modeofpayment: new FormControl('', Validators.required),
      educationconsultant: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      address2: new FormControl('', Validators.required),
      subscriptiondate: new FormControl('', Validators.required),
      subscriptionenddate: new FormControl('', Validators.required),
      countryid: new FormControl('', Validators.required),
      stateid: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalcode: new FormControl('', Validators.required),      
      packageid: new FormControl('', Validators.required),
      packageprice: new FormControl({value: '', disabled: true}),
      sessions: new FormControl({value: '', disabled: true}),
      hours: new FormControl({value: '', disabled: true}),
      report: new FormControl({value: '', disabled: true}),
      sessionstypeperiod: new FormControl({value: '', disabled: true}),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),      
      repassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),      
      is_active: new FormControl(true),
    });
    this.getPackageList();
    this.getCountry();
  }

  getPackageList(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchpackage = this._appSettings.fetchpackage;
    url = url + fetchpackage;

    var data = {
      Package_ID: 0,
      Search: '',
      Is_Active: null
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.packagelist = response["data"];
          }
          else {
            this.packagelist = [];
          }
          this.spinner.hide();
        },
        (error) => {
            this.spinner.hide();
            this._commonfunctionsService.exactionLog(error.status, error.message);
        },
        () => {
          this.spinner.hide();
        });
   }
  getpackageDetail(e){
    var data = this.packagelist.find(x => x.Package_ID == e.target.value);
    if(data != null){
      this.addcustomer.controls.sessions.setValue(data["Session_Type_Period"]);
      this.addcustomer.controls.hours.setValue(data["Session_Hours"]);
      this.addcustomer.controls.report.setValue(data["Session_Reports_Period"]);
      this.addcustomer.controls.sessionstypeperiod.setValue(data["Session_Type_Period"]);
      this.addcustomer.controls.packageprice.setValue(data["Package_Price"]);
    }
    else{
      this.addcustomer.controls.sessions.setValue('');
      this.addcustomer.controls.hours.setValue('');
      this.addcustomer.controls.report.setValue('');
      this.addcustomer.controls.sessionstypeperiod.setValue('');
      this.addcustomer.controls.packageprice.setValue('');
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
  addnewcustomer(){
    this.submitted = true;
    if (this.addcustomer.get("password").value != this.addcustomer.get("repassword").value) {
      this.passwordmatch = false;
    }

    if (!this.addcustomer.valid) {
      return;
    }
    this._notificationsService.success("Session Expired!", "Success");
  }
  onPasswordChange(){
    if (this.addcustomer.get("password").value == this.addcustomer.get("repassword").value) {
      this.passwordmatch = true;
    } else {
      this.passwordmatch = false;
    }
  }
  cancel(){
    this.addcustomer.reset();
  }

  get addcustomerFormControl() {
    return this.addcustomer.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addcustomer, control);
  }

}
