import { Injector, Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

import { takeUntil } from 'rxjs/operators';


import { ModalDirective }  from 'ngx-bootstrap/modal';


import { AceActionHandler } from '../classes/ace-action-handler'
import { AceModal } from '../classes/ace-modal';


@Directive({
  selector: '[bsModal][NgAceModal]',
  exportAs: 'NgAceModal'
})
export class NgAceModal extends AceActionHandler implements OnInit, OnDestroy {
  @Input() NgAceModal: any; // the options passed to Directive

  modal: any;
  options: any;


  constructor(
    private el: ElementRef,
    protected injector: Injector,
    private ngxModal: ModalDirective, //reference to ngx-bootstrap's ModalDirective
  )
  {
    super(injector)
    ///////////////

    this.element = this.el.nativeElement

    this.prevented = {
      hide: false,
      show: false
    }
  }


  ngOnInit() : void {
    super.init()
    ////////////

    this.options = this.NgAceModal || {}
    this.modal = new AceModal(this.element, this.options, this.ngxModal, 'ModalDirective')


    this.ngxModal.onShow
    .pipe(takeUntil(this.destroy$))
    .subscribe(($event: any) => {
      this.modal._beforeShow()
    })

    this.ngxModal.onShown
    .pipe(takeUntil(this.destroy$))
    .subscribe(($event: any) => {
      this.modal._afterShow()
    })

    this.ngxModal.onHidden
    .pipe(takeUntil(this.destroy$))
    .subscribe(($event: any) => {
      this.modal._afterHide()
    })

  }

  ngOnDestroy(): void {
    super.destroy()
    ////////////
  }


  show() {
    if (this.isPrevented('show')) return
    this.ngxModal.show()
  }

  hide() {
    if (this.isPrevented('hide')) return
    this.ngxModal.hide()
  }

  toggle() {
    if (this.ngxModal.isShown) {
      if (this.isPrevented('hide')) return
    }
    else {
      if (this.isPrevented('show')) return
    }

    this.ngxModal.toggle()
  }

}
