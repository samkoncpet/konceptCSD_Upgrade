import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { MainLayoutComponent } from '../../../layouts/main/main.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private main: MainLayoutComponent) { }

  @ViewChild('sticky', {static: true}) sticky!: ElementRef;

  sub1: any;

  ngOnInit(): void {
    var bodyContainer = document.querySelector('.body-container') as HTMLElement
    // for sticky nav to work
    // overflow is visible by default in desktop modes, but it's hidden in mobile to prevent horizontal scrollbars
    if (bodyContainer != null) bodyContainer.style.overflow = 'visible'


    // if .sidebar-push, don't let bodyContainer overflow:visible
    this.sub1 = this.main.sidebar?.hiddenChange.subscribe((hidden: boolean) => {
      if (this.main.sidebar.element.classList.contains('sidebar-push') ) {
        bodyContainer.style.overflow = hidden ? 'visible' : ''
      }
    })
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe()
  }

  tabStuck($event: boolean) {
    this.sticky.nativeElement.classList.toggle('is-stuck', $event)
  }

}
