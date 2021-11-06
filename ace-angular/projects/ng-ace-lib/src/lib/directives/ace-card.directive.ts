import { Injector, Directive, ElementRef, OnInit, OnDestroy, HostListener, NgZone, Input, Output, EventEmitter, SimpleChanges, OnChanges, Optional } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AceActionHandler } from '../classes/ace-action-handler'


import AceCard from '@ace/card';


@Directive({
  selector: '[NgAceCard]',
  exportAs: 'NgAceCard'
})
export class NgAceCard extends AceActionHandler implements OnInit, OnDestroy, OnChanges {
  card: any;

  @Input() fullscreen = false;
  @Output() fullscreenChange = new EventEmitter<boolean>()

  @Output() onExpanded = new EventEmitter<void>()
  @Output() onRestored = new EventEmitter<void>()

  @Output() onClosed = new EventEmitter<void>()

  @Output() onLoad = new EventEmitter<boolean>()


  constructor(    
    protected injector: Injector,
    private _ngZone: NgZone,
    @Optional() private el: ElementRef
   ) {
    super(injector, 2)
    ///////////////

    this.element = this.el?.nativeElement

    this.prevented = {
      expand: false,
      restore: false,
      close: false,
      reload: false
    }
  }


  //////*********//////
  // Card events
  @HostListener('expand.ace.card', ['$event'])
  onExpandCallback(event: Event) {
    if (this.isPrevented('expand')) event.preventDefault()
  }

  @HostListener('restore.ace.card', ['$event'])
  onRestoreCallback(event: Event) {
    if (this.isPrevented('restore')) event.preventDefault()
  }

  @HostListener('close.ace.card', ['$event'])
  onCloseCallback(event: Event) {
    if (this.isPrevented('close')) event.preventDefault()
  }

  @HostListener('reload.ace.card', ['$event'])
  onReloadCallback(event: Event) {
    if (this.isPrevented('reload')) event.preventDefault()
    this.onLoad.emit(true)
  }

  @HostListener('reloaded.ace.card')
  onReloadedCallback() {
    this.onLoad.emit(false)
  }


  @HostListener('expanded.ace.card')
  onExpandedCallback() {
    this.onExpanded.emit()
  }

  @HostListener('restored.ace.card')
  onRestoredCallback() {
    this.onRestored.emit()
  }

  @HostListener('closed.ace.card')
  onClosedCallback() {
    this.onClosed.emit()
  }

  //

  ngOnInit(): void {
    super.init()
    ////////////


    this._ngZone.runOutsideAngular(() => {
      this.card = AceCard.getInstance(this.element, {toggle: false})
    })
    this.fullscreen = this.card?.isFullscreen()

    this.fullscreenChange
    .pipe(takeUntil(this.destroy$))
    .subscribe((value: boolean) => {
      this.fullscreen = value
    })
  }

  
  _unsubscribe(): void {
    super.destroy()
  }

  ngOnDestroy(): void {   
    this._unsubscribe()
  }

  close() {
    if (this.isPrevented('close')) return

    this._unsubscribe()

    this._ngZone.runOutsideAngular(() => this.card?.close())
  }

  expand() {
    if (this.isPrevented('expand')) return

    this._ngZone.runOutsideAngular(() => this.card?.expand())

    this.fullscreen = this.card?.isFullscreen()

    this.fullscreenChange.emit(this.fullscreen)
  }

  restore() {
    if (this.isPrevented('restore')) return

    this._ngZone.runOutsideAngular(() => this.card?.restore())

    this.fullscreen = this.card?.isFullscreen()

    this.fullscreenChange.emit(this.fullscreen)
  }

  toggleFullscreen() {
    this.fullscreen = this.card?.isFullscreen()

    if (this.fullscreen) {
      this.restore()
    }
    else {
      this.expand()
    }
  }


  reload() {
    if (this.isPrevented('reload')) return

    this._ngZone.runOutsideAngular(() => this.card?.reload())
  }

  startLoading(loadingHtml?: string) {
    this._ngZone.runOutsideAngular(() => this.card?.startLoading(loadingHtml))
  }

  stopLoading() {
    this._ngZone.runOutsideAngular(() => this.card?.stopLoading())
  }

  // respond to changes to 'fullscreen'
  ngOnChanges(changes: SimpleChanges) {
    if (!this.card) return

    if (changes.fullscreen) {
      if (changes.fullscreen.currentValue === true) {
        this.expand()
      }
      else {
        this.restore()
      }
    }
  }

}
