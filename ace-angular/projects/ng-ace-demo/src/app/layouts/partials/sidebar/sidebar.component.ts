import { Component, ElementRef } from '@angular/core';


import { SidebarDataService }  from './sidebar-data.service';

import sidebarData from './sidebar.json';
import { LocalstorageService } from '../../../../app/config/localstorage.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
  export class SidebarComponent {
    sidebarItems: any // top-level items (i.e. parent nodes)

    constructor(private el: ElementRef, private sidebarDataService: SidebarDataService,
      private _localstorageService: LocalstorageService) {
    }

    ngOnInit(): void {
      this.sidebarItems = this.sidebarDataService.getItems(sidebarData)
      // var data = this._localstorageService.localstorageGet("navigationmenu");
      // this.sidebarItems = this.sidebarDataService.getItems(JSON.parse(data));
    }

    // let's keep track of total open items
    // so we can add '.has-open' to '.sidebar'
    // .has-open class is only needed in some sidebar themes
    // so we can ignore this most of the time
    totalOpen = 0
    onToggleItem($event: any) {
      let item = $event;
      if (item.open) this.totalOpen++
      else this.totalOpen--

      this.el?.nativeElement.classList.toggle('has-open', this.totalOpen > 0)
    }
  }
