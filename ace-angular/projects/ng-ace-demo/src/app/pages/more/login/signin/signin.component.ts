import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { LocalstorageService } from '../../../../../app/config/localstorage.service';
import { ConfigurationService } from '../../../../../app/config/configuration.service';
import { AppsettingsService } from '../../../../../app/config/appsettings.service';
import { NotificationsService } from '../../../../config/notifications.service';
import { ShareDataServiceService } from "../../../../config/share-data-service.service";    

@Component({
  selector: 'app-demo-signin',
  templateUrl: './signin.component.html',
  styleUrls: []
})
export class SigninComponent implements OnInit {

  @Output() tabChange: EventEmitter<any> = new EventEmitter();
  username: string = '';
  password: string = '';
  submitted = false;
  signin: FormGroup;



  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService,
    private _notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    public shareDataService: ShareDataServiceService) { 
    this._localstorageService.localstorageclear();
  }

  ngOnInit(): void {
    this.signin = this._formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  gotoTab(tabId: any) {
    this.tabChange.emit(tabId)
  }
  sigin(){
    this.submitted = true;
    if (!this.signin.valid) {
      return;
    }
    /** spinner starts on init */
    this.spinner.show();
    var url = this._appSettings.koncentAPI;
    var signinAPI = this._appSettings.signinAPI;
    url = url + signinAPI;

    var data = {
      username: this.signin.value.username,
      password: this.signin.value.password
    }
    this._ConfigurationService.postWithoutHeader(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._localstorageService.localstorageSet("fullname", response["data"][0].FullName);
            this._localstorageService.localstorageSet("data", JSON.stringify(response["data"][0]));
            this._localstorageService.localstorageSet("userid", response["data"][0].User_ID);
            this._localstorageService.localstorageSet("token", response["sys_message"]);
            
            this.router.navigateByUrl('/dashboard');
            //this.getNavigationMenu();
          }
          else {
            this._notificationsService.info(response["sys_message"], "info!");
            window.localStorage.clear();
          }
          /** spinner ends */
          this.spinner.hide();
        },
          err => {
            /** spinner ends */
            this.spinner.hide();
            console.log("status code--->" + err.status)
          });
    
  }
  getNavigationMenu(){
    var url = this._appSettings.koncentAPI;
    var getNavigationMenuAPI = this._appSettings.getNavigationMenuAPI;
    url = url + getNavigationMenuAPI;

    var data = {
      roleid: "1"
    }
    this._ConfigurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._localstorageService.localstorageSet("navigationmenu", response["sys_message"]);
            this.router.navigateByUrl('/dashboard');
          }
        },
        (error) => {
        });
   }
  facebook(){
    window.location.href="https://www.facebook.com/koncepteducationinc";
  }
  twitter(){
    window.location.href="https://twitter.com/koncepteduinc";
  }
  instagram(){
    window.location.href="https://www.instagram.com/koncepteducationinc";
  }
  linkedin(){
    window.location.href="https://www.linkedin.com/company/koncepteducationinc";
  }
  get signinFormControl() {
    return this.signin.controls;
  }
}
