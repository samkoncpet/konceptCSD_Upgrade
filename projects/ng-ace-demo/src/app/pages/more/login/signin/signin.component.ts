import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../../../app/config/localstorage.service';

@Component({
  selector: 'app-demo-signin',
  templateUrl: './signin.component.html',
  styleUrls: []
})
export class SigninComponent implements OnInit {

  @Output() tabChange: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
    private _localstorageService: LocalstorageService) { 
      this._localstorageService.localstorageclear();
  }

  ngOnInit(): void {
  }

  gotoTab(tabId: any) {
    this.tabChange.emit(tabId)
  }
  sigin(){
    this._localstorageService.localstorageSet("userid", "Inder");
    this._localstorageService.localstorageSet("token", "token");
    this.router.navigateByUrl('/dashboard');
  }
}
