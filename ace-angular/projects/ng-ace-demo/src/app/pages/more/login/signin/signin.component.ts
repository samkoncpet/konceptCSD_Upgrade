import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../../../app/config/localstorage.service';
import { ConfigurationService } from '../../../../../app/config/configuration.service';
import { AppsettingsService } from '../../../../../app/config/appsettings.service';
import { NotificationsService } from '../../../../config/notifications.service';

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
    private _notificationsService: NotificationsService) { 
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
            this._localstorageService.localstorageSet("userid", response["data"][0].User_ID);
            this._localstorageService.localstorageSet("token", response["sys_message"]);
            this.router.navigateByUrl('/dashboard');
          }
          else {
            this._notificationsService.info(response["sys_message"], "info!");
            window.localStorage.clear();
          }
        },
          err => {
            console.log("status code--->" + err.status)
          });
    
  }

  get signinFormControl() {
    return this.signin.controls;
  }
}
