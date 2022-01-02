import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
  addpackage: FormGroup;
  addstudent: FormGroup;
  isPassword = true;
  passwordmatch = true;
  public packagelist = [];
  public countrylist = [];
  public statelist= [];
  public gradelist= [];
  public educationconsultantlist = [];
  public paymentmodelist = [];
  public studentlist : Array<StudentList> = [];
  currentDate = new Date();
  public subscriptionStartMinDate: string;
  public subscriptionEndMinDate: string;
  pipe = new DatePipe('en-US');

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
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),      
      repassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),      
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
      paymenttypeid: new FormControl('', Validators.required)
    });    
    this.addstudent = this._formBuilder.group({
      studentfirstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      studentlastname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
      gradeid: new FormControl('', Validators.required)
    });
    this.getCountry();
    this.getPackageList();
    this.getGrade();
    this.getEducationConsultant();
    this.getPaymentMode();    
    this.subscriptionStartMinDate = this.pipe.transform(this.currentDate, 'yyyy-MM-dd').toString();
    this.subscriptionEndMinDate = this.pipe.transform(this.currentDate, 'yyyy-MM-dd').toString();
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
      this.addpackage.controls.sessions.setValue(data["Session_Type_Period"]);
      this.addpackage.controls.hours.setValue(data["Session_Hours"]);
      this.addpackage.controls.report.setValue(data["Session_Reports_Period"]);
      this.addpackage.controls.sessionstypeperiod.setValue(data["Session_Type_Period"]);
      this.addpackage.controls.packageprice.setValue(data["Package_Price"]);
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
   getGrade(){
   /** spinner starts on init */
   this.spinner.show();
   var url = this._appSettings.koncentAPI;
   var entityMasterAPI = this._appSettings.entityMasterAPI;
   url = url + entityMasterAPI;

   var data = {
     SQLFROM: "Customer_Child_Level",
     SQLBY: "ByCustomer_Child_Level"
   }
   this._ConfigurationService.post(url, data)
       .subscribe(response => {
         if (response["response"] == 1) {
           this.gradelist = response["data"];
         }
         else {
           this.gradelist = [];
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
   getPaymentMode(){
     /** spinner starts on init */
     this.spinner.show();
     var url = this._appSettings.koncentAPI;
     var entityMasterAPI = this._appSettings.entityMasterAPI;
     url = url + entityMasterAPI;
 
     var data = {
       SQLFROM: "Payment_Type",
       SQLBY: "ByPayment_Type"
     }
     this._ConfigurationService.post(url, data)
         .subscribe(response => {
           if (response["response"] == 1) {
             this.paymentmodelist = response["data"];
           }
           else {
             this.paymentmodelist = [];
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
   getEducationConsultant(){
     /** spinner starts on init */
     this.spinner.show();
     var url = this._appSettings.koncentAPI;
     var entityMasterAPI = this._appSettings.entityMasterAPI;
     url = url + entityMasterAPI;
 
     var data = {
       SQLFROM: "User",
       SQLBY: "ByEducation_Consultant"
     }
     this._ConfigurationService.post(url, data)
         .subscribe(response => {
           if (response["response"] == 1) {
             this.educationconsultantlist = response["data"];
           }
           else {
             this.educationconsultantlist = [];
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
  addstudentlist(){
    let stuObj = new StudentList();
    stuObj.id = this.studentlist.length + 1;
    stuObj.firstname = this.addstudent.value.studentfirstname;
    stuObj.lastname = this.addstudent.value.studentlastname;
    stuObj.gredeid = this.addstudent.value.gradeid;
    this.studentlist.push(stuObj);
    this.addstudent.reset();
   }
   editStudent(id: number){
    var data = this.studentlist.find(x => x.id == id);
    if(data != null){
      this.addstudent.controls.studentfirstname.setValue(data["firstname"]);
      this.addstudent.controls.studentlastname.setValue(data["lastname"]);
      this.addstudent.controls.gradeid.setValue(data["gredeid"])
    }
   }
  deleteStudent(id: number){
    this.studentlist.splice(id - 1, 1);
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

  subscriptionEndDateFilter(date: Date){
    this.subscriptionEndMinDate = this.pipe.transform(date, 'yyyy-MM-dd').toString();
  }
  get addcustomerFormControl() {
    return this.addcustomer.controls;
  }

  get addpackageFormControl() {
    return this.addpackage.controls;
  }
  get addstudentFormControl() {
    return this.addstudent.controls;
  }
  
  getErrorMessage(control: string) {
      return FormErrorMessage(this.addcustomer, control);
  }
  getErrorPackageMessage(control: string) {
    return FormErrorMessage(this.addpackage, control);
  }
  getErrorStudentMessage(control: string) {
    return FormErrorMessage(this.addstudent, control);
  }

}

export class StudentList
{
  id: number
  firstname: string
  lastname: string
  gredeid: number
}