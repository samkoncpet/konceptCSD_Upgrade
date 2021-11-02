import { Directive, ElementRef, NgZone, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import AceSticky from '@ace/sticky';

@Directive({
  selector: '[NgAceSticky]'
})
export class NgAceSticky implements OnInit, OnDestroy {
  sticky: any;
  element: any;

  @Output() stuck = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private _ngZone: NgZone) {
    this.element = this.el.nativeElement
  }

  private stickyCallback = (event: any) => {
    this.stuck.emit(event.detail.isSticky)
  }

  ngOnInit(): void {
    this._ngZone.runOutsideAngular(() => {
      this.sticky = AceSticky.getInstance(this.element)

      this.element.addEventListener('sticky-change', this.stickyCallback)
    })
  }

  ngOnDestroy(): void {
    this.element.removeEventListener('sticky-change', this.stickyCallback)
  }

}
