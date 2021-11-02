import { Component,  ElementRef, AfterViewInit, Injector } from '@angular/core';
import { BasicCardComponent } from '../basic-card/basic-card.component';

@Component({
  selector: 'app-demo-card#card1',
  templateUrl: './card1.component.html',
  styleUrls: []
})
export class Card1Component extends BasicCardComponent implements AfterViewInit {

  constructor(el: ElementRef, injector: Injector) { 
    super(el, injector)
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit()
  }



  resetAll() {
    localStorage.setItem('reset.ace', 'true')
    document.location.reload()
  }

}
