import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import noUiSlider from 'nouislider';
import { ResourceService } from '../../../../_services/resource.service';

@Component({
  selector: 'app-search-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: []
})
export class FilterMenuComponent implements OnInit {

  constructor(private resourceLoader: ResourceService) { }

  ngOnInit(): void {
    this.resourceLoader.prependCSS('https://cdn.jsdelivr.net/npm/nouislider/distribute/nouislider.min.css').then(() => {
      this.initPriceSlider()
    })
  }


  @ViewChild('slider', {static: true}) slider!: ElementRef;
  initPriceSlider() {
    let slider = this.slider.nativeElement
  
    noUiSlider.create(slider, {
      tooltips: true,
      start: [50, 150],
      connect: true,
      range: {
          'min': 0,
          'max': 200
      },
      format: {
          from: function(value: any) {
              return parseInt(value)
          },
          to: function(value: any) {
              return parseInt(value)
          }
      }
    })
  
    slider.querySelectorAll('.noUi-handle').forEach((el: any) => { el.className += ' brc-info-d2 border-2 radius-1'})
    slider.querySelectorAll('.noUi-base').forEach((el: any) => { el.className += ' bgc-grey-l1'})
    slider.querySelectorAll('.noUi-connect').forEach((el: any) => { el.className += ' bgc-info-d2'})
    slider.querySelectorAll('.noUi-tooltip').forEach((el: any) => { el.className += ' bgc-dark-tp1 text-white border-0 text-90 radius-1 px-2'})
  
  }

}
