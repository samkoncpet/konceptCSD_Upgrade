import { AfterViewInit, ElementRef, Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
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

import { CalendarOptions } from '@fullcalendar/angular';
import { BootstrapTheme } from '@fullcalendar/bootstrap';

import { Draggable } from '@fullcalendar/interaction';
import Util from '@ace/util';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-booksession',
  templateUrl: './booksession.component.html',
  styleUrls: ['./booksession.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BooksessionComponent implements OnInit, AfterViewInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  submitted = false;
  customerinformation: FormGroup;
  addpackage: FormGroup;
  addstudent: FormGroup;
  customerserviceremarks: FormGroup;
  isPassword = true;
  passwordmatch = true;
  public packagelist = [];
  public countrylist = [];
  public statelist= [];
  public gradelist= [];
  public paymentmodelist = [];
  public educationconsultantlist = [];
  public remarkhistory = [];
  public studentlist : Array<StudentList> = [];
  public updatenewstudentlist : Array<StudentList> = [];
  currentDate = new Date();
  public subscriptionStartMinDate: string;
  public subscriptionEndMinDate: string;
  pipe = new DatePipe('en-US');

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private spinner: NgxSpinnerService,
    private _notificationsService: NotificationsService,
    private _commonfunctionsService: CommonfunctionsService,
    private ngbModalService: NgbModal) { }

    touchDevice = 'ontouchstart' in window
    ngOnInit(): void {
      this.customerinformation = this._formBuilder.group({
        customerid: new FormControl('', Validators.required),
        fatherfirstrname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        fatherlastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        motherfirstname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        motherlastname: new FormControl('', [AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        fathercellno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
        mothercellno: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)]),
        fatheremail: new FormControl('', [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),      
        motheremail: new FormControl('', [emailValidator, Validators.minLength(10), Validators.maxLength(50)]),
        homephone: new FormControl('', [NumericValidator, Validators.minLength(10), Validators.maxLength(15)])
      });
      this.addpackage = this._formBuilder.group({
        subscriptiondate: new FormControl('20-Aug-2021', Validators.required),
        subscriptionenddate: new FormControl('20-Nov-2021', Validators.required)
      });
      this.addstudent = this._formBuilder.group({
        studentfirstname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        studentlastname: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(50)]),
        gradeid: new FormControl('', Validators.required)
      });      
      this.customerserviceremarks = this._formBuilder.group({
        nextcalldate: new FormControl('', Validators.required),
        nextdate: new FormControl('', Validators.required),
        remarks: new FormControl('', [Validators.required, AlphaValidator, Validators.minLength(2), Validators.maxLength(500)])
      });
      //this.customerinformation.markAllAsTouched();
      this.getCountry();
      this.getPackageList();
      this.getGrade();
      this.getEducationConsultant();
      this.getPaymentMode();
      this.subscriptionStartMinDate = this.pipe.transform(this.currentDate, 'yyyy-MM-dd').toString();
      this.subscriptionEndMinDate = this.pipe.transform(this.currentDate, 'yyyy-MM-dd').toString();


      // change styling options and icons
    BootstrapTheme.prototype.classes = {
      root: 'fc-theme-bootstrap',
      table: 'table-bordered table-bordered brc-default-l2 text-secondary-d1 h-95',
      tableCellShaded: 'bgc-secondary-l3',
      buttonGroup: 'btn-group',
      button: 'btn btn-white btn-h-lighter-blue btn-a-blue',
      buttonActive: 'active',
      popover: 'card card-primary',
      popoverHeader: 'card-header',
      popoverContent: 'card-body',
    }

    BootstrapTheme.prototype.baseIconClass = 'fa';
    BootstrapTheme.prototype.iconClasses = {
      close: 'fa-times',
      prev: 'fa-chevron-left',
      next: 'fa-chevron-right',
      prevYear: 'fa-angle-double-left',
      nextYear: 'fa-angle-double-right'
    }

    BootstrapTheme.prototype.iconOverrideOption = 'FontAwesome';
    BootstrapTheme.prototype.iconOverrideCustomButtonOption = 'FontAwesome';
    BootstrapTheme.prototype.iconOverridePrefix = 'fa-';

    //for some random events to be added
    var date = new Date();
    var m = date.getMonth();
    var y = date.getFullYear();

    var day1 = Math.random() * 20 + 2;
    var day2 = Math.random() * 25 + 1;

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      themeSystem: 'bootstrap',
      headerToolbar: {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },

      events: [
        {
          title: 'Some Event',
          start: new Date(y, m, 1, Math.random() * 23 + 1),
          allDay: true,
          className: 'bgc-red-d1 text-white text-95'
        },
        {
          title: 'Long Event',
          start: new Date(y, m, day1, Math.random() * 23 + 1),
          end: new Date(y, m, day1 + 4, Math.random() * 23 + 1),
          allDay: true,
          className: 'bgc-green-d2 text-white text-95'
        },
        {
          title: 'Other Event',
          start: new Date(y, m, day2, Math.random() * 23 + 1),
          allDay: true,
          className: 'bgc-blue-d2 text-white text-95'
        }
      ],

      selectable: true,
      selectLongPressDelay: 200,

      editable: true,
      droppable: true,

      drop: (info: any) => {
        // is the "remove after drop" checkbox checked?
        if ( this.dropRemove ) {
          Util.remove(info.draggedEl)
        }
      },

      select: (date: any) => {
        this.ngbModalService.open(this.newEventModal, {backdrop: 'static'}).result.then((result) => {
          if (result === 'save') {
            this.calendarComponent.calendar.addEvent({
              title: this.newEventTitle,
              start: date.start,
              end: date.end,
              allDay: true,
              classNames: ['text-95', 'bgc-info-d2', 'text-white']
            })
          }
        })
      },

      eventClick: (info: any) => {
        this.editingEventTitle = info.event.title
        this.ngbModalService.open(this.editEventModal).result.then((result) => {
          if (result === 'save') {
            info.event.setProp('title', this.editingEventTitle);
          }
          else if (result === 'delete') {
            info.event.remove();
          }
        })
      }

    };
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
        this.addstudent.controls.studentfirstname.setValue(data["firstname"]);
        this.addstudent.controls.studentlastname.setValue(data["lastname"]);
        this.addstudent.controls.gradeid.setValue(data["gredeid"])
      }
     }
     addremark(){

     }
    onPasswordChange(){
      if (this.customerinformation.get("password").value == this.customerinformation.get("repassword").value) {
        this.passwordmatch = true;
      } else {
        this.passwordmatch = false;
      }
    }
    nextStep(){
      if ((this.customerinformation.value.fatherfirstrname == '' || this.customerinformation.value.fatherfirstrname == null
          || this.customerinformation.value.fatherfirstrname == undefined)
          || (this.customerinformation.value.motherfirstname == '' || this.customerinformation.value.motherfirstname == null
          || this.customerinformation.value.motherfirstname == undefined)) {        
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
      if (!this.customerinformation.valid && !this.addpackage.valid && !this.addstudent.valid) {
        return;
      }
      var data = {
        CustomerInfoList : [{
          Father_FirstName: this.customerinformation.value.fatherfirstrname,
          Father_LastName: this.customerinformation.value.fatherlastname,
          Father_Email: this.customerinformation.value.fatheremail,
          Father_MobileNo: this.customerinformation.value.fathercellno,
          Mother_FirstName: this.customerinformation.value.motherfirstname,
          Mother_LastName: this.customerinformation.value.motherlastname,
          Mother_Email: this.customerinformation.value.motheremail,
          Mother_MobileNo: this.customerinformation.value.mothercellno,
          Alt_PhoneNo: this.customerinformation.value.homephone,
          Address: this.customerinformation.value.address1,
          Address_Other: this.customerinformation.value.address2,
          Country_ID: this.customerinformation.value.countryid,
          State_ID: this.customerinformation.value.stateid,
          City: this.customerinformation.value.city,
          Zip_Code: this.customerinformation.value.postalcode,
          Education_Consultant_ID: this.customerinformation.value.educationconsultant,
          mportant_Notes: '',
          Is_Active: this._commonfunctionsService.getBoolean(this.customerinformation.value.is_active),
          Username: this.customerinformation.value.username,
          Password: this.customerinformation.value.repassword
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
            this.router.navigateByUrl('/group/list');
          }
          else {
            this._notificationsService.showWarning("warning", response["sys_message"]);
          }
        },
          err => {
            console.log("status code--->" + err.status)
          });
    }
  get customerinformationFormControl() {
    return this.customerinformation.controls;
  }
  get addpackageFormControl() {
    return this.addpackage.controls;
  }
  get addstudentFormControl() {
    return this.addstudent.controls;
  }
  get customerserviceremarksFormControl() {
    return this.customerserviceremarks.controls;
  }
  getErrorMessage(control: string) {
      return FormErrorMessage(this.customerinformation, control);
  }
  getErrorPackageMessage(control: string) {
    return FormErrorMessage(this.addpackage, control);
  }
  getErrorCustomerServicerMessage(control: string) {
    return FormErrorMessage(this.customerserviceremarks, control);
  }
  getErrorStudentMessage(control: string) {
    return FormErrorMessage(this.addstudent, control);
  }

/* Full Calendar */
  calendarOptions!: CalendarOptions;
  dropRemove = false;
  newEventTitle = '';
  editingEventTitle = '';

  @ViewChild('externalEvents') externalEvents!: ElementRef;
  @ViewChild('calendar') calendarComponent!: any;

  @ViewChild('newEventModal') newEventModal: any;
  @ViewChild('editEventModal') editEventModal: any;
  ngAfterViewInit(): void {
    // enable external draggable events
    new Draggable(this.externalEvents.nativeElement, {
      itemSelector: '.fc-event',
      longPressDelay: 50,
      eventData: function(eventEl: any) {
        return {
          title: eventEl.innerText,
          classNames: eventEl.getAttribute('data-class').split(' ')
        }
      }
    })
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
