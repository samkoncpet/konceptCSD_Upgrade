import { Injector, Directive, OnInit, OnDestroy, EventEmitter, OnChanges, HostListener, SimpleChanges, NgZone, Input, Output, ElementRef, AfterViewInit  } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { takeUntil } from 'rxjs/operators';


import { AceActionHandler } from '../classes/ace-action-handler'

import { NgAceSidebarStateService }  from '../services/sidebar-state.service';


import AceSidebar from '@ace/sidebar';


@Directive({
  selector: '[NgAceSidebar]',
  exportAs: 'NgAceSidebar'
})
export class NgAceSidebar extends AceActionHandler implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  sidebar: any
  @Input() NgAceSidebar: any; // the options passed to Directive
  @Input() autoOpen! : boolean; // open the 'active' elements (submenus) by default on init
  @Input() autoRestore! : boolean; // restore scroll position and don't always 'open' the active item, for example if we are back from another layout (login), open the login's parent submenu
  @Input() autoHide! : boolean; // hide sidebar in mobile view when we click on a new route

  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>()
  @Output() onCollapsed = new EventEmitter()
  @Output() onExpanded = new EventEmitter()

  @Input() hidden = true;
  @Output() hiddenChange = new EventEmitter<boolean>()
  @Output() onShown = new EventEmitter()
  @Output() onHidden = new EventEmitter()


  constructor(
    private el: ElementRef,
    private _ngZone: NgZone,
    private router: Router,
    protected injector: Injector,
    private sidebarStateService: NgAceSidebarStateService
    ) {
      super(injector, 1)
      ///////////////

      this.element = this.el.nativeElement

      this.prevented = {
        collapse: false,
        expand: false,
        hide: false,
        show: false
      }

      this.collapsed = false
      this.hidden = true
  }




  //////*********//////
  // sidebar desktop events
  @HostListener('collapse.ace.sidebar', ['$event'])
  onCollapseCallback(event: Event) {
    if (this.isPrevented('collapse')) event.preventDefault()
    this.collapsedChange.emit(true)
  }

  @HostListener('expand.ace.sidebar', ['$event'])
  onExpandCallback(event: Event) {
    if (this.isPrevented('expand'))  event.preventDefault()
    this.collapsedChange.emit(false)
  }

  @HostListener('collapsed.ace.sidebar')
  onCollapsedCallback() {
    this.onCollapsed.emit()
  }

  @HostListener('expanded.ace.sidebar')
  onExpandedCallback() {
    this.onExpanded.emit()
  }


  //////*********//////
  // sidebar mobile events
  @HostListener('hide.ace.sidebar', ['$event'])
  onHideCallback(event: Event) {
    if (this.isPrevented('hide')) event.preventDefault()
    this.hiddenChange.emit(true)
  }

  @HostListener('show.ace.sidebar', ['$event'])
  onShowCallback(event: Event) {
    if (this.isPrevented('show')) event.preventDefault()
    this.hiddenChange.emit(false)
  }

  @HostListener('hidden.ace.sidebar')
  onHiddenCallback() {
    this.onHidden.emit()
  }

  @HostListener('shown.ace.sidebar')
  onShownCallback() {
    this.onShown.emit()
  }



  ///////////



  ngOnInit(): void {
    super.init()
    ////////////

    this.autoOpen = typeof this.autoOpen !== 'undefined' ? this.autoOpen : true
    this.autoRestore = typeof this.autoRestore !== 'undefined' ? this.autoRestore : true
    this.autoHide = typeof this.autoHide !== 'undefined' ? this.autoHide : true

    this._ngZone.runOutsideAngular(() => {
      let options = this.NgAceSidebar || {}
      options['subtoggle'] = false
      this.sidebar = AceSidebar.getInstance(this.element, options)
    })

    this.collapsed = this.sidebar.isCollapsed()
    this.hidden = this.sidebar.isHidden()

    this.collapsedChange
    .pipe(takeUntil(this.destroy$))
    .subscribe((value: boolean) => {
      this.collapsed = value
    })

    this.hiddenChange
    .pipe(takeUntil(this.destroy$))
    .subscribe((value: boolean) => {
      this.hidden = value
    })



    ///
    if (this.autoOpen && this.element.id) this.sidebarStateService.setOpenOnLoad(this.element.id, this.router.url, this.autoRestore)

    this.router.events
    .pipe(takeUntil(this.destroy$))
    .subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // if mobile sidebar is visible, on navigation change hide it
        if (this.autoHide && !this.sidebar.isHidden()) {
          this.sidebar.hide()
        }
      }
      else if (val instanceof NavigationStart) {
        if (this.autoRestore) {
          // we want to end up at the same sidebar scroll position
          // useful for when we navigate away from this layout to another, and then we come back
          let scroller = this.element.querySelector('[class*="ace-scroll"]')
          if (scroller && this.element.id) {
            this.sidebarStateService.set(this.element.id, 'scroll', scroller.scrollTop)
          }
        }
      }
    })

  }



  ngOnDestroy(): void {
    super.destroy()
    ////////////
  }


  ngAfterViewInit(): void {
    if (!this.autoRestore) return
    let scroller = this.element.querySelector('[class*="ace-scroll"]')
    if (scroller && this.element.id) {
      let scroll = this.sidebarStateService.get(this.element.id , 'scroll')
      if (scroll) scroller.scrollTop = scroll
    }
  }

  // respond to changes to 'collapsed' or 'hidden'
  ngOnChanges(changes: SimpleChanges) {
    if (!this.sidebar) return

    if(changes.collapsed) {
      if (changes.collapsed.currentValue === true) {
        this.collapse()
      }
      else {
        this.expand()
      }
    }
    else if(changes.hidden) {
      if (changes.hidden.currentValue === true) {
        this.hide()
      }
      else {
        this.show()
      }
    }
  }


  // AceSidebar functions
  toggle() : void {
    if (this.sidebar.isCollapsed()) {
      this.expand()
    }
    else {
      this.collapse()
    }
  }
  collapse() : void {
    if (this.isPrevented('collapse')) return
    this._ngZone.runOutsideAngular(() => this.sidebar.collapse())
    this.collapsed = this.sidebar.isCollapsed()
  }
  expand() : void {
    if (this.isPrevented('expand')) return
    this._ngZone.runOutsideAngular(() => this.sidebar.expand())
    this.collapsed = this.sidebar.isCollapsed()
  }

  toggleMobile() : void {
    if (this.sidebar.isHidden()) {
      this.show()
    }
    else {
      this.hide()
    }
  }
  hide() : void {
    if (this.isPrevented('hide')) return
    this._ngZone.runOutsideAngular(() => this.sidebar.hide())
    this.hidden = this.sidebar.isHidden()
  }
  show() : void {
    if (this.isPrevented('show')) return
    this._ngZone.runOutsideAngular(() => this.sidebar.show())
    this.hidden = this.sidebar.isHidden()
  }

}
