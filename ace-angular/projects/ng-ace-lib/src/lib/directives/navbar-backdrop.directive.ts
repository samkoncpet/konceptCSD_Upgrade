import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

import Util from '@ace/util';

let currentOpenCollapse : NgbCollapse = null;

@Directive({
  selector: '.navbar-backdrop[ngbCollapse]'
})
export class NgAceNavbarBackdrop implements OnInit, OnDestroy {
  sub1: any;
  sub2: any;

  element: any;

  protected destroy$ = new Subject<void>()

  constructor(private el:ElementRef, private ngbCollapse: NgbCollapse, private ngZone: NgZone) {
    this.element = this.el.nativeElement
  }

  _hideOnClick = (event: Event) => {
    if (event.target === this.element && !this.ngbCollapse.collapsed) {
      this.ngbCollapse.toggle(false)
    }
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.element.addEventListener('click', this._hideOnClick)
    })


    this.ngbCollapse.ngbCollapseChange
    .pipe(takeUntil(this.destroy$))
    .subscribe((isCollapsed: boolean) => {
      if (!isCollapsed) {// if we are about to show (open) a "navbar collapse"
        const scrollbarInfo = Util.getScrollbarInfo()
        if (scrollbarInfo.width === 0) {
          document.body.classList.add('mob-navbar-body')
        }
        ///////////////
        let previousOpenCollapse = currentOpenCollapse
        currentOpenCollapse = this.ngbCollapse

        if (previousOpenCollapse !== null) {// and there is another one already open
          let _animation = previousOpenCollapse.animation

          previousOpenCollapse.animation = false
          previousOpenCollapse.toggle(false) // let's close (collapse) it first (with no animation)
          previousOpenCollapse.animation = _animation
        }        
      }
    })


  
    this.ngbCollapse.hidden
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      // no other ones are open
      if (currentOpenCollapse === this.ngbCollapse) {        
        currentOpenCollapse = null
        document.body.classList.remove('mob-navbar-body')
      }
    })
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    this.element.removeEventListener('click', this._hideOnClick)
  }

}
