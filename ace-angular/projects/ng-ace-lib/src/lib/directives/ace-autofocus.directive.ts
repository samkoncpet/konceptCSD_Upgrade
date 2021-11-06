import { Directive, ElementRef, NgZone, OnInit, Optional } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgbCollapse, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[NgAceAutofocus]'
})
export class NgAceAutofocus implements OnInit {

  protected destroy$ = new Subject<void>()
  constructor(private el:ElementRef, private ngZone: NgZone, @Optional() private ngbCollapse: NgbCollapse, @Optional() private ngbDropdown: NgbDropdown) { }

  ngOnInit() {
    this.ngbCollapse?.shown
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.el.nativeElement.focus()
    })

    this.ngbDropdown?.openChange
    .pipe(takeUntil(this.destroy$))
    .subscribe((isOpen: boolean) => {
      if (isOpen === true) {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {// wait for it to be shown
            this.el.nativeElement.focus()
          })
        })
      }
    })
  }


  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
