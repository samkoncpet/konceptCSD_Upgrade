import { Directive, ElementRef, NgZone, OnInit } from '@angular/core';


import AceScrollTop from '@ace/scroll-top';

@Directive({
  selector: '[NgAceScrollTop]'
})
export class NgAceScrolltop implements OnInit {

  scrollTop: any;
  element: any;

  constructor(private el: ElementRef, private _ngZone: NgZone) {
    this.element = this.el.nativeElement
  }
  
  ngOnInit(): void {
    this._ngZone.runOutsideAngular(() => {
      this.scrollTop = AceScrollTop.getInstance(this.element)
    })
  }
}
