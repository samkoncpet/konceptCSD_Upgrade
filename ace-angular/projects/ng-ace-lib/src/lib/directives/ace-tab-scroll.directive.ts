import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { NgbNav } from '@ng-bootstrap/ng-bootstrap'

import { NavTabScroller, NavLinkScroller } from '@ace/tab-scroll';


// this is for `.nav-tabs-scroll` elements that are also a `NgbNav` directive
@Directive({
  selector: '.nav-tabs-scroll[ngbNav]'
})
export class NgAceTabScroll implements AfterViewInit, OnDestroy {
  element: any;
  @Input() btnScroll = false;


  protected destroy$ = new Subject<void>()

  constructor(private el: ElementRef, private _ngZone: NgZone, private nav: NgbNav) {
    this.element = this.el.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.btnScroll === true) {
      // we can set `btnScroll` to true, so other non "nav-link" items will also cause the scrolling
      this._ngZone.runOutsideAngular(() => {
        NavTabScroller.getInstance(this.element)
      })
    }

    // when active nav changes, scroll links into view
    this.nav.navItemChange$
    .pipe(takeUntil(this.nav.destroy$), distinctUntilChanged())
    .subscribe(nextItem => {
        let link = this.nav.links && this.nav.links.find(link => link.navItem.id === nextItem.id) || null
        if (link === null) return

        this._ngZone.runOutsideAngular(() => {
          NavLinkScroller.scrollIntoView(link.elRef.nativeElement) //.nav-link
        })
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}


// this is for `.nav-tabs-scroll` elements that are not a `NgbNav` directive
@Directive({
  selector: '.nav-tabs-scroll:not([ngbNav])'
})
export class NgAceButtonScroll implements AfterViewInit {
  element: any;

  constructor(private el: ElementRef, private _ngZone: NgZone) {
    this.element = this.el.nativeElement;
  }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => {
      NavTabScroller.getInstance(this.element)
    })
  }
}
