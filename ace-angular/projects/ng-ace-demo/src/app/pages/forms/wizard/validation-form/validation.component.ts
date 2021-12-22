import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn} from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../../config/validation.service';
import { NgxSpinnerService } from "ngx-spinner";

import { LocalstorageService } from '../../../../config/localstorage.service';
import { ConfigurationService } from '../../../../config/configuration.service';
import { AppsettingsService } from '../../../../config/appsettings.service';
import { NotificationsService } from '../../../../config/notifications.service';
import { CommonfunctionsService } from '../../../../common/functions/commonfunctions.service';

@Component({
  selector: 'app-wizard-validation',
  templateUrl: './validation.component.html',
  styleUrls: []
})
export class ValidationComponent implements OnInit {

  submitted = false;
  addcustomer: FormGroup;
  addpackage: FormGroup;
  isPassword = true;
  passwordmatch = true;
  public countrylist = [];
  public statelist= [];
  constructor(
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private spinner: NgxSpinnerService,
    private _notificationsService: NotificationsService,
    private _commonfunctionsService: CommonfunctionsService) { }

  
  subscriptionItems = [
    {
      id: "newsletter",
      label: "Latest news and announcements"
    },
    {
      id: "offers",
      label: "Product offers and discounts"
    }
  ]

  urlPattern = "^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$"


  confirmPasswords = (form: FormGroup) => {
    let password = form.get('password')?.value;
    let confirmPassword = form.get('confirmPassword')?.value;

    if (password === confirmPassword) return null
    form.controls['confirmPassword'].setErrors({ mismatch: true })

    return { mismatch: true }
  }

  checkSubscriptions = (form: FormGroup) => {
    let control = form.controls['subscription']
    if (!control) return

    control.setErrors({})
    control.updateValueAndValidity( { onlySelf: true, emitEvent: false })

    for(let i = 0; i < this.subscriptionItems.length; i++) {
      if (form.get(`subscription${i}`)?.value === true) return null
    }

    control.setErrors({ selectOne: true })
    return { selectOne: true }
  }

  updateSubscriptions() {
    this.addcustomer.controls['subscription']?.markAsTouched()
  }

  ngOnInit(): void {
    let index = 0;
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
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),      
      repassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),      
      is_active: new FormControl(true),
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
   
  onPasswordChange(){
    if (this.addcustomer.get("password").value == this.addcustomer.get("repassword").value) {
      this.passwordmatch = true;
    } else {
      this.passwordmatch = false;
    }
  }
  isValidForm() : boolean {    
    this.addcustomer.markAllAsTouched()
    return this.addcustomer?.status === "VALID"
  }

  isInvalid(item: any) {
    return item && item.invalid && (item.dirty || item.touched)
  }
  get addcustomerFormControl() {
    return this.addcustomer.controls;
  }
  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addcustomer, control);
  }
}
