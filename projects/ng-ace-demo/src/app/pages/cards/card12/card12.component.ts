import { Component, ElementRef, Injector, AfterViewInit } from '@angular/core';
import { BasicCardComponent } from '../basic-card/basic-card.component';

@Component({
  selector: 'app-demo-card#card12',
  templateUrl: './card12.component.html',
  styleUrls: []
})
export class Card12Component extends BasicCardComponent implements AfterViewInit {

  constructor(el: ElementRef, injector: Injector) { 
    super(el, injector)
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit()
  }
}
