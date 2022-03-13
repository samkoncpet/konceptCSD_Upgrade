import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';

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

  param1: string;
  param2: string;
  isUpdate = false;
  isView = false;
  isSubscriptionDetail = false;
  isStudentDetail = false;

  submitted = false;
  addcustomer: FormGroup;
  addpackage: FormGroup;
  addstudent: FormGroup;
  isPassword = true;
  passwordmatch = true;  
  public customerdetail = [];
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
    this.param1 = this._route.snapshot.params.type;
    this.param2 = this._route.snapshot.params.id;
    if(this.param1 == 'update' && this.param2 != undefined && this.param2 != ''){
      this.isUpdate = true;
      this.getCustomerDetail();
    }
    else if(this.param1 == 'view'){
      this.isView = true;
      this.getCustomerDetail();
    }

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
      // modeofpayment: new FormControl('', Validators.required),
      educationconsultant: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      address2: new FormControl('', Validators.required),
      // subscriptiondate: new FormControl('', Validators.required),
      // subscriptionenddate: new FormControl('', Validators.required),
      countryid: new FormControl('', Validators.required),
      stateid: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalcode: new FormControl('', Validators.required),
      // username: new FormControl('', Validators.required),
      // password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),      
      // repassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),      
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

  getCustomerDetail(){
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var fetchcustomerAPI = this._appSettings.fetchcustomerAPI;
    url = url + fetchcustomerAPI;

    var data = {
      Customer_ID: this.param2,
      Search: '',
      Organization_User_ID: 0,
      State_ID: 0,
      Package_ID: 0
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this.customerdetail = response["data"];    
            this.addcustomer.patchValue({
              fatherfirstrname: response["data"][0].Father_FirstName,
              fatherlastname: response["data"][0].Father_LastName,              
              motherfirstname: response["data"][0].Mother_FirstName,
              motherlastname: response["data"][0].Mother_LastName,
              fathercellno: response["data"][0].Father_MobileNo,
              mothercellno: response["data"][0].Mother_MobileNo,
              fatheremail: response["data"][0].Father_Email,   
              motheremail: response["data"][0].Mother_Email,
              homephone: response["data"][0].Alt_PhoneNo,
              educationconsultant: response["data"][0].Education_Consultant_ID,
              address1: response["data"][0].Address,
              address2: response["data"][0].Address_Other,
              countryid: response["data"][0].Country_ID,
              stateid: response["data"][0].State_ID,
              city: response["data"][0].City,
              postalcode: response["data"][0].Zip_Code
            });
            this.geState(response["data"][0].Country_ID);
            if(this.param1 == 'view'){
              this.addpackage.value.packageid.countryid;
              
              this.addcustomer.controls['educationconsultant'].disable();
              this.addcustomer.controls['countryid'].disable();
              this.addcustomer.controls['stateid'].disable();          
              this.addpackage.controls['packageid'].disable();
            }
          }
          else {
            this.customerdetail = [];
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
  updatecustomer(){
    this.submitted = true;
    // if (this.addcustomer.get("password").value != this.addcustomer.get("repassword").value) {
    //   this.passwordmatch = false;
    // }

    if (!this.addcustomer.valid) {
      return;
    }

    /** spinner starts on init */
   this.spinner.show();
   this.studentlist = [];
   var url = this._appSettings.koncentAPI;
   var updatecustomerAPI = this._appSettings.updatecustomerAPI;
   url = url + updatecustomerAPI;

   var data = {
    CustomerInfoUpdateList: [{
      Customer_ID: parseInt(this.param2),
      Father_FirstName: this.addcustomer.value.fatherfirstrname,
      Father_LastName: this.addcustomer.value.fatherlastname,
      Father_Email: this.addcustomer.value.fatheremail,
      Father_MobileNo: this.addcustomer.value.fathercellno,
      Mother_FirstName: this.addcustomer.value.motherfirstname,
      Mother_LastName: this.addcustomer.value.motherlastname,
      Mother_Email: this.addcustomer.value.motheremail,
      Mother_MobileNo: this.addcustomer.value.mothercellno,
      Alt_PhoneNo: this.addcustomer.value.homephone,
      Address: this.addcustomer.value.address1,
      Address_Other: this.addcustomer.value.address2,
      Country_ID: this.addcustomer.value.countryid,
      State_ID: this.addcustomer.value.stateid,
      City: this.addcustomer.value.city,
      Zip_Code: this.addcustomer.value.postalcode,
      Education_Consultant_ID: this.addcustomer.value.educationconsultant,
      mportant_Notes: '',
      Is_Active: this._commonfunctionsService.getBoolean(this.addcustomer.value.is_active),
    }]
   }
   this._ConfigurationService.post(url, data)
       .subscribe(response => {
         if (response["response"] == 1) {
            this._notificationsService.success(response["data"][0].message, "success")
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
  addstudentlist(){
    if(this.studentlist.length >= 5){
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
            var data = this.studentlist.find(x => x.id == this.updateStudentID);
            if(data != null){
              var index = this.studentlist.indexOf(data);
              this.studentlist[index].FirstName = this.addstudent.value.studentfirstname;
              this.studentlist[index].LastName = this.addstudent.value.studentlastname;
              this.studentlist[index].Level_ID = this.addstudent.value.gradeid;
              this.addstudent.reset();
            };
          }
        }
      else{
        let stuObj = new StudentList();
        stuObj.id = this.studentlist.length + 1;
        stuObj.FirstName = this.addstudent.value.studentfirstname;
        stuObj.LastName = this.addstudent.value.studentlastname;
        stuObj.Level_ID = this.addstudent.value.gradeid;
        this.studentlist.push(stuObj);
        this.addstudent.reset();
      }
    }
    else {
      this._notificationsService.info("You can add only less then 6 students!","info")
    }
   }
   editStudent(id: number){
    var data = this.studentlist.find(x => x.id == id);
    if(data != null){
      this.addstudent.controls.studentfirstname.setValue(data["FirstName"]);
      this.addstudent.controls.studentlastname.setValue(data["LastName"]);
      this.addstudent.controls.gradeid.setValue(data["Level_ID"]);
      this.updateStudentID = id;
    }
   }
  deleteStudent(id: number){
    this.studentlist.splice(id - 1, 1);
    if(this.param1 == 'update'){
      /** spinner starts on init */
     this.spinner.show();
     var url = this._appSettings.koncentAPI;
     var deletecustomerchildAPI = this._appSettings.deletecustomerchildAPI;
     url = url + deletecustomerchildAPI;

     var data = {
      Customer_Child_ID: id
      }
      this._ConfigurationService.post(url, data)
      .subscribe(response => {
        if (response["response"] == 1) {
            this._notificationsService.success(response["data"][0].message, "success");
            this.getStudentDetail();
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
  getSubscriptionDetail(){    
    if(!this.isSubscriptionDetail){
      /** spinner starts on init */
      this.spinner.show();
      var url = this._appSettings.koncentAPI;
      var fetchsubscriptionAPI = this._appSettings.fetchsubscriptionAPI;
      url = url + fetchsubscriptionAPI;
    
      var data = {
      Customer_ID: this.param2
      }
      this._ConfigurationService.post(url, data)
          .subscribe(response => {
            if (response["response"] == 1) {
              this.isSubscriptionDetail = true;
              this.addpackage.patchValue({
              subscriptiondate: this.pipe.transform(response["data"][0].Start_Date, 'yyyy-MM-dd').toString(),
              subscriptionenddate: this.pipe.transform(response["data"][0].Last_Renewal_Date, 'yyyy-MM-dd').toString(),
              packageid: response["data"][0].Package_ID,
              paymenttypeid: response["data"][0].Package_ID,
            });
            this.getpackageDetailByID(response["data"][0].Package_ID);
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
  }
  getpackageDetailByID(id: string){
    var data = this.packagelist.find(x => x.Package_ID == id);
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
  getStudentDetail(){
      /** spinner starts on init */
      this.spinner.show();
      this.studentlist = [];
      var url = this._appSettings.koncentAPI;
      var fetchcustomerchildAPI = this._appSettings.fetchcustomerchildAPI;
      url = url + fetchcustomerchildAPI;
  
      var data = {
      Customer_ID: this.param2
      }
      this._ConfigurationService.post(url, data)
          .subscribe(response => {
            if (response["response"] == 1) {
              this.isStudentDetail = true;
              for(var i = 0 ; i < response["data"].length; i++){
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
  updateSubscriptionDetails(){
    /** spinner starts on init */
   this.spinner.show();
   this.studentlist = [];
   var url = this._appSettings.koncentAPI;
   var updatecustomersubscriptionAPI = this._appSettings.updatecustomersubscriptionAPI;
   url = url + updatecustomersubscriptionAPI;

   var data = {
    CustomerSubscriptionUpdateList: [{
      Customer_ID: parseInt(this.param2),
      Subscription_ID: 1,
      Package_ID: parseInt(this.addpackage.value.packageid),
      Start_Date: this.addpackage.value.subscriptiondate,
      Cancellation_Date: this.addpackage.value.subscriptionenddate,
      Payment_Type_ID: parseInt(this.addpackage.value.paymenttypeid)
    }]
   }
   this._ConfigurationService.post(url, data)
       .subscribe(response => {
         if (response["response"] == 1) {
            this._notificationsService.success(response["data"][0].message, "success");
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
  updateStudentDetails(){
    /** spinner starts on init */
   this.spinner.show();
   var url = this._appSettings.koncentAPI;
   var updatecustomerchildAPI = this._appSettings.updatecustomerchildAPI;
   url = url + updatecustomerchildAPI;
  
   var data = {
    CustomerChildUpdateList: this.studentlist
   }
   this._ConfigurationService.post(url, data)
       .subscribe(response => {
         if (response["response"] == 1) {
          this._notificationsService.success("Customer New Child Details has been added successfully.", "success")
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
  Customer_ID: number
  Customer_Child_ID: number
  FirstName: string
  LastName: string
  Gender: number
  Level_ID: number
}