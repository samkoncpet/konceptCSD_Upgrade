import Util from '@ace/util';

const _visibleModalSelector = '.modal.show:not(.modal-nb)'
let _currentBlurredModals = 0


export class AceModal {

    modal: any
    modalRef: any
  
    options: any
    
    _dismissAsideEvent: any
      
    hasBlur = false

    private baseClass = ''

    constructor( el: any , options: any, modalRef: any, baseClass = '' ) { 
      this.modal = el
      this.options = options || {}

      this.modalRef = modalRef

      // we use baseClass instead of 'instanceof' because we don't want to import both ngx and ng in this file, in case user hasn't installed both
      // determine if it's from NgbModalRef or NgbModalRef
      this.baseClass = baseClass ? baseClass : ('_windowCmptRef' in this.modalRef ? 'NgbModalRef' : 'ModalDirective')

      this._init()
    }



    private _init() {
      if (this.options.nb === true) {
        this.modal.classList.add('modal-nb')
      }
 
      // add extra class names
      let dialog = this.modal.querySelector('.modal-dialog') || this.modal.firstElementChild // .modal-dialog
      if (dialog) {
        if (this.options.dialogClass) {
          dialog.className += ` ${this.options.dialogClass}`
        }
  
        if (this.options.width) {
          dialog.style.width = this.options.width
        }
  
        // .modal-content
        let content = dialog.querySelector('.modal-content') || dialog.firstElementChild
        if (this.options.contentClass && content) {
          content.className += ` ${this.options.contentClass}`
        }
      }
  

      // upon init add relevant 'modal-off-{sm|md|lg|xl}' class
      if (typeof this.options.off === 'string') {
        this.modal.classList.add(`modal-off${this.options.off.length > 0 ? '-' : ''}${this.options.off}`)
      }
      else if (this.options.off === true) {
        this.modal.classList.add('modal-off')
      }


      if (this.baseClass == 'NgbModalRef') {
        // in ModalDirective case it is called in _beforeShow
        this.addBlur()

        // Modal OFF
        this.enableOff()
      }
    }


    private _dismiss() {
      if (typeof this.modalRef === 'undefined') return

      if (this.baseClass == 'ModalDirective') {
        this.modalRef.hide()
      }
      else if (this.baseClass == 'NgbModalRef') {
        this.modalRef.dismiss()
      }
    }



    private _checkScrollbars(diff = 0) {
      if (this.modal.scrollHeight - this.modal.clientHeight > diff) {
        document.body.classList.add('modal-scroll')
      }
      else {
        Util.reflow(this.modal) // for firefox. because it's slow to realize we are scrolling .modal now (and not body) (and only modal.offsetTop works!!!)
      }

      const scrollbars = Util.getScrollbarInfo()
      if (scrollbars.width === 0) {
        document.body.classList.add('scrollbar-w0')
      }
    }
  

  
    // a few things before opening modal (NgbModalRef)
    static BeforeShow(modal: any , options: any) {
      options.windowClass = options.windowClass || ''

      // is it a non-blocking modal? (i.e. aside)
      if (options.nb === true || (modal && modal.classList.contains('modal-nb')) || options.windowClass.indexOf('modal-nb') >= 0) {
        if (document.querySelector(_visibleModalSelector) === null) { // if there are no `normal` modals open
          document.body.classList.add('modal-nb') // disable .modal-open effects for .modal-nb
        }
      } else {
        document.body.style.setProperty('--modal-padding', (window.innerWidth - document.body.scrollWidth) + 'px')
      }
    }
  
  
  
    // called only in Ngx ModalDirective
    _beforeShow() {
      if (!this.modal) return

      AceModal.BeforeShow(this.modal, this.options)

      if (!this.modal.classList.contains('ace-aside')) {
        // check to see if we will have modal scrollbars
        this.modal.style.display = 'block'
        this._checkScrollbars()
        this.modal.style.display = ''
      }

      /// add blur function
      this.addBlur()

      // Modal OFF
      this.enableOff()
    }
  

