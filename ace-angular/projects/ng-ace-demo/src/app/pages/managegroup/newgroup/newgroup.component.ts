import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonAccessModule, OrganizationAccessModule } from '../../../shared/models/user-access/user-access.model';

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.css']
})
export class NewgroupComponent implements OnInit {

  param1: string;
  param2: string;
  isUpdate = false;
  isView = false;
  submitted = false;
  btntxt = "Submit";
  addgroup: FormGroup;
  isPassword = true;
  passwordmatch = true;
  grouplist = [];
  public CommonAccessModule = new CommonAccessModule();

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private _notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _commonfunctions: CommonfunctionsService) {
      
      this.CommonAccessModule = JSON.parse(this._localstorageService.localstorageGet("CommonAccess"));
      this.param1 = this.route.snapshot.params.type;
      this.param2 = this.route.snapshot.params.id;
      if(this.param1 == 'update' && this.param2 != undefined && this.param2 != ''){
        this.isUpdate = true;
      }
      else if(this.param1 == 'view'){
        this.isView = true;
      }
      else{        
        this.getUserGroup();
      }
    }

  checklist:any;
  checkedList:any;
    

  ngOnInit(): void {
    this.addgroup = this._formBuilder.group({
      User_Group_Name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      User_Group_Description: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),      
      is_active: new FormControl(true, Validators.required),
    });

    if(this.isUpdate || this.isView){
      this.getGroupDetailByID();
    }
  }
  

  getUserGroup(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var entityMasterAPI = this._appSettings.entityMasterAPI;
    url = url + entityMasterAPI;

    var data = {
      SQLFROM: "User_Group_Access_Area",
      SQLBY: "ByUser_Group_Access_Area"
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.grouplist = response["data"];
            this.grouplist.forEach((item :IGroup) => {
              //creating dynamically form controls
              this.addgroup.addControl("Is_Create"+item.User_Group_Access_Area_ID, this._formBuilder.control(null));
              this.addgroup.get("Is_Create"+item.User_Group_Access_Area_ID).setValue(item.Is_Create);
        
              this.addgroup.addControl("Is_Update"+item.User_Group_Access_Area_ID, this._formBuilder.control(null));              
              this.addgroup.get("Is_Update"+item.User_Group_Access_Area_ID).setValue(item.Is_Update);
        
              this.addgroup.addControl("Is_Retrieve"+item.User_Group_Access_Area_ID, this._formBuilder.control(null));              
              this.addgroup.get("Is_Retrieve"+item.User_Group_Access_Area_ID).setValue(item.Is_Retrieve);
        
              this.addgroup.addControl("Is_Delete"+item.User_Group_Access_Area_ID, this._formBuilder.control(null));              
              this.addgroup.get("Is_Delete"+item.User_Group_Access_Area_ID).setValue(item.Is_Delete);
            })
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
  getFormControlName(typeOfForm: string, id:number):string{
    return typeOfForm + id;
  }
  addnewgroup(){
    this.submitted = true;
    if (!this.addgroup.valid) {
      return;
    }
    let _IGroupList: IGroup[] = [];

    this.grouplist.forEach((item :IGroup) => {
      this.addgroup.get("Is_Create"+item.User_Group_Access_Area_ID).setValue(this.addgroup.get(['Is_Create' + item.User_Group_Access_Area_ID]).value ? this.addgroup.get(['Is_Create' + item.User_Group_Access_Area_ID]).value : false), 
      this.addgroup.get("Is_Update"+item.User_Group_Access_Area_ID).setValue(this.addgroup.get(['Is_Update' + item.User_Group_Access_Area_ID]).value ? this.addgroup.get(['Is_Update' + item.User_Group_Access_Area_ID]).value : false), 
      this.addgroup.get("Is_Retrieve"+item.User_Group_Access_Area_ID).setValue(this.addgroup.get(['Is_Retrieve' + item.User_Group_Access_Area_ID]).value ? this.addgroup.get(['Is_Retrieve' + item.User_Group_Access_Area_ID]).value : false)
      this.addgroup.get("Is_Delete"+item.User_Group_Access_Area_ID).setValue(this.addgroup.get(['Is_Delete' + item.User_Group_Access_Area_ID]).value ? this.addgroup.get(['Is_Delete' + item.User_Group_Access_Area_ID]).value : false)
      
      let _IGroup: IGroup = {
        User_Group_Access_Area_ID: 0,
        Is_Create: false,
        Is_Retrieve: false,
        Is_Update: false,
        Is_Delete: false
      };
      
      _IGroup.User_Group_Access_Area_ID = item.User_Group_Access_Area_ID;
      _IGroup.Is_Create = this.addgroup.get("Is_Create"+item.User_Group_Access_Area_ID).value;
      _IGroup.Is_Update = this.addgroup.get("Is_Update"+item.User_Group_Access_Area_ID).value;
      _IGroup.Is_Retrieve = this.addgroup.get("Is_Retrieve"+item.User_Group_Access_Area_ID).value;
      _IGroup.Is_Delete = this.addgroup.get("Is_Delete"+item.User_Group_Access_Area_ID).value;
      _IGroupList.push(_IGroup);
    })

    
    
    var url = this._appSettings.koncentAPI;
    var insertUpdateusergroup = this._appSettings.insertUpdateusergroup;
    url = url + insertUpdateusergroup;

    var data = {};
    if(!this.isUpdate) {
      data = {
        User_Group_Name: this.addgroup.value.User_Group_Name,
        User_Group_Description: this.addgroup.value.User_Group_Description,
        Is_Active: this.addgroup.value.is_active,
        AccessAreaList : _IGroupList
      }
    }
    else { 
      data = {
        User_Group_ID: parseInt(this.param2),
        User_Group_Name: this.addgroup.value.User_Group_Name,
        User_Group_Description: this.addgroup.value.User_Group_Description,
        Is_Active: this._commonfunctions.getBoolean(this.addgroup.value.is_active),
        AccessAreaList : _IGroupList
      }
    }

    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.cancel();
            this._notificationsService.showSuccess("Success", response["message"]);
            this.router.navigateByUrl('/viewgroup');
          }
          else {
            this._notificationsService.showWarning("warning", response["sys_message"]);
          }
        },
          err => {
            console.log("status code--->" + err.status)
          });
  }
  getGroupDetailByID(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchusergroupmapping = this._appSettings.fetchusergroupmapping;
    url = url + fetchusergroupmapping;

    var data = {
      User_Group_ID: this.param2,
      Search: '',
      User_Group_Name: '',
      Is_Predefined: null,
      Is_Active: null
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.grouplist = [];
            this.addgroup.patchValue({
              User_Group_Name: response["data"][0].User_Group_Name,
              User_Group_Description: response["data"][0].User_Group_Description,
              is_active: response["data"][0].Is_Active});
              this.grouplist = response["data"];

              this.grouplist.forEach((item :IGroup) => {
                //creating dynamically form controls
                this.addgroup.addControl("Is_Create"+item.User_Group_Access_Area_ID, this._formBuilder.control(null));
                this.addgroup.get("Is_Create"+item.User_Group_Access_Area_ID).setValue(this._commonfunctions.getBoolean(item.Is_Create));
          
                this.addgroup.addControl("Is_Update"+item.User_Group_Access_Area_ID, this._formBuilder.control(null));              
                this.addgroup.get("Is_Update"+item.User_Group_Access_Area_ID).setValue(this._commonfunctions.getBoolean(item.Is_Update));
          
                this.addgroup.addControl("Is_Retrieve"+item.User_Group_Access_Area_ID, this._formBuilder.control(null));              
                this.addgroup.get("Is_Retrieve"+item.User_Group_Access_Area_ID).setValue(this._commonfunctions.getBoolean(item.Is_Retrieve));
          
                this.addgroup.addControl("Is_Delete"+item.User_Group_Access_Area_ID, this._formBuilder.control(null));              
                this.addgroup.get("Is_Delete"+item.User_Group_Access_Area_ID).setValue(this._commonfunctions.getBoolean(item.Is_Delete));
              });
          }   
          if(this.isView){
            this.addgroup.disable();
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
          });
   }
  cancel(){
    this.addgroup.reset();
  }
  get addgroupFormControl() {
    return this.addgroup.controls;
  }
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addgroup, control);
  }
}
export interface IGroup
{
    User_Group_Access_Area_ID: number,
    Is_Create: boolean, 
    Is_Retrieve: boolean, 
    Is_Update: boolean,
    Is_Delete: boolean
}
