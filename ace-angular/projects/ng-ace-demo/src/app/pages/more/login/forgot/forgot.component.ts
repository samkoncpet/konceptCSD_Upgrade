import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-demo-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: []
})
export class ForgotComponent implements OnInit {

  @Output() tabChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  gotoTab(tabId: any) {
    this.tabChange.emit(tabId)
  }

}
