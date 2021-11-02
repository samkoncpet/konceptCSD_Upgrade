import { Component,  ElementRef, Injector, AfterViewInit } from '@angular/core';
import { BasicCardComponent } from '../basic-card/basic-card.component';

@Component({
  selector: 'app-demo-card#card5',
  templateUrl: './card5.component.html',
  styleUrls: []
})
export class Card5Component extends BasicCardComponent implements AfterViewInit {

  constructor(el: ElementRef, injector: Injector) { 
    super(el, injector)
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit()
  }
}
