import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

import Util from '@ace/util';

@Component({
  selector: 'app-login-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntroComponent implements OnInit {

  constructor() { }

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  showNavigationArrows = false
  showNavigationIndicators = false
  paused = true

  ngOnInit(): void {
    this.carousel.pause()
  }

  startCarousel(): void {
    this.carousel.cycle()
    this.carousel.next()
    this.showNavigationIndicators = true
  }



  isFullsize = false;

  // remove the background/carousel section
  // if you want a compact login page (without the carousel area), you should do so in your HTML
  // but in this demo, we modify HTML using JS
  removeCarousel(): void {
    Util.remove('#id-col-intro')// remove the .col that contains carousel/intro
    Util.removeClass('#id-col-main', 'col-lg-7') // remove the col-* class name for the login area

    Util.addClass('#row-1', 'justify-content-center')

    // change .col-12.col-xl-10, etc to .col-12.col-lg-6.col-xl-5 (so our login area is 50% of document width in `lg` mode , etc)
    Util.removeClass('#row-1 > .col-12', 'col-xl-10 offset-xl-1')
    if (!this.isFullsize) Util.addClass('#row-1 > .col-12', 'col-lg-6 col-xl-5')

    // the input elements that are inside "col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3" columns
    // ... remove '.col-lg-6 offset-lg-3' (will become .col-md-8)
    Util.removeClass('.col-md-8.offset-md-2.col-lg-6.offset-lg-3', 'col-lg-6 offset-lg-3')


    // remove "Welcome Back" etc titles that were meant for desktop, and show the other titles that were meant for mobile (lg-) view
    // because this compact login page is similar to mobile view
    document.querySelectorAll('h4').forEach((el: HTMLElement) => {
        var mobileTitle = el.parentElement.nextElementSibling
        if (mobileTitle.classList.contains('d-lg-none')) {
          mobileTitle.classList.remove('d-lg-none')
          Util.remove(mobileTitle.previousElementSibling)
        }
    })
  }

  // make the login area fullscreen
  // if you want a fullscreen login page you should do so in your HTML
  // but in this demo, we modify HTML using JS
  makeFullsize(): void {
    if (this.isFullsize) return
    this.isFullsize = true;
  
    if (window.navigator.msPointerEnabled) Util.addClass('.body-container', 'h-100') // for IE only

    Util.removeClass('.main-container', 'container')

    let mainc = document.querySelector('.main-content')
    Util.removeClass(mainc, 'justify-content-center minh-100')
    Util.addClass(mainc, 'px-4 px-lg-0')
    mainc.childNodes.forEach((el: HTMLElement) => {
      el.className = 'd-flex flex-column flex-lg-row flex-grow-1 my-3 m-lg-0' // removes padding classes and add d-flex, etc
    })

    Util.addClass('app-login', 'd-flex')

    Util.addClass('#row-1', 'flex-grow-1')
    //remove shadow, etc from, the child .col and add d-lg-flex
    Util.removeClass('#row-1 > .col-12', 'shadow radius-1 col-xl-10 offset-xl-1')
    Util.addClass('#row-1 > .col-12', 'd-lg-flex')

    Util.addClass('#row-2', 'flex-grow-1')

    Util.removeClass('#id-col-intro', 'col-lg-5')
    Util.addClass('#id-col-intro', 'col-lg-4')

    Util.removeClass('#id-col-main', 'col-lg-7 offset-2')
    Util.addClass('#id-col-main', 'col-lg-6 mx-auto d-flex align-items-center justify-content-center')
  }

}
