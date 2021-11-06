import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import Util from '@ace/util';

@Directive({
  selector: '.navbar-dropdown[ngbDropdown]'
})
export class NgAceNavbarDropdown implements OnInit, OnDestroy {

  sub: any;
  element: any;
  constructor(private el: ElementRef, private nbgDropdown: NgbDropdown) { 
    this.element = this.el.nativeElement
  }

  ngOnInit(): void {
    this.sub = this.nbgDropdown.openChange.subscribe((isOpen: boolean) => {
      // when a .dropdown is opened, add .navbar-open to increase z-index, so that dropdowns go above 'asides', etc
      if (isOpen) {
        const navbar = Util.closest(this.element, '.navbar')
        if (!navbar) return
        if (this.element.classList.contains('backdrop-shown')) navbar.classList.add('navbar-modal')
        else navbar.classList.add('navbar-open')
      }

      else {
        const navbar = Util.closest(this.element, '.navbar')
        if (!navbar) return
        navbar.classList.remove('navbar-open')
        navbar.classList.remove('navbar-modal')
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
