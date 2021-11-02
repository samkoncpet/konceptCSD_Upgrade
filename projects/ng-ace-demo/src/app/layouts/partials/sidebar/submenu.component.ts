import { Component, Input, ViewChild } from '@angular/core';

import { NgAceSubmenu } from 'ng-ace-admin';

@Component({
    selector: 'app-sidebar-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.scss']
  })
  export class SidebarSubmenuComponent {
    @Input() items!: any;

    constructor(public parentSubmenu: NgAceSubmenu) {
    }

    toggleSubmenu(navItem: any, navItemSub?: NgAceSubmenu) {
      navItem.isToggling = true // adds '.is-toggling' class which is used in CSS themes

      // `parentSubmenu` is usually the main `.nav` in `.sidebar` (the parent `NgAceSubmenu`)
      this.parentSubmenu.toggle(navItem, navItemSub)
    }

  }