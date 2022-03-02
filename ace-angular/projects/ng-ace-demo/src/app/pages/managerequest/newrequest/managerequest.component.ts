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
  public grouplist = [];
  public organizationlist= [];
  public userdetail= [];
  public descriptionHistorylist : Array<DescriptionHistoryList> = [];

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
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
      Subject: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      RequestType: new FormControl('1', Validators.required),
      Description: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(500)]),
      CreatedBy: new FormControl({ value: '', disabled: true}, [Validators.minLength(2), Validators.maxLength(50)]),
      RelatedCustomer: new FormControl('1', Validators.required),
      DescriptionHistory: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(500)]),      
      File: new FormControl('', Validators.required),
      IsActive: new FormControl(true),
    });
    this.addRequest.controls.CreatedBy.setValue(this._localstorageService.localstorageGet("fullname"));
    if(this.isUpdate || this.isView){
    }
  }

  addnewuser(){
    this.submitted = true;
    if (!this.addRequest.valid) {
      return;
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
  cancel(){
    if(!this.isUpdate) {
      this.addRequest.reset();
    }
    else {
      this.router.navigateByUrl('/user/list');
    }
  }
   
  addDescription(){
    let descObj = new DescriptionHistoryList();
    descObj.HistoryID = this.descriptionHistorylist.length + 1;
    descObj.AddedBy = this._localstorageService.localstorageGet("fullname");
    descObj.CreatedOn = new Date();
    descObj.DescriptionHistory = this.addRequest.value.DescriptionHistory;
    this.descriptionHistorylist.push(descObj);
    this.addRequest.controls.DescriptionHistory.setValue('');
   }
  get addRequestFormControl() {
    return this.addRequest.controls;
  }

  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addRequest, control);
  }
}
export class DescriptionHistoryList
{
  HistoryID: number
  AddedBy: string
  CreatedOn: Date
  DescriptionHistory: string
}