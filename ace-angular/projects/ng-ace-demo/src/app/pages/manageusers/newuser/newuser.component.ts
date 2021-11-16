import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { NgxSpinnerService } from "ngx-spinner";

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
  imageSrc: string = '';
  public grouplist = [];
  public organizationlist= [];

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _notificationsService: NotificationsService,
    private spinner: NgxSpinnerService) {  }

  ngOnInit(): void {
    this.adduser = this._formBuilder.group({
      //userlogo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      groupid: new FormControl('', Validators.required),
      organizationid: new FormControl('', Validators.required),
      firstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      lastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      gender: new FormControl(1, Validators.required),
      email: new FormControl('', [Validators.required, emailValidator, Validators.minLength(10), Validators.maxLength(50)]),
      mobile: new FormControl('', [Validators.required, NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      username: new FormControl('', [Validators.required, AlphaNumericValidator, Validators.minLength(2), Validators.maxLength(10)]),
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required),
      is_active: new FormControl(true, Validators.required),
    });
    this.getUserGroup();
    this.geOrganization();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 1000);
  }

  // File Upload
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {      
      this._notificationsService.info("invalid format!", "info");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
  }

   getUserGroup(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var entityMasterAPI = this._appSettings.entityMasterAPI;
    url = url + entityMasterAPI;

    var data = {
      SQLFROM: "User_Group",
      SQLBY: "ByUser_Group"
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.grouplist = response["data"];
          }
          else {
            this.grouplist = [];
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
          });
   }
   geOrganization(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var entityMasterAPI = this._appSettings.entityMasterAPI;
    url = url + entityMasterAPI;

    var data = {
      SQLFROM: "User",
      SQLBY: "ByOrganization"
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.organizationlist = response["data"];
          }
          else {
            this.organizationlist = [];
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
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

    /** spinner starts on init */
    this.spinner.show();

    var url = this._appSettings.koncentAPI;
    var insertUpdateUserAPI = this._appSettings.insertUpdateUserAPI;
    url = url + insertUpdateUserAPI;
    var data = {
      User_Type: "User",
      Parent_User_ID: this.adduser.value.organizationid,
      User_Group_ID: this.adduser.value.groupid,
      FirstName: this.adduser.value.firstname,
      LastName: this.adduser.value.lastname,
      Gender: this.adduser.value.gender,
      Email: this.adduser.value.email,
      MobileNo: this.adduser.value.mobile,
      Username: this.adduser.value.username,
      Password: this.adduser.value.password,
      Is_Active: this.adduser.value.is_active
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._notificationsService.showSuccess("Success", response["data"]["0"].message);
            setTimeout(() => {
              /** spinner ends after 3 seconds */
              this.router.navigateByUrl('/userlist');
            }, 300);
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
