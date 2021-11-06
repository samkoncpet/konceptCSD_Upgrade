import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import conversations from './conversation.json';


@Component({
  selector: 'dashboard-conversation',
  templateUrl: './conversation.component.html'
})
export class ConversationComponent implements OnInit, AfterViewInit {

  conversations: any;

  @ViewChild('scrollEl') scrollEl: any;
  @ViewChild('card') card: any;// NgAceCard

  constructor() {
  }

  ngOnInit(): void {
    this.conversations = conversations
  }

  
  ngAfterViewInit(): void {
    var _scroller = this.scrollEl.nativeElement;
    if (_scroller) _scroller.style.maxHeight = _scroller.parentNode.clientHeight + 'px'
  }

  reload(): void {
    this.card.startLoading()
    setTimeout(() => {
      this.card.stopLoading()
    }, Math.random() * 1500 + 500)
  }

}
