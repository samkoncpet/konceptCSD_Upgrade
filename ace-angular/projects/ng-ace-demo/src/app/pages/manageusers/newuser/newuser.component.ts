import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  submitted = false;
  adduser: FormGroup;
  isPassword = true;
  passwordmatch = true;


  constructor(
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private _notificationsService: NotificationsService) {  }

  ngOnInit(): void {
    this.adduser = this._formBuilder.group({
      username: new FormControl('', [Validators.required, AlphaNumericValidator, Validators.minLength(2), Validators.maxLength(20)]),
      firstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      lastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, emailValidator]),
      mobile: new FormControl('', [Validators.required, NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      status: new FormControl('1', Validators.required),
    });
  }

  addnewuser(){
    this.submitted = true;
    if (!this.adduser.valid) {
      return;
    }

    if (this.adduser.get("password").value != this.adduser.get("repassword").value) {
      this.passwordmatch = false;
    }
    this._notificationsService.success("Session Expired!", "Success");
  }
  onPasswordChange(){
    if (this.adduser.get("password").value == this.adduser.get("repassword").value) {
      this.passwordmatch = true;
    } else {
      this.passwordmatch = false;
    }
  }
  cancel(){
    this.adduser.reset();
  }

  get addnewuserFormControl() {
    return this.adduser.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.adduser, control);
  }
}
