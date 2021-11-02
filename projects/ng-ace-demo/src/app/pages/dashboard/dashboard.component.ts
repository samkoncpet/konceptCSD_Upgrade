import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgAceToasterService } from 'ng-ace-admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('welcomeToast', {static: true}) welcomeToast: TemplateRef<void>;

  constructor(private toasterService: NgAceToasterService) { 
  }

  ngOnInit(): void {
    this.showWelcomeMessage()
  }

  private _welcomeToast: any;
  ngOnDestroy(): void {
    if (this._welcomeToast) this.toasterService.remove(this._welcomeToast)
  }

  showWelcomeMessage() {
    // show the welcome toast
    let displayed = parseInt(localStorage.getItem('welcome.classic.ace') || '0');
    if (displayed < 2) {
      setTimeout(() => {
        localStorage.setItem('welcome.classic.ace', `${displayed + 1}`)
        this.toasterService.show({
          templateRef: this.welcomeToast,

          placement: 'tc',

          width: 480,
          
          className: 'bgc-white overflow-hidden border-0 p-0 radius-0',
          bodyClass: 'text-dark-tp3 text-120 p-2',

          progress: 'position-tl bgc-success-tp1 pt-3px',
          progressReverse: true
        }).then((result: any) => {
          this._welcomeToast = result.toast
        })
      }, 300)
    }
  }
}
