import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, NavigationCancel } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
  
import { Title } from '@angular/platform-browser';  

import { LoadingBarService } from '@ngx-loading-bar/core';

import ScrollTop from '@ace/scroll-top';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'Koncept';

  constructor(private router: Router,  
    private activatedRoute: ActivatedRoute,  
    private titleService: Title,
    private loadingBar: LoadingBarService
    ) {  
  }

  sub: any;
  ngOnInit() {
    this.sub = this.router.events
    .subscribe((val) => {
      if (val instanceof NavigationStart) {
        let currentState = this.router.getCurrentNavigation()
        if (!currentState.extras.state?.skipNavigation) {
          // `skipNavigation` is set in `app/layouts/partials/sidebar/submenu.component.html`
          this.loadingBar.useRef().start()
        }
      }
      else if (val instanceof NavigationEnd) {
        this.loadingBar.useRef().stop()
        let child = this.getChild(this.activatedRoute)
        this.titleService.setTitle(`${child.data._value.title} - ${this.title}`)

        setTimeout(() => {
          ScrollTop.scrollToTop(true)
        }, 120)
      }
      else if (val instanceof NavigationCancel) {
        this.loadingBar.useRef().stop()
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  ngAfterViewInit() {
    document.body.classList.add('is-document-loaded')
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild)
    } else {
      return activatedRoute
    }    
  }
}
