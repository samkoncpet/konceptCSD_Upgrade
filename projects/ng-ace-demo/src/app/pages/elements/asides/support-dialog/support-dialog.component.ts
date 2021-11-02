import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import conversations from './conversations.json';

@Component({
  selector: 'asides-support-dialog',
  templateUrl: './support-dialog.component.html',
  styleUrls: ['./support-dialog.component.scss']
})
export class SupportDialogComponent implements OnInit {

  conversations: any;
  constructor(private modal: ModalDirective) { }

  ngOnInit(): void {
    this.conversations = conversations
  }

  closeModal(): void {
    this.modal.hide()
  }

}
