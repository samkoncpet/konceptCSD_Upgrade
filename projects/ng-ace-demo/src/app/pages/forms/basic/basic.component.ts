import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation, NgZone, ElementRef } from '@angular/core';

import { ResourceService } from '../../../_services/resource.service';

import { csv2json } from 'json-2-csv';

import noUiSlider from 'nouislider';

import iro from '@jaames/iro';

// @ts-ignore
import pureknob from 'pure-knob';

import { Options } from '@angular-slider/ngx-slider';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicFormsCompontent implements OnInit, AfterViewInit {

  isPassword = true
  isDisabled = false

  textarea1 = ''
  textarea1_max = 50
  textarea1_len = 0
  textarea1_tooltip = false


  textarea2 = ''
  textarea2_max = 100
  textarea2_len = 0
  textarea2_tooltip = false

  states: any;


  range1 = [20, 80];


  fileInputOptions = {
    style: 'drop',
    droppable: true,

    container: 'border-1 border-dashed brc-grey-l1 brc-h-info-m1 shadow-sm',

    placeholderClass: 'text-125 text-600 text-grey-l1 my-2',
    placeholderText: 'Drop images here or click to choose',
    placeholderIcon: '<i class="fa fa-cloud-upload-alt fa-3x text-info-m2 my-2"></i>',

    thumbnail: 'large',

    allowMime: 'image/*'
  }

  constructor(private ngZone: NgZone, private resourceLoader: ResourceService) {
    let states = `"name","abbr"
    "Alabama","AL"
    "Alaska","AK"
    "Arizona","AZ"
    "Arkansas","AR"
    "California","CA"
    "Colorado","CO"
    "Connecticut","CT"
    "Delaware","DE"
    "Florida","FL"
    "Georgia","GA"
    "Hawaii","HI"
    "Idaho","ID"
    "Illinois","IL"
    "Indiana","IN"
    "Iowa","IA"
    "Kansas","KS"
    "Kentucky","KY"
    "Louisiana","LA"
    "Maine","ME"
    "Maryland","MD"
    "Massachusetts","MA"
    "Michigan","MI"
    "Minnesota","MN"
    "Mississippi","MS"
    "Missouri","MO"
    "Montana","MT"
    "Nebraska","NE"
    "Nevada","NV"
    "New Hampshire","NH"
    "New Jersey","NJ"
    "New Mexico","NM"
    "New York","NY"
    "North Carolina","NC"
    "North Dakota","ND"
    "Ohio","OH"
    "Oklahoma","OK"
    "Oregon","OR"
    "Pennsylvania","PA"
    "Rhode Island","RI"
    "South Carolina","SC"
    "South Dakota","SD"
    "Tennessee","TN"
    "Texas","TX"
    "Utah","UT"
    "Vermont","VT"
    "Virginia","VA"
    "Washington","WA"
    "West Virginia","WV"
    "Wisconsin","WI"
    "Wyoming","WY"`

    csv2json(states, (err, data) => {
      this.states = data
    })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.resourceLoader.prependCSS('https://cdn.jsdelivr.net/npm/nouislider/distribute/nouislider.min.css').then(() => {
        this.initSliders()
      })

      this.customizeSpinner()

      this.initColorpicker()
      
      this.initKnob()
    })
}

  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };


  
  @ViewChild('slider1') slider1: any;
  @ViewChild('slider2') slider2: any;
  @ViewChild('slider3') slider3: any;
  @ViewChild('slider4') slider4: any;
  @ViewChild('slider5') slider5: any;

  private initSliders() {
    let slider1 = this.slider1.nativeElement
    slider1.style.height = '260px'
    slider1.style.zIndex = '10'

    noUiSlider.create(slider1, {
      orientation: "vertical",
      tooltips: true,
      start: [20, 80],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      },
      format: {
        from: (value: any) => {
            return parseInt(value)
        },
        to: (value: any) => {
            return parseInt(value)
        }
      }
    })
  
    slider1.querySelectorAll('.noUi-handle').forEach((el: any) => { el.className += ' brc-success-d2 slider-bars-h'})
    slider1.querySelectorAll('.noUi-connect').forEach((el: any) => { el.className += ' bgc-success-d1'})
    slider1.querySelectorAll('.noUi-tooltip').forEach((el: any) => { el.className += ' opacity-1 bgc-success-d2 brc-success-d2 text-white radius-3 px-3'})
  




    // the first horizontal slider with round handles
    let slider2 = this.slider2.nativeElement
    noUiSlider.create(slider2, {
      tooltips: true,
      start: [20, 80],
      connect: true,
      range: {
          'min': 0,
          'max': 100
      }
    })

    slider2.querySelectorAll('.noUi-handle').forEach((el: any) => { el.className += ' brc-info-d2 border-2 radius-round slider-bars-none'})
    slider2.querySelectorAll('.noUi-base').forEach((el: any) => { el.className += ' bgc-grey-l1'})
    slider2.querySelectorAll('.noUi-connect').forEach((el: any) => { el.className += ' bgc-info-d2'})
    slider2.querySelectorAll('.noUi-tooltip').forEach((el: any) => { el.className += ' bgc-dark-tp1 text-white border-0 text-90 radius-1 px-2'})


    //
    // the purple slider
    let slider3 = this.slider3.nativeElement
    noUiSlider.create(slider3, {
      tooltips: true,
      start: 50,
      connect: [true, false],
      range: {
          'min': 0,
          'max': 100
      }
    })
    slider3.querySelectorAll('.noUi-handle').forEach((el: any) => { el.className += ' border-3 brc-purple-tp1 bgc-white-tp1 radius-1'})
    slider3.querySelectorAll('.noUi-connect').forEach((el: any) => { el.className += ' bgc-purple-tp1'})
    slider3.querySelectorAll('.noUi-tooltip').forEach((el: any) => { el.className += ' bgc-dark-tp1 text-white border-0 text-90 radius-1 px-2'})


    // the third (disabled) slider
    let slider4 = this.slider4.nativeElement
    noUiSlider.create(slider4, {
      tooltips: true,
      start: [20, 80],
      connect: true,
      range: {
          'min': 0,
          'max': 100
      }
    })
    slider4.setAttribute('disabled', true)
    slider4.querySelectorAll('.noUi-handle').forEach((el: any) => { el.className += ' brc-primary'})
    slider4.querySelectorAll('.noUi-connect').forEach((el: any) => { el.className += ' bgc-primary-tp1'})
    slider4.querySelectorAll('.noUi-tooltip').forEach((el: any) => { el.className += ' bgc-dark-tp1 text-white border-0 text-90 radius-1 px-2'})


    // the orange slider
    let slider5 = this.slider5.nativeElement
    noUiSlider.create(slider5, {
      tooltips: false,
      start: 10,
      connect: [true, false],
      range: {
          'min': 0,
          'max': 100
      }
    })

    slider5.querySelectorAll('.noUi-handle').forEach((el: any) => { el.className += ' brc-white-tp1 bgc-warning-d2 radius-round slider-bars-none shadow'; el.style.borderWidth = "8px" })
    slider5.querySelectorAll('.noUi-base').forEach((el: any) => { el.className += ' bgc-grey-l2'})
    slider5.querySelectorAll('.noUi-connect').forEach((el: any) => { el.className += ' bgc-warning'})
  }


  spinner1_value: number = 55.00;
  spinner2_value!: number;
  spinner3_value!: number;

  @ViewChild('spinner2', {read: ElementRef}) spinner2!: ElementRef;
  @ViewChild('spinner3', {read: ElementRef}) spinner3!: ElementRef;

  customizeSpinner() {
    let spinner2 = this.spinner2.nativeElement
    spinner2.querySelector('.btn-up').innerHTML = "<i class='fa fa-angle-up text-md'></i>"
    spinner2.querySelector('.btn-down').innerHTML = "<i class='fa fa-angle-down text-md'></i>"

    let spinner3 = this.spinner3.nativeElement
    spinner3.querySelector('.input-group-text.vertical').className = "input-group-btn-vertical" //apply bootstrap touchspin classes
    spinner3.querySelector('.bootstrap-touchspin-up').innerHTML = "<i class='fa fa-caret-up text-md'></i>"
    spinner3.querySelector('.bootstrap-touchspin-down').innerHTML = "<i class='fa fa-caret-down text-md'></i>"
  }



  date1!: NgbDateStruct;
  time1: Date = new Date();
  timeToggle = false;

  color!: any;

  initColorpicker() {
    var colorPicker = new (iro.ColorPicker as any)("#color-picker-container", {
      width: 160,
      color: "#f00"
    });

    colorPicker
    .on('color:change', function(color: any, changes: any) {
      //console.log(color.hexString);
    })
  }


  initKnob() {
    const knob1 = pureknob.createKnob(100, 100)

    knob1.setProperty('colorFG', '#3795da')
    knob1.setProperty('colorBG', '#eee')

    knob1.setProperty('trackWidth', 0.25)
    knob1.setProperty('valMin', 0)
    knob1.setProperty('valMax', 100)

    knob1.setValue(10)

    knob1.addListener((knob: any, value: any) => {
      // console.log(value)
    })

    document.getElementById('knob1')?.appendChild(knob1.node())


    const knob2 = pureknob.createKnob(100, 100)

    knob2.setProperty('angleStart', -0.75 * Math.PI);
    knob2.setProperty('angleEnd', 0.75 * Math.PI);

    knob2.setProperty('colorFG', '#629a58')
    knob2.setProperty('colorBG', '#eee')

    knob2.setProperty('trackWidth', 0.25)
    knob2.setProperty('valMin', 0)
    knob2.setProperty('valMax', 100)

    knob2.setValue(41)

    knob2.addListener((knob: any, value: any) => {
      // console.log(value)
    })

    document.getElementById('knob2')?.appendChild(knob2.node())




    const knob3 = pureknob.createKnob(200, 200)

    knob3.setProperty('angleOffset', -0.5 * Math.PI);

    knob3.setProperty('colorFG', '#94645c')
    knob3.setProperty('colorBG', '#eee')

    knob3.setProperty('trackWidth', 0.25)
    knob3.setProperty('valMin', 0)
    knob3.setProperty('valMax', 10)

    knob3.setValue(1)

    knob3.addListener((knob: any, value: any) => {
      // console.log(value)
    })

    document.getElementById('knob3')?.appendChild(knob3.node())

  }
}
