import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-demo-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit {
  
  @Output() tabChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  gotoTab(tabId: any) {
    this.tabChange.emit(tabId)
  }

}
