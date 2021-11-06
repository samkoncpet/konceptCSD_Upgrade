import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { LocalstorageService } from '../../../config/localstorage.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { AppsettingsService } from '../../../config/appsettings.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  submitted = false;
  adduser: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _appSettings: AppsettingsService,
    private _ConfigurationService: ConfigurationService,
    private _localstorageService: LocalstorageService) {  }

  ngOnInit(): void {
    this.adduser = this._formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  addnewuser(){
    this.submitted = true;
    if (!this.adduser.valid) {
      return;
    }
    alert();
  }
  get addnewuserFormControl() {
    return this.adduser.controls;
  }
}
