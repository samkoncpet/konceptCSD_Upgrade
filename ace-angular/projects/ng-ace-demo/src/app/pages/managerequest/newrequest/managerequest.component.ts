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
  selector: 'app-managerequest',
  templateUrl: './managerequest.component.html',
  styleUrls: ['./managerequest.component.css']
})
export class ManagerequestComponent implements OnInit {
  param1: string;
  param2: string;
  isUpdate = false;
  isView = false;
  submitted = false;
  addRequest: FormGroup;
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
    this.addRequest = this._formBuilder.group({
      Subject: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
      RequestType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      CreatedBy: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
      RelatedCustomer: new FormControl('', Validators.required),
      DescriptionHistory: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(20)]),
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
    if (!this.addRequest.valid) {
      return;
    }

    if (this.addRequest.get("password").value != this.addRequest.get("repassword").value) {
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
        FirstName: this.addRequest.value.firstname,
        LastName: this.addRequest.value.lastname,
        Gender: this.addRequest.value.gender,
        Email: this.addRequest.value.email,
        MobileNo: this.addRequest.value.mobile,
        Username: this.addRequest.value.username,
        Password: this.addRequest.value.password,
        Is_Active: this._commonfunctions.getBoolean(this.addRequest.value.is_active)
      }
    }
    else { 
      data = {
        User_ID: parseInt(this.param2),
        User_Type: "User",
        Parent_User_ID: parseInt(this.addRequest.value.organizationid),
        User_Group_ID: parseInt(this.addRequest.value.groupid),
        FirstName: this.addRequest.value.firstname,
        LastName: this.addRequest.value.lastname,
        Gender: parseInt(this.addRequest.value.gender),
        Email: this.addRequest.value.email,
        MobileNo: this.addRequest.value.mobile,
        Username: this.addRequest.value.username,
        Password: this.addRequest.value.password,
        Is_Active: this._commonfunctions.getBoolean(this.addRequest.value.is_active)
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
    if (this.addRequest.get("password").value == this.addRequest.get("repassword").value) {
      this.passwordmatch = true;
    } else {
      this.passwordmatch = false;
    }
  }
  cancel(){
    if(!this.isUpdate) {
      this.addRequest.reset();
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
            this.addRequest.patchValue({
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

           
           this.addRequest.get('username').disable();
           this.addRequest.get('password').disable();
           this.addRequest.get('repassword').disable();

           this.addRequest.get('password').setValidators(null);
           this.addRequest.get('password').clearValidators();
           this.addRequest.get('password').updateValueAndValidity();

           this.addRequest.get('repassword').setValidators(null);
           this.addRequest.get('repassword').clearValidators();
           this.addRequest.get('repassword').updateValueAndValidity();
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
    return this.addRequest.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addRequest, control);
  }
}
