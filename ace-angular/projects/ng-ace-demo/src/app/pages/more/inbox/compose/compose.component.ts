import { Component, OnInit, AfterViewInit, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';

import {NgbCollapse, NgbCollapseConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inbox-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComposeComponent implements OnInit, AfterViewInit {

  constructor(private ngZone: NgZone) { }

  config = {

    statusbar: false,

    events: {
      getIcon: function (name: any, control: any, clearName: any) {
        let icon = '';

        switch (clearName) {
          case 'source':
            icon = 'fa fa-code text-secondary-d1';
          break;
          case 'italic':
            icon = 'fa fa-italic text-secondary-d1';
          break;
          case 'bold':
            icon = 'fa fa-bold text-secondary-d1';
          break;

          case 'ol':
            icon = 'fa fa-list-ol text-blue';
          break;
          case 'ul':
            icon = 'fa fa-list-ul text-blue';
          break;

          case 'eraser':
            icon = 'fa fa-eraser text-secondary-d1';
          break;

          case 'font':
            icon = 'fa fa-font text-secondary-d1';
          break;
          case 'fontsize':
            icon = 'fa fa-text-width text-secondary-d1';
          break;

          case 'brush':
            icon = 'fa fa-paint-brush text-pink';
          break;

          case 'paragraph':
            icon = 'fa fa-paragraph text-secondary-d1';
          break;

          case 'image':
            icon = 'fa fa-image text-purple-d1';
          break;
          case 'table':
            icon = 'fa fa-table text-danger-m2';
          break;

          case 'link':
            icon = 'fa fa-link text-success-m1';
          break;

          case 'left':
            icon = 'fa fa-align-left text-secondary-d1';
          break;
          case 'center':
            icon = 'fa fa-align-center text-secondary-d1';
          break;
          case 'right':
            icon = 'fa fa-align-right text-secondary-d1';
          break;
          case 'justify':
            icon = 'fa fa-align-justify text-secondary-d1';
          break;

          case 'undo':
            icon = 'fa fa-undo text-grey';
          break;
          case 'redo':
            icon = 'fa fa-redo text-grey';
          break;

          case 'fullsize':
            icon = 'fa fa-arrows-alt text-secondary-d1';
          break;
          case 'shrink':
            icon = 'fa fa-arrows-alt text-secondary-d1';
          break;
        }     
        return icon.length == 0 ? null : `<span class="position-tl w-100 h-100 bgc-white bgc-h-secondary-l3 border-1 brc-h-secondary-l2"><i class="${icon} text-md pt-2"></i></span>`
      }
    },

    buttons:   ['bold', 'italic', '|', 'align', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|', 'image', 'link'],
    buttonsMD: ['bold', 'italic', '|', 'align', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|', 'image', 'link'],
    buttonsSM: ['bold', 'italic', '|', 'align', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|', 'image', 'link'],
    buttonsXS: ['bold', 'italic', '|', 'align', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|', 'image', 'link']
  }

  ngOnInit(): void {
  }

  collpaseDirective!: NgbCollapse;
  ngAfterViewInit(): void {
    // add 'collpase' directive to jodit toolbar
    // to be able to hide/show it

    let el = new ElementRef(document.querySelector('.jodit-toolbar__box'))
    let config = new NgbCollapseConfig({animation: true})
    this.collpaseDirective = new NgbCollapse(el, config, this.ngZone)

    this.collpaseDirective.toggle()
  }

  toggleToolbar() {
    this.collpaseDirective.toggle()
  }

}
