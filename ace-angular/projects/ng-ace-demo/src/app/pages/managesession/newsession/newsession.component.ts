import { ActivatedRoute, Router } from '@angular/router';
import { AlphaValidator, FormErrorMessage, NumericValidator, emailValidator } from '../../../config/validation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppsettingsService } from '../../../config/appsettings.service';
import { CalendarComponent } from '../../../pages/calendar/calendar.component';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { DatePipe } from '@angular/common';
import { LocalstorageService } from '../../../config/localstorage.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationsService } from '../../../config/notifications.service';

@Component({
  selector: 'app-newsession',
  templateUrl: './newsession.component.html',
  styleUrls: ['./newsession.component.css']
})
export class NewsessionComponent implements OnInit {

  param1: string;
  isView = true;
  submitted = false;
  addsummary: FormGroup;
  addpackage: FormGroup;
  addcustomerserviceremarks: FormGroup;
  addstudent: FormGroup;
  addrequest: FormGroup;
  adddiscriptionHistory: FormGroup;
  isPassword = true;
  passwordmatch = true;
  private packagelist = [];
  private getScriptionDetail = [];
  private packagehistory = [];
  private studentlist : Array<StudentList> = [];
  currentDate = new Date();
  private subscriptionStartMinDate: string;
  private subscriptionEndMinDate: string;
  pipe = new DatePipe('en-US');

