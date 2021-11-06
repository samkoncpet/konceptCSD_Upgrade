import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InboxService } from '../inbox.service';

@Component({
  selector: 'app-inbox-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: []
})
export class MessageDetailComponent implements OnInit, OnDestroy {

  messageInfo: any;
  protected destroy$ = new Subject<void>()

  constructor(private inboxService: InboxService) { }

  ngOnInit(): void {
    this.inboxService.onAction()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:{ action: string, params?: any }) => {
      if (data.action == 'detail') {
        this.messageInfo = data.params.messageInfo
      }
    })
  }


  backToMessageList() {
    this.inboxService.showMessageList()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
