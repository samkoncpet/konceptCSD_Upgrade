import { Component, OnInit, ViewEncapsulation, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService, FormErrorMessage, AlphaValidator, emailValidator, NumericValidator, AlphaNumericValidator } from '../../../config/validation.service';
import { NgxSpinnerService } from "ngx-spinner";

import { WizardComponent } from 'angular-archwizard';

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { NotificationsService } from '../../../config/notifications.service';
import { CommonfunctionsService } from '../../../common/functions/commonfunctions.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormWizardComponent {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
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
  public paymentmodelist = [];
  public educationconsultantlist = [];
  public studentlist : Array<StudentList> = [];
  public updatenewstudentlist : Array<StudentList> = [];
  currentDate = new Date();
  public subscriptionStartMinDate: string;
  public subscriptionEndMinDate: string;
  pipe = new DatePipe('en-US');
  public updateStudent = false;
  public updateStudentID : number;

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private spinner: NgxSpinnerService,
    private _notificationsService: NotificationsService,
    private _commonfunctionsService: CommonfunctionsService) { }

    ngOnInit(): void {
      this.addcustomer = this._formBuilder.group({
        fatherfirstrname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        fatherlastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        motherfirstname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        motherlastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        fathercellno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
        mothercellno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
        fatheremail: new FormControl('', [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),      
        motheremail: new FormControl('', [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),
        homephone: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
        educationconsultant: new FormControl('', Validators.required),
        address1: new FormControl('', Validators.required),
        address2: new FormControl(''),
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
      //this.addcustomer.markAllAsTouched();
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
    addstudentlist(){
      if (!this.addstudent.valid) {
        this.addstudent.markAllAsTouched();
        return;
      }
      let stuObj = new StudentList();
      stuObj.Customer_Child_ID = this.studentlist.length + 1;
      stuObj.FirstName = this.addstudent.value.studentfirstname;
      stuObj.LastName = this.addstudent.value.studentlastname;
      stuObj.Level_ID = this.addstudent.value.gradeid;
      stuObj.Gender = 0;
      this.studentlist.push(stuObj);
      this.addstudent.reset();
     }
    deleteStudent(id: number){
      this.studentlist.splice(id - 1, 1);
      this.updatenewstudentlist = [];
      for (var i = 0; i < this.studentlist.length; i++){
        let stuObj = new StudentList();
        stuObj.Customer_Child_ID = i + 1;
        stuObj.FirstName = this.studentlist[i].FirstName;
        stuObj.LastName = this.studentlist[i].LastName;
        stuObj.Level_ID = this.studentlist[i].Level_ID;
        stuObj.Gender = this.studentlist[i].Gender;
        this.updatenewstudentlist.push(stuObj);
      }
      this.studentlist = [];
      this.studentlist = this.updatenewstudentlist;
     }
     editStudent(id: number){
      var data = this.studentlist.find(x => x.Customer_Child_ID == id);
      if(data != null){
        this.addstudent.controls.studentfirstname.setValue(data["FirstName"]);
        this.addstudent.controls.studentlastname.setValue(data["LastName"]);
        this.addstudent.controls.gradeid.setValue(data["Level_ID"])
        this.updateStudent = true;
        this.updateStudentID = id;
      }
     }
     updatestudentDetail(){
        var data = this.studentlist.find(x => x.Customer_Child_ID == this.updateStudentID);
        if(data)
        {
          data.FirstName = this.addstudent.value.studentfirstname;
          data.LastName = this.addstudent.value.studentlastname;
          data.Level_ID = this.addstudent.value.gradeid;
        } 
        this.addstudent.reset();
        this.updateStudent = false;
     }
    onPasswordChange(){
      if (this.addcustomer.get("password").value == this.addcustomer.get("repassword").value) {
        this.passwordmatch = true;
      } else {
        this.passwordmatch = false;
      }
    }
    nextStep(){
      if ((this.addcustomer.value.fatherfirstrname == '' || this.addcustomer.value.fatherfirstrname == null
          || this.addcustomer.value.fatherfirstrname == undefined)
          || (this.addcustomer.value.motherfirstname == '' || this.addcustomer.value.motherfirstname == null
          || this.addcustomer.value.motherfirstname == undefined)) {        
        this._notificationsService.showWarning("warning", "Please enter father or mother first name!");
        return;
      }
      else {
        this.wizard.navigation.goToStep;
      }
    }
    subscriptionEndDateFilter(date: Date){
      this.subscriptionEndMinDate = this.pipe.transform(date, 'yyyy-MM-dd').toString();
    }
    onClickStep1Form(){  
      this.addpackage.markAllAsTouched();
    }
    onClickStep2Form(){
      this.addstudent.markAllAsTouched();
    }
    onClickStep3Form(){
      this.addstudent.markAllAsTouched();
    }
    submit(){
      
    this.submitted = true;
      if (!this.addcustomer.valid && !this.addpackage.valid && !this.addstudent.valid) {
        return;
      }
      var data = {
        Username: this.addcustomer.value.username,
        Password: this.addcustomer.value.repassword,
        CustomerInfoList : [{
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
        }],
        CustomerSubscriptionList: [{
          Package_ID: this.addpackage.value.packageid,
          Start_Date: this.addpackage.value.subscriptiondate,
          Cancellation_Date: this.addpackage.value.subscriptionenddate
        }],
        CustomerChildList: this.studentlist
      }
      var url = this._appSettings.koncentAPI;
      var insertcustomerAPI = this._appSettings.insertcustomerAPI;
      url = url + insertcustomerAPI;

      this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._notificationsService.showSuccess("Success", response["data"][0].message);
            this.router.navigateByUrl('/customer/list');
          }
          else {
            this._notificationsService.showWarning("warning", response["sys_message"]);
          }
        },
          err => {
            console.log("status code--->" + err.status)
          });
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
  Customer_Child_ID: number
  FirstName: string
  LastName: string
  Level_ID: number
  Gender: number
}
