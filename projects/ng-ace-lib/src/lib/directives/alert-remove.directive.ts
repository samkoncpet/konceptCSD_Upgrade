import { Renderer2, OnInit, Directive, ElementRef, OnDestroy } from '@angular/core';

import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: 'ngb-alert[remove]'
})
export class NgAceAlertRemove implements OnInit, OnDestroy {

  constructor(private ngbAlert: NgbAlert, private el: ElementRef, private renderer2: Renderer2) { }

  sub: any;
  ngOnInit() {
    this.sub = this.ngbAlert.closed.subscribe(() => {     
      let el =  this.el.nativeElement
      this.renderer2.removeChild(el.parentNode, el)
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