  nav2active = 1;
  nav4active = 1;
  nav10active = 1;
  nav11active = 1;
  updateStudentID: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private spinner: NgxSpinnerService,
    private _notificationsService: NotificationsService,
    private _route: ActivatedRoute,
    private _commonfunctionsService: CommonfunctionsService) {  }

  ngOnInit(): void {
    this.param1 = this._route.snapshot.params.id;
    if(this.param1 != undefined && this.param1 != ''){
      this.getCustomerDetail();
    }

    this.addsummary = this._formBuilder.group({
      fatherfirstrname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      fatherlastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      motherfirstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      motherlastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      fathercellno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      mothercellno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      fatheremail: new FormControl('', [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),
      motheremail: new FormControl('', [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),
      homephone: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
      is_active: new FormControl(true),
    });
    this.addpackage = this._formBuilder.group({
      subscriptiondate: new FormControl('', Validators.required),
      subscriptionenddate: new FormControl('', Validators.required),
      packageid: new FormControl('', Validators.required),
      packageprice: new FormControl({value: '', disabled: true}),
      sessions: new FormControl({value: '', disabled: true}),
      hours: new FormControl({value: '', disabled: true}),
      report: new FormControl({value: '', disabled: true}),
      sessionstypeperiod: new FormControl({value: '', disabled: true}),
      paymenttypeid: new FormControl('', Validators.required),
      is_active: new FormControl(true),
    });
    this.addcustomerserviceremarks = this._formBuilder.group({
      nextcalldate: new FormControl('', Validators.required),
      nextcall: new FormControl('', Validators.required),
      remarks: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(250)]),
    });
    this.addstudent = this._formBuilder.group({
      studentfirstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      studentlastname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      gradeid: new FormControl('', Validators.required)
    });
    this.addrequest = this._formBuilder.group({
      subject: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      status: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(250)]),
      requestType: new FormControl('', Validators.required),
      document: new FormControl('', Validators.required),
    });
    this.adddiscriptionHistory = this._formBuilder.group({
      history: new FormControl('', Validators.required)
    });
    this.subscriptionStartMinDate = this.pipe.transform(this.currentDate, 'yyyy-MM-dd').toString();
    this.subscriptionEndMinDate = this.pipe.transform(this.currentDate, 'yyyy-MM-dd').toString();
  }

  getCustomerDetail(){
    /** spinner starts on init */
    this.spinner.show();
    let url = this._appSettings.koncentAPI;
    let fetchcustomerAPI = this._appSettings.fetchcustomerAPI;
    url = url + fetchcustomerAPI;

    let data = {
      Customer_ID: this.param1,
      Search: '',
      Organization_User_ID: 0,
      State_ID: 0,
      Package_ID: 0
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.addsummary.patchValue({
              fatherfirstrname: response["data"]["0"].Father_FirstName,
              fatherlastname: response["data"]["0"].Father_LastName,
              motherfirstname: response["data"]["0"].Mother_FirstName,
              motherlastname: response["data"]["0"].Mother_LastName,
              fathercellno: response["data"]["0"].Father_MobileNo,
              mothercellno: response["data"]["0"].Mother_MobileNo,
              fatheremail: response["data"]["0"].Father_Email,
              motheremail: response["data"]["0"].Mother_Email,
              homephone: response["data"]["0"].Alt_PhoneNo
            });
            this.getSubscriptionDetail();
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
  getPackageList(){
    /** spinner starts on init */
    this.spinner.show();
    let url = this._appSettings.koncentAPI;
    let fetchpackage = this._appSettings.fetchpackage;
    url = url + fetchpackage;

    let data = {
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
    let data = this.packagelist.find(x => x.Package_ID == e.target.value);
    if(data != null){
      this.addpackage.controls.sessions.setValue(data.Session_Type_Period);
      this.addpackage.controls.hours.setValue(data.Session_Hours);
      this.addpackage.controls.report.setValue(data.Session_Reports_Period);
      this.addpackage.controls.sessionstypeperiod.setValue(data.Session_Type_Period);
      this.addpackage.controls.packageprice.setValue(data.Package_Price);
    }
    else{
      this.addpackage.controls.sessions.setValue('');
      this.addpackage.controls.hours.setValue('');
      this.addpackage.controls.report.setValue('');
      this.addpackage.controls.sessionstypeperiod.setValue('');
      this.addpackage.controls.packageprice.setValue('');
      this.addpackage.controls.subscriptiondate.setValue('');
      this.addpackage.controls.subscriptionenddate.setValue('');
    }
   }
  updatecustomer(){
    this.submitted = true;
    // if (this.addcustomer.get("password").value != this.addcustomer.get("repassword").value) {
    //   this.passwordmatch = false;
    // }

    if (!this.addsummary.valid) {
      return;
    }

    /** spinner starts on init */
   this.spinner.show();
   this.studentlist = [];
   let url = this._appSettings.koncentAPI;
   let updatecustomerAPI = this._appSettings.updatecustomerAPI;
   url = url + updatecustomerAPI;

   let data = {
    CustomerInfoUpdateList: [{
      Customer_ID: parseInt(this.param1),
      Father_FirstName: this.addsummary.value.fatherfirstrname,
      Father_LastName: this.addsummary.value.fatherlastname,
      Father_Email: this.addsummary.value.fatheremail,
      Father_MobileNo: this.addsummary.value.fathercellno,
      Mother_FirstName: this.addsummary.value.motherfirstname,
      Mother_LastName: this.addsummary.value.motherlastname,
      Mother_Email: this.addsummary.value.motheremail,
      Mother_MobileNo: this.addsummary.value.mothercellno,
      Alt_PhoneNo: this.addsummary.value.homephone
    }]
   }
   this._ConfigurationService.post(url, data)
       .subscribe(response => {
         if (response["response"] == 1) {
            this._notificationsService.success(response["data"]["0"].message, "success")
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
  addstudentlist(){
    if(this.studentlist.length <= 5){
        if(this.param1 == 'update' || this.updateStudentID > 0) {
          if((this.addstudent.value.studentfirstname == '' || this.addstudent.value.studentfirstname == undefined)
          && (this.addstudent.value.studentlastname == '' || this.addstudent.value.studentlastname == undefined)
          && (this.addstudent.value.gradeid == '' || this.addstudent.value.gradeid == undefined)){
            this.submitted = true;
            if (!this.addstudent.valid) {
              return;
            }
          }
          else{
            let data = this.studentlist.find(x => x.id == this.updateStudentID);
            if(data != null){
              let index = this.studentlist.indexOf(data);
              this.studentlist[index].FirstName = this.addstudent.value.studentfirstname;
              this.studentlist[index].LastName = this.addstudent.value.studentlastname;
              this.studentlist[index].Level_ID = this.addstudent.value.gradeid;
              this.studentlist[index].Customer_ID = parseInt(this.param1);
              this.addstudent.reset();
              this.addstudent.value.gradeid = "0";
            }
            else{
              let stuObj = new StudentList();
              stuObj.id = this.studentlist.length + 1;
              stuObj.FirstName = this.addstudent.value.studentfirstname;
              stuObj.LastName = this.addstudent.value.studentlastname;
              stuObj.Level_ID = this.addstudent.value.gradeid;
              stuObj.Customer_ID = parseInt(this.param1);
              this.studentlist.push(stuObj);
              this.addstudent.reset();
              this.addstudent.value.gradeid = "0";
            }
          }
        }
      else{
        let stuObj = new StudentList();
        stuObj.id = this.studentlist.length + 1;
        stuObj.FirstName = this.addstudent.value.studentfirstname;
        stuObj.LastName = this.addstudent.value.studentlastname;
        stuObj.Level_ID = this.addstudent.value.gradeid;
        stuObj.Customer_ID = parseInt(this.param1);
        this.studentlist.push(stuObj);
        this.addstudent.reset();
        this.addstudent.value.gradeid = "0";
      }
    }
    else {
      this._notificationsService.info("Cannot add more than 5 students per customer!","info")
    }
   }
   editStudent(id: number){
    let data = this.studentlist.find(x => x.id == id);
    if(data != null){
      this.addstudent.controls.studentfirstname.setValue(data.FirstName);
      this.addstudent.controls.studentlastname.setValue(data.LastName);
      this.addstudent.controls.gradeid.setValue(data.Level_ID);
      this.updateStudentID = id;
    }
   }
  deleteStudent(id: number){
    let Customer_Child_ID = this.studentlist.find(x => x.id == id).Customer_Child_ID;
    let Customer_ID = this.studentlist.find(x => x.id == id).Customer_ID;

    this.studentlist.splice(id - 1, 1);
    if(this.param1 == 'update'){
      /** spinner starts on init */
     this.spinner.show();
     let url = this._appSettings.koncentAPI;
     let deletecustomerchildAPI = this._appSettings.deletecustomerchildAPI;
     url = url + deletecustomerchildAPI;


     let data = {
        Customer_Child_ID: Customer_Child_ID,
        Customer_ID: Customer_ID
      }
      this._ConfigurationService.post(url, data)
      .subscribe(response => {
        if (response["response"] == 1) {
            this._notificationsService.success(response["data"]["0"].message, "success");
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
   }
  cancel(){
    this.addsummary.reset();
  }

  addCustomerServiceRemarks(){

  }
  getSubscriptionDetail(){
    /** spinner starts on init */
    this.spinner.show();
    let url = this._appSettings.koncentAPI;
    let fetchsubscriptionAPI = this._appSettings.fetchsubscriptionAPI;
    url = url + fetchsubscriptionAPI;

    let data = {
    Customer_ID: this.param1,
    Is_Active: true
    }
    this._ConfigurationService.post(url, data)
    .subscribe(response => {
      if (response["response"] === 1) {
        this.getScriptionDetail = response["data"]["0"];
        this.getpackageDetailByID(response["data"]["0"]["Package_ID"]);
        this.getStudentDetail();
        this.addpackage.patchValue({
          subscriptiondate: this.pipe.transform(response["data"][0]["Start_Date"], 'yyyy-MM-dd').toString(),
          subscriptionenddate: this.pipe.transform(response["data"][0]["Cancellation_Date"], 'yyyy-MM-dd').toString(),
          packageid: response["data"]["0"]["Package_ID"],
          paymenttypeid: response["data"]["0"]["Payment_Type_ID"],
        });
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
    this.getPackageHistory();
  }
  getCustomerServiceRemarks(){
    this.getRemarkHistory();
  }
  getRemarkHistory(){

  }
  getPackageHistory(){
    /** spinner starts on init */
    this.spinner.show();
    let url = this._appSettings.koncentAPI;
    let fetchsubscriptionAPI = this._appSettings.fetchsubscriptionAPI;
    url = url + fetchsubscriptionAPI;

    let data = {
      Customer_ID: this.param1,
      Is_Active: false
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.packagehistory = response["data"];
          }
          else {
            this.packagehistory = [];
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
  getpackageDetailByID(id: string){
    let data = this.packagelist.find(x => x.Package_ID == id);
    if(data != null){
      this.addpackage.controls.sessions.setValue(data.Session_Type_Period);
      this.addpackage.controls.hours.setValue(data.Session_Hours);
      this.addpackage.controls.report.setValue(data.Session_Reports_Period);
      this.addpackage.controls.sessionstypeperiod.setValue(data.Session_Type_Period);
      this.addpackage.controls.packageprice.setValue(data.Package_Price);
    }
    else{
      this.addpackage.controls.sessions.setValue('');
      this.addpackage.controls.hours.setValue('');
      this.addpackage.controls.report.setValue('');
      this.addpackage.controls.sessionstypeperiod.setValue('');
      this.addpackage.controls.packageprice.setValue('');
      this.addpackage.controls.subscriptiondate.setValue('');
      this.addpackage.controls.subscriptionenddate.setValue('');
    }
   }
  getStudentDetail(){
      /** spinner starts on init */
      this.spinner.show();
      this.studentlist = [];
      let url = this._appSettings.koncentAPI;
      let fetchcustomerchildAPI = this._appSettings.fetchcustomerchildAPI;
      url = url + fetchcustomerchildAPI;

      let data = {
      Customer_ID: this.param1
      }
      this._ConfigurationService.post(url, data)
          .subscribe(response => {
            if (response["response"] == 1) {
              for(let i = 0 ; i < response["data"].length; i++){
                let stuObj = new StudentList();
                stuObj.id = response["data"][i].Index;
                stuObj.FirstName = response["data"][i].FirstName;
                stuObj.LastName = response["data"][i].LastName;
                stuObj.Level_ID = parseInt(response["data"][i].Level_ID);
                stuObj.Customer_Child_ID = parseInt(response["data"][i].Customer_Child_ID);
                stuObj.Customer_ID = parseInt(response["data"][i].Customer_ID);
                this.studentlist.push(stuObj);
              }
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
  getBookingTabDetails(){

  }
  updateSubscriptionDetails(){
    /** spinner starts on init */
   this.spinner.show();
   this.studentlist = [];
   let url = this._appSettings.koncentAPI;
   let updatecustomersubscriptionAPI = this._appSettings.updatecustomersubscriptionAPI;
   url = url + updatecustomersubscriptionAPI;

   let data = {
    CustomerSubscriptionUpdateList: [{
      Customer_ID: parseInt(this.param1),
      Subscription_ID: this.getScriptionDetail["Subscription_ID"],
      Package_ID: parseInt(this.addpackage.value.packageid),
      Start_Date: this.addpackage.value.subscriptiondate,
      Cancellation_Date: this.addpackage.value.subscriptionenddate,
      Payment_Type_ID: parseInt(this.addpackage.value.paymenttypeid),
      Is_Active: this._commonfunctionsService.getBoolean(this.addpackage.value.is_active),
    }]
   }
   this._ConfigurationService.post(url, data)
       .subscribe(response => {
         if (response["response"] == 1) {
            this._notificationsService.success(response["data"]["0"].message, "success");
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
  updateStudentDetails(){
    /** spinner starts on init */
   this.spinner.show();
   let url = this._appSettings.koncentAPI;
   let updatecustomerchildAPI = this._appSettings.updatecustomerchildAPI;
   url = url + updatecustomerchildAPI;

   let data = {
    CustomerChildUpdateList: this.studentlist
   };
   this._ConfigurationService.post(url, data)
       .subscribe(response => {
         if (response["response"] === 1) {
          this._notificationsService.success('Customer New Child Details has been added successfully.', 'success');
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
  updateDiscriptionHistory(){
    if (!this.adddiscriptionHistory.valid) {
      return;
    }
  }
  subscriptionEndDateFilter(date: Date){
    this.subscriptionEndMinDate = this.pipe.transform(date, 'yyyy-MM-dd').toString();
  }
  get addsummaryFormControl() {
    return this.addsummary.controls;
  }

  get addpackageFormControl() {
    return this.addpackage.controls;
  }

  get addcustomerserviceremarksFormControl() {
    return this.addcustomerserviceremarks.controls;
  }

  get addstudentFormControl() {
    return this.addstudent.controls;
  }

  get addrequestFormControl() {
    return this.addrequest.controls;
  }

  get addDiscriptionHistoryFormControl() {
    return this.adddiscriptionHistory.controls;
  }

  getErrorMessage(control: string) {
      return FormErrorMessage(this.addsummary, control);
  }
  getErrorPackageMessage(control: string) {
    return FormErrorMessage(this.addpackage, control);
  }
  getErrorCustomerServiceRemarksMessage(control: string) {
    return FormErrorMessage(this.addcustomerserviceremarks, control);
  }
  getErrorStudentMessage(control: string) {
    return FormErrorMessage(this.addstudent, control);
  }
  getErrorRequestMessage(control: string) {
    return FormErrorMessage(this.addrequest, control);
  }
  getErrorDiscriptionHistoryMessage(control: string) {
    return FormErrorMessage(this.adddiscriptionHistory, control);
  }
}

export class StudentList
{
  id: number;
  Customer_ID: number;
  Customer_Child_ID: number;
  FirstName: string;
  LastName: string;
  Gender: number;
  Level_ID: number;
}
