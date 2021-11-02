import { Directive, ElementRef, OnInit } from '@angular/core';


import Util from '@ace/util';

@Directive({
  selector: '[NgAcePopover]',
  host: {
    'class': 'popover m-0',
    'role': 'tooltip'
  }
})
export class NgAcePopover implements OnInit {

  element: any;
  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement
  }

  ngOnInit() : void {
    setTimeout(() => {
      let popover = Util.closest(this.element.parentElement, '.popover')
      if (!popover) return

      popover.classList.add('ng-custom-popover')

      let placement = popover.className.match(/bs-popover-([a-z]+)/)
      if (placement) this.element.classList.add(`bs-popover-${placement[1]}`)      
    })
  }

}
