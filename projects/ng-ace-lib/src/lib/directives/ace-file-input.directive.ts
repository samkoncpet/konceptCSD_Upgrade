import { Directive, OnInit, ElementRef, Input, OnChanges, SimpleChanges, Output, EventEmitter, NgZone, Injector } from '@angular/core';

import { AceActionHandler } from '../classes/ace-action-handler'


import AceFileInput from '@ace/fileinput';


@Directive({
  selector: '[NgAceFile]',
  exportAs: 'NgAceFile',
  host: {
    'class': 'ace-file-input'
  }
})
export class NgAceFileInput extends AceActionHandler implements OnInit, OnChanges {

  fileInput: any;
  element: any;

  @Input() NgAceFile!: any;

  @Output() onChanged = new EventEmitter<any>()
  @Output() onInvalidError = new EventEmitter<any>()
  @Output() onPreviewError = new EventEmitter<any>()
  @Output() onClear = new EventEmitter()



  constructor(private el: ElementRef, private ngZone: NgZone, protected injector: Injector) {
    super(injector)
    ///////////////

    this.element = this.el.nativeElement
    this.prevented = {
      clear: false
    }  
  }

  //////*********//////

  ngOnInit() {
    super.init()
    ////////////
  
    this.ngZone.runOutsideAngular(() => {
      this.fileInput = AceFileInput.getInstance(this.element, this.NgAceFile || {})

      this.element.addEventListener('changed.ace.file', ($event: any) => {
        this.onChanged.emit($event.$_selectedFiles)
      })

      this.element.addEventListener('invalid.ace.file', ($event: any) => {
        this.onInvalidError.emit($event.$_fileErrors)
      })

      this.element.addEventListener('preview_failed.ace.file', ($event: any) => {
        this.onPreviewError.emit($event.$_previewError)
      })

      this.element.addEventListener('clear.ace.file', ($event: Event) => {
        if (this.isPrevented('clear')) $event.preventDefault()
        else {
          this.onClear.emit()
        }
      })
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.NgAceFile) {
      this.fileInput?.updateSettings(changes.NgAceFile.currentValue)
    }
  }

  files(): any {
    return this.fileInput?.files()
  }

  method(): any {
    return this.fileInput?.method()
  }

  showFileList(files: any) {
    this.fileInput?.showFileList(files)
  }

  reset() {
    this.fileInput?.resetInput()
  }

  enableReset() {
    this.fileInput?.enableReset()
  }

  disbleReset() {
    this.fileInput?.disbleReset()
  }

  enable() {
    this.fileInput?.enable()
  }

  disable() {
    this.fileInput?.disable()
  }

  startLoading(loadingHtml?: string) {
    this.fileInput?.startLoading(loadingHtml)
  }

  stopLoading() {
    this.fileInput?.stopLoading()
  }
}
