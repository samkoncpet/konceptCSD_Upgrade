import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import Util from '@ace/util';

@Directive({
  selector: '.dd-backdrop[ngbDropdown]'
})
export class NgAceDropdownBackrop implements OnInit, OnDestroy {

  sub: any;
  element: any;
  constructor(private el: ElementRef, private nbgDropdown: NgbDropdown) { 
    this.element = this.el.nativeElement
  }

  ngOnInit(): void {
    this.sub = this.nbgDropdown.openChange.subscribe((isOpen: boolean) => {
      // if backdrop is not displayed (on current screen size)
      if (window.getComputedStyle(this.element, ':before').display == 'none') return

      // hide scrollbars on mobile devices
      if (isOpen) {
        const scrollbarInfo = Util.getScrollbarInfo()
        if (scrollbarInfo.width === 0) {
          document.body.classList.add('mob-dropdown-body')
        }
        this.element.classList.add('backdrop-shown')// used in other directive to add `.navbar-modal` class to .navbar
      }

      else {
        // show them back
        document.body.classList.remove('mob-dropdown-body')
        this.element.classList.remove('backdrop-shown')
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
