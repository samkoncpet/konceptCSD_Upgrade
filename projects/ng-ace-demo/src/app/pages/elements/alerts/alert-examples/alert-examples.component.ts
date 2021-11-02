import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-alert-examples',
  templateUrl: './alert-examples.component.html'
})
export class AlertExamplesComponent {

  constructor(private renderer2: Renderer2) { }


  removeAlert(alert: any) {
    let el = alert._element.nativeElement
    this.renderer2.removeChild(el.parentNode, el)
  }



}
