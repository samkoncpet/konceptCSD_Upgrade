import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InboxService } from './inbox.service';
import { NgAceActionService } from 'ng-ace-admin';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: []
})
export class InboxComponent implements OnInit, OnDestroy {

  viewMode = "messageList"
  protected destroy$ = new Subject<void>()

  constructor(private inboxService: InboxService, private actionService: NgAceActionService) { }

  ngOnInit(): void {

    this.inboxService.onAction()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:{ action: string, params?: any }) => {
      if (data.action == 'detail') {
        this.viewMode = "messageDetail"
      }
      else if (data.action == 'list') {
        this.viewMode = "messageList"
      }
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  openComposeDialog() {
    this.actionService.action('#inbox-compose-dialog', 'toggle')
  }

}
