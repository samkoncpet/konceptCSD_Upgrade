import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { NgxSpinnerService } from "ngx-spinner";

import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  param1: string;
  param2: string;
  isUpdate = false;
  isView = false;
  submitted = false;
  adduser: FormGroup;
  isPassword = true;
  passwordmatch = true;
  imageSrc: string = '';
  public grouplist = [];
  public organizationlist= [];
  public userdetail= [];

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _commonfunctions: CommonfunctionsService) {
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
    this.adduser = this._formBuilder.group({
      //userlogo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      organizationid: new FormControl('', Validators.required),
      groupid: new FormControl('', Validators.required),
      firstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      lastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      gender: new FormControl(1, Validators.required),
      email: new FormControl('', [Validators.required, emailValidator, Validators.minLength(10), Validators.maxLength(50)]),
      mobile: new FormControl('', [Validators.required, NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      username: new FormControl('', [Validators.required, AlphaNumericValidator, Validators.minLength(2), Validators.maxLength(10)]),
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required),
      is_active: new FormControl(true),
    });
    this.geOrganization();
    this.getUserGroup();
    if(this.isUpdate || this.isView){
      this.getUserDetail();
    }
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
    var data = {};
    if(!this.isUpdate){
      data = {
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
        Is_Active: this._commonfunctions.getBoolean(this.adduser.value.is_active)
      }
    }
    else { 
      data = {
        User_ID: parseInt(this.param2),
        User_Type: "User",
        Parent_User_ID: parseInt(this.adduser.value.organizationid),
        User_Group_ID: parseInt(this.adduser.value.groupid),
        FirstName: this.adduser.value.firstname,
        LastName: this.adduser.value.lastname,
        Gender: parseInt(this.adduser.value.gender),
        Email: this.adduser.value.email,
        MobileNo: this.adduser.value.mobile,
        Username: this.adduser.value.username,
        Password: this.adduser.value.password,
        Is_Active: this._commonfunctions.getBoolean(this.adduser.value.is_active)
      }
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._notificationsService.showSuccess("Success", response["data"]["0"].message);
            setTimeout(() => {
              /** spinner ends after 3 seconds */
              this.router.navigateByUrl('/user/list');
            }, 300);
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
    if(!this.isUpdate) {
      this.adduser.reset();
    }
    else {
      this.router.navigateByUrl('/user/list');
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
      Search: '',
      User_Type: null,
      User_Group_ID: null,
      Is_Active: null
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.userdetail = response["data"][0];
            this.adduser.patchValue({
              organizationid: response["data"][0].Parent_User_ID,
              groupid: response["data"][0].User_Group_ID,
              firstname: response["data"][0].FirstName,
              lastname: response["data"][0].LastName,
              gender: response["data"][0].Gender,
              email: response["data"][0].Email,
              mobile: response["data"][0].MobileNo,
              username: response["data"][0].Username,
              is_active: this._commonfunctions.getBoolean(response["data"][0].Is_Active)
           });

           
           this.adduser.get('username').disable();
           this.adduser.get('password').disable();
           this.adduser.get('repassword').disable();

           this.adduser.get('password').setValidators(null);
           this.adduser.get('password').clearValidators();
           this.adduser.get('password').updateValueAndValidity();

           this.adduser.get('repassword').setValidators(null);
           this.adduser.get('repassword').clearValidators();
           this.adduser.get('repassword').updateValueAndValidity();
          }
          else {
           
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
          });
   }
  get addnewuserFormControl() {
    return this.adduser.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.adduser, control);
  }
}
