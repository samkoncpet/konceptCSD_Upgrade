import { Component, OnInit } from '@angular/core';import 
{ FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';

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


  constructor(
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private _notificationsService: NotificationsService) {  }

  ngOnInit(): void {
    this.addcustomer = this._formBuilder.group({
      userid: new FormControl('1', Validators.required),
      subscriptionid: new FormControl('1', Validators.required),
      fathername: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      fathermobileno: new FormControl('', [Validators.required, NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      fatheremail: new FormControl('', [emailValidator]),
      mothername: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      mothermobileno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      motheremail: new FormControl('', [emailValidator]),
      alternatemobileno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      alternateemail: new FormControl('', [emailValidator]),
      noofchildren: new FormControl('', [NumericValidator, Validators.minLength(1), Validators.maxLength(2)]),
      packageid: new FormControl('1', Validators.required),
      educationconsultantid: new FormControl('1', Validators.required),
      paymentmodeid: new FormControl('1', Validators.required),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      addressother: new FormControl('', [Validators.minLength(5), Validators.maxLength(500)]),
      city: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      stateid: new FormControl('1', Validators.required),
      countryid: new FormControl('1', Validators.required),
      zipcode: new FormControl('', [Validators.required, NumericValidator, Validators.minLength(5), Validators.maxLength(10)]),
      importantnotes: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    });
  }

  addnewcustomer(){
    this.submitted = true;
    if (!this.addcustomer.valid) {
      return;
    }
    this._notificationsService.success("Session Expired!", "Success");
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
