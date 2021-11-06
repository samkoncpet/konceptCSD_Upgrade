import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import Util from '@ace/util';

import { InboxService } from '../inbox.service';

import messages from './messages.json'

@Component({
  selector: 'app-inbox-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  messages = messages
  protected destroy$ = new Subject<void>()

  constructor(private inboxService: InboxService) { }

  ngOnInit(): void {
    this.inboxService.onAction()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:{ action: string, params?: any }) => {
      if (data.action == 'toggleAll') {
        let isSelected = data.params.isSelected
        messages.forEach((message: any) => message.selected = isSelected)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  showMessageDetail(event: Event, messageInfo: any) {
    // don't show message details if clicked on or inside a [preventDetailClick] element
    if (Util.closest(event.target, '[preventDetailClick]') !== null) return

    this.inboxService.showMessageDetail(messageInfo)
  }

  isSelected(message: any) {
    if (typeof message.selected !== 'undefined') return message.selected
    return false
  }

  toggleSelected(message: any) {
    if (typeof message.selected === 'undefined') message.selected = true;
    else message.selected = !message.selected;

    this.inboxService.action('toggleMessage', {isSelected: message.selected, messages: messages})
  }
}
