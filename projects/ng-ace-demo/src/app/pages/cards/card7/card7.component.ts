import { Component, ElementRef, Injector, AfterViewInit } from '@angular/core';
import { BasicCardComponent } from '../basic-card/basic-card.component';

@Component({
  selector: 'app-demo-card#card7',
  templateUrl: './card7.component.html',
  styleUrls: []
})
export class Card7Component extends BasicCardComponent implements AfterViewInit {

  constructor(el: ElementRef, injector: Injector) { 
    super(el, injector)
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit()
  }
}
