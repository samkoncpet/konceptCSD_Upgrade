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
  templateUrl: './booksessionwizard.component.html',
  styleUrls: ['./booksessionwizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormBookSessionWizardComponent {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  param1: string;
  submitted = false;
  addcustomer: FormGroup;
  addpackage: FormGroup;
  addstudent: FormGroup;
  isPassword = true;
  passwordmatch = true;
  public customerdetail = [];
  public packagelist = [];
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
    private _commonfunctionsService: CommonfunctionsService,
    private _route: ActivatedRoute) { }

    ngOnInit(): void {
      this.param1 = this._route.snapshot.params.id;
      if(this.param1 != undefined && this.param1 != ''){
        this.getCustomerDetail();
        this.getSubscriptionDetail();
      }
      this.addcustomer = this._formBuilder.group({
        fatherfirstrname: new FormControl({value: '', disabled: true}, [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        fatherlastname: new FormControl({value: '', disabled: true}, [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        motherfirstname: new FormControl({value: '', disabled: true}, [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        motherlastname: new FormControl({value: '', disabled: true}, [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        fathercellno: new FormControl({value: '', disabled: true}, [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
        mothercellno: new FormControl({value: '', disabled: true}, [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
        fatheremail: new FormControl({value: '', disabled: true}, [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),      
        motheremail: new FormControl({value: '', disabled: true}, [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),
        homephone: new FormControl({value: '', disabled: true}, [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),  
        is_active: new FormControl(true),
      });
      this.addpackage = this._formBuilder.group({
        subscriptiondate: new FormControl({value: '', disabled: true}, Validators.required),
        subscriptionenddate: new FormControl({value: '', disabled: true}, Validators.required)
      });
      this.addstudent = this._formBuilder.group({
        studentfirstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        studentlastname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        gradeid: new FormControl('', Validators.required)
      });
      //this.addcustomer.markAllAsTouched();
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
        Customer_ID: this.param1,
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
                homephone: response["data"][0].Alt_PhoneNo
              });
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
    
  getSubscriptionDetail(){
      /** spinner starts on init */
      this.spinner.show();
      var url = this._appSettings.koncentAPI;
      var fetchsubscriptionAPI = this._appSettings.fetchsubscriptionAPI;
      url = url + fetchsubscriptionAPI;
    
      var data = {
      Customer_ID: this.param1,
      Is_Active: true
      }
      this._ConfigurationService.post(url, data)
          .subscribe(response => {
            if (response["response"] == 1) {
              this.addpackage.patchValue({
                subscriptiondate: this.pipe.transform(response["data"][0].Start_Date, 'yyyy-MM-dd').toString(),
                subscriptionenddate: this.pipe.transform(response["data"][0].Cancellation_Date, 'yyyy-MM-dd').toString()
              });
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
