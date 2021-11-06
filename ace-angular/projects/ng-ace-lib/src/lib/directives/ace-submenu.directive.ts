import { Directive, OnInit, Input, EventEmitter, ElementRef, Output } from '@angular/core';

import { NgAceSidebarStateService }  from '../services/sidebar-state.service';

import { NgAceSidebar }  from './ace-sidebar.directive';

import Util from '@ace/util';


@Directive({
    selector: '[NgAceSubmenu]',
    exportAs: 'NgAceSubmenu'
  })
  export class NgAceSubmenu implements OnInit {
    @Input() items!: any;
    currentOpenItem!: any;

    @Input() autoOpen!: boolean; // open the 'active' elements (submenus) by default
    @Input() closeOthers = true; // when another one is opened, close one submenu

    @Output() onToggleItem = new EventEmitter<any>()

    element: any;

    sidebarId : any
    constructor(
      private sidebarStateService: NgAceSidebarStateService,
      private ngAceSidebar: NgAceSidebar,
      private el: ElementRef
      ) {
        this.currentOpenItem = null
        this.element = this.el.nativeElement
    }


    ngOnInit(): void {
      this.sidebarId = this.ngAceSidebar.element.id || null

      this.autoOpen = this.autoOpen || this.ngAceSidebar.autoOpen

      if (!this.autoOpen || !this.sidebarId) return

      this.items?.forEach((item: any) => {
        if (this.sidebarStateService.isOpen(this.sidebarId, item.id)) {
          item['open'] = true
          this.onToggleItem.emit(item)
          this.currentOpenItem = item // if we come back from another layout (like login) to main, and a submenu is open, we assign it to currentOpenItem, so it will be closed once another submenu is opened
        }
      })
    }


    // also close the previous "open" submenu if "closeOthers" is true
    toggle(navItem: any, navItemSub?: NgAceSubmenu) {
      navItem.open = !navItem.open
      this.onToggleItem.emit(navItem)

      if (!this.autoOpen || !this.sidebarId) return

      if (navItem.open && this.currentOpenItem != navItem) {
        if (this.currentOpenItem && this.currentOpenItem.open && this.closeOthers) {
          this.sidebarStateService.unOpen(this.sidebarId, this.currentOpenItem.id)
          this.currentOpenItem.isToggling = true
          this.currentOpenItem.open = false
          this.onToggleItem.emit(this.currentOpenItem)
        }
  
        this.sidebarStateService.setOpen(this.sidebarId, navItem.id)
        this.currentOpenItem = navItem
      }


      if (navItem.open && navItemSub) {
        // navItemSub is the current submenu related to navItem, being opened
        // and we scroll it into view when opened
        let submenuEl = Util.closest(navItemSub.element, '.submenu')
        if (!submenuEl) return
        this.ngAceSidebar.sidebar._submenuScroll(submenuEl, 180)// wait 180ms before scrolling
      }
    }
  }