import { Directive, ElementRef, OnInit, Input, NgZone, OnChanges, SimpleChanges } from '@angular/core';

import AceScroll from '@ace/scrollbar';


@Directive({
  selector: '[NgAceScroll]'
})
export class NgAceScroll implements OnInit, OnChanges {
  element: any;
  _aceScroll: any;

  @Input() NgAceScroll: any

  constructor(el: ElementRef, private _ngZone: NgZone) {
    this.element = el.nativeElement
  }

  ngOnInit(): void {
    let options = this.NgAceScroll || {}

    this._ngZone.runOutsideAngular(() => {
      this._aceScroll = AceScroll.getInstance(this.element, options)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._aceScroll) return
    if (changes.NgAceScroll) {
      this._aceScroll.update(changes.NgAceScroll.currentValue['height'])
    }
  }
}