    // after modal is opened/shown
    _afterShow() {
      if (!this.modal) return

      // in case of ModalDirective, it is called in _beforeShow
      if (this.baseClass == 'NgbModalRef' && !this.modal.classList.contains('ace-aside')) {
        setTimeout(() => {
          // check to see if we will have modal scrollbars
          this._checkScrollbars(5) // 5px is because 0f the 0.25rem in .modal::before
        }, 0)
      }

      ///////////

      if (this.options.nb === true || this.modal.classList.contains('modal-nb')) {
        document.body.classList.remove('modal-nb')

        if (document.querySelector(_visibleModalSelector) === null) { // if no blocking modals
          document.body.classList.remove('modal-open')// disable .modal-open effects
          document.body.style.paddingRight = ''// and remove paddingRight
        }
  
        if (this.options.dismiss === true || this.modal.classList.contains('modal-dismiss')) {
          this._dismissAsideEvent = ($event: MouseEvent) => {
            if (!this.modal.contains(<Node>$event.target)) { // clicked outside modal
              // why timeout?
              // because if we click on the same button that triggers this modal, its 'hide' function will be called and instantly followed by 'show' function
              // so we first let 'show' be called and then we call 'hide'
              document.removeEventListener('mouseup', this._dismissAsideEvent)
              this._dismissAsideEvent = null

              setTimeout(() => {
                this._dismiss()
              }, 0)
            }
          }
  
          // why `mouseup`? because 'click' may get 'stopPropagated' in some plugins such as Bootstrap's dropdown
          document.addEventListener('mouseup', this._dismissAsideEvent)
        }
      }


      if (typeof this.options.autohide === 'number') {
        setTimeout(() => {
          this._dismiss()
        }, this.options.autohide)
      }
    }
  
  
  
    // after modal is hidden
    _afterHide() {
      if (!this.modal) return

      if (document.querySelector(_visibleModalSelector) === null) document.body.style.paddingRight = ''// required for rare cases that body padding is still not cleared
      else document.body.classList.add('modal-open') // sometimes an aside is closed (so .modal-open is removed) but a .modal is still open (so we add .modal-open again)
  
      if (!this.modal.classList.contains('modal-nb')) {
        document.body.classList.remove('modal-scroll')
        document.body.classList.remove('scrollbar-w0')
      }
  
      if (this.hasBlur) this._removeBlur()

      if (typeof this._dismissAsideEvent === 'function') {
        document.removeEventListener('mouseup', this._dismissAsideEvent)
      }
    }

  
  
    // disable modal features, for example on 'lg+' screen size
    // and for example if our modal is a `.modal-off-lg` then we add `.d-lg-none` to `.modal-backdrop` to hide it in `lg+` view
  
    private enableOff() {
      let isModalOff = this.modal.className.match(/modal-off(?:(?:-([a-z]+))|\s|$)/i)

      if (isModalOff) this._enableOff(isModalOff[1])
    }

    private _enableOff(modalOff: string) {
      modalOff = modalOff && modalOff.length > 0 ? `-${modalOff}` : ''

      // add d-{sm|md|lg|xl}-none to backdrop
      if (this.baseClass == 'NgbModalRef' && typeof this.modalRef['_backdropCmptRef'] !== 'undefined') {
        this.modalRef['_backdropCmptRef']?.location?.nativeElement.classList.add(`d${modalOff}-none`)
      }
      else if (this.baseClass == 'ModalDirective') {
        // get backdrop
        setTimeout(() => {
          let backdrops = document.querySelectorAll('.modal-backdrop')
          if (backdrops.length > 0) backdrops[backdrops.length - 1].classList.add(`d${modalOff}-none`)
        })
      }
    }
  

  
    private addBlur() {
      if (typeof this.options.blur === 'undefined') {
        let blur = this.modal.getAttribute('data-blur')
        if (!blur || blur == 'false') {
          this.options.blur = false
        }
        else {
          this.options.blur = blur
        }
      }

      this.hasBlur = this.options.blur && this._addBlur(this.options.blur)
    }
  
    private _addBlur(blur: string): boolean {
      if (!blur || !window.CSS || !window.CSS.supports('filter', 'none'))  return false
      
      const bodyContainer = <HTMLElement> document.querySelector('.body-container')
      if (bodyContainer === null) return false
      
      document.body.classList.add('modal-blur')
      bodyContainer.style.filter = 'blur(' + blur + ')'

      // move modal so blur effects can take place
      if (this.modal.parentElement !== document.body) {
        this.modal['__modalParent'] = this.modal.parentElement
        this.modal['__modalNextSibling'] = this.modal.nextSibling

        document.body.appendChild(this.modal)
      }
  
      _currentBlurredModals++
      return true
    }
  
  
    private _removeBlur(): void {
      if (_currentBlurredModals > 1) {// we have more than one blurred modals on top of each other?
        _currentBlurredModals--
        return
      }
  
      const bodyContainer = <HTMLElement> document.querySelector('.body-container')
      if (bodyContainer === null) return
  
      _currentBlurredModals--
  
      document.body.classList.remove('modal-blur')
      bodyContainer.style.filter = ''

      // if we've moved modal for blur effects, move it back
      if (typeof this.modal['__modalParent'] === 'object') {
        this.modal['__modalParent'].insertBefore(this.modal, this.modal['__modalNextSibling'])
        
        delete this.modal['__modalParent']
        delete this.modal['__modalNextSibling']
      }
    }
  }