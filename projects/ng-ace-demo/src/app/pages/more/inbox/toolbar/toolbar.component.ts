import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InboxService } from '../inbox.service';

import { NgAceActionService } from 'ng-ace-admin';


@Component({
  selector: 'app-inbox-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: []
})
export class ToolbarComponent implements OnInit, OnDestroy {

  protected destroy$ = new Subject<void>()

  selectedCount = 0

  selectedAll = false
  partiallySelected = false

  constructor(private inboxService: InboxService, private actionService: NgAceActionService) { }

  ngOnInit(): void {
    this.inboxService.onAction()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:{ action: string, params?: any }) => {
      if (data.action == 'toggleMessage') {

        if (this.selectedAll && this.selectedCount == 0) {
          // we should update selectedCount
          // because we come after a `unselecteAll` (in toggleAll) that made selectedCount = 0
          // and a following `selectAll` (still selectedCount = 0)          
          this.selectedCount = data.params.messages.length
        }

        if (data.params.isSelected) {
          this.selectedCount++
          if (this.selectedCount > data.params.messages.length) this.selectedCount = data.params.messages.length
        }
        else {
          this.selectedCount--
          if (this.selectedCount < 0) this.selectedCount = 0
        }

        this.partiallySelected = false
        this.selectedAll = false

        if (this.selectedCount == data.params.messages.length) {
          this.selectedAll = true          
        }
        else if (this.selectedCount == 0) {
          this.selectedAll = false
        }
        else {
          this.partiallySelected = true
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  toggleAll() {
    this.partiallySelected = false
    if (!this.selectedAll) this.selectedCount = 0

    this.inboxService.action('toggleAll', {isSelected: this.selectedAll})
  }


  // for small (mobile) devices
  openInboxMenu() {
    this.actionService.action('#inbox-side-menu', 'toggle')
  }
}
