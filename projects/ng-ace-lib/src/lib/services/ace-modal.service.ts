import { Injectable, NgZone } from '@angular/core';

import { first } from 'rxjs/operators';


import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AceModal } from '../classes/ace-modal'

@Injectable({
  providedIn: 'root'
})
export class NgAceModalService {
  constructor(
    private ngbModalService: NgbModal,
    private _ngZone: NgZone
  ) { }

  open(content: any, options?: any) : NgbModalRef | undefined {
    let modalRef
    this._ngZone.runOutsideAngular(() => {
      options = options || {}

      AceModal.BeforeShow(null, options)

      modalRef = this.ngbModalService.open(content, options)

      let modalElement = modalRef['_windowCmptRef']?.location?.nativeElement

      let modal = new AceModal(modalElement, options, modalRef, 'NgbModalRef')

      modalRef.shown.pipe(first()).subscribe(() => {
        modal._afterShow()
      })

      modalRef.hidden.pipe(first()).subscribe(() => {
        modal._afterHide()
      })
    })

    return modalRef    
  }

}
