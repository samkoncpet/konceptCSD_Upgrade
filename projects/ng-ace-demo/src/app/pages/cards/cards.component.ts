import { Component, OnInit, AfterViewInit, NgZone, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';

import { DomService } from 'ng-ace-admin';

import Sortable from 'sortablejs';

import Util from '@ace/util';


import { Card1Component } from './card1/card1.component';
import { Card2Component } from './card2/card2.component';
import { Card3Component } from './card3/card3.component';
import { Card4Component } from './card4/card4.component';
import { Card5Component } from './card5/card5.component';
import { Card6Component } from './card6/card6.component';
import { Card7Component } from './card7/card7.component';
import { Card8Component } from './card8/card8.component';
import { Card9Component } from './card9/card9.component';
import { Card10Component } from './card10/card10.component';
import { Card12Component } from './card12/card12.component';
import { Card11Component } from './card11/card11.component';


const _CardsOrder = [
  [
    [
      {componentName: 'card1'}
    ],
    [
      {componentName: 'card2'}
    ]
  ],

  [
    [
      {componentName: 'card3'}
    ],
    [
      {componentName: 'card4'}
    ]
  ],

  [
    [
      {componentName: 'card5'}
    ],
    [
      {componentName: 'card6'}
    ]
  ],

  [
    [
      {componentName: 'card7'}
    ],
    [
      {componentName: 'card8'}
    ]
  ],

  [
    [
      {componentName: 'card9'}
    ],
    [
      {componentName: 'card10'}
    ]
  ],

  [
    [
      {componentName: 'card11'}
    ],
    [
      {componentName: 'card12'}
    ]
  ]
]

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit, AfterViewInit {

  constructor(private domService: DomService, private ngZone: NgZone, private ref: ChangeDetectorRef) {
    if (this._getData('reset') === true) {
      this._removeData('states')
      this._removeData('cards')
      this._removeData('reset')
    }
  }

  cardRows : any;

  updatedRows: any;


  // create Component (which includes .card) based on our `cardRows`
  public AddCard(card: any, container: any) : any {
    if (card.created === true) return

    let cardComponent = this.domService.insertComponent(this._getComponent(card.componentName), {}, container)    
    card.created = true
    
    cardComponent.location.nativeElement.setAttribute('data-component-name', `${card.componentName}`)
  }

  // get component based on name
  _getComponent(name: string): any {
    let component
    switch(name) {
      case 'card1':
        component = Card1Component
      break;

      case 'card2':
        component = Card2Component
      break;

      case 'card3':
        component = Card3Component
      break;

      case 'card4':
        component = Card4Component
      break;

      case 'card5':
        component = Card5Component
      break;

      case 'card6':
        component = Card6Component
      break;

      case 'card7':
        component = Card7Component
      break;

      case 'card8':
        component = Card8Component
      break;

      case 'card9':
        component = Card9Component
      break;

      case 'card10':
        component = Card10Component
      break;

      case 'card11':
        component = Card11Component
      break;

      case 'card12':
        component = Card12Component
      break;
    }

    return component
  }

  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // check to see if we have saved our cards to localStorage
    this.updatedRows = this._getData('cards')
    if (this.updatedRows) this.cardRows = JSON.parse(JSON.stringify(this.updatedRows))
    else {
      // if not, use the default one
      this.cardRows = _CardsOrder
      this.updatedRows = JSON.parse(JSON.stringify(this.cardRows))
    }

    this.ref.detectChanges()
    ////////////

    this.enableSortable()
  }


  enableSortable() {
    this.ngZone.runOutsideAngular(() => {
      document.querySelectorAll('.cards-container').forEach((container: any) => {
       Sortable.create(container, {
        // give them a common name, so `.card` elements can be drag & dropped between different `.cards-containers`
        group: "cards",

        draggable: "> app-demo-card",// we are interested in dragging/sorting `app-demo-card` elements that are direct children of `.cards-container` elements
        animation: 200,
      
        ghostClass: "brc-grey-m1",
        chosenClass: "",
        dragClass: "bgc-yellow-m2",

        handle: ('ontouchstart' in window ? ".card-header" : null),// in touch devices only drag using .card-header
        filter: ".card-toolbar-btn",
        preventOnFilter: false,

        onEnd: (evt) => {
          let movedComponent = evt.item
          let card = movedComponent.querySelector('.card')
          if (card == null) return

          let movedComponentName = movedComponent.getAttribute('data-component-name')

          let fromRow = Number(evt.from.getAttribute('row-id')) || 0
          let fromCol = Number(evt.from.getAttribute('col-id')) || 0

          let toRow = Number(evt.to.getAttribute('row-id')) || 0
          let toCol = Number(evt.to.getAttribute('col-id')) || 0

          // find the "movedComponent" and remove it from its source container
          let index = this.updatedRows[fromRow][fromCol].findIndex((item: any) => item.componentName === movedComponentName)
          let item = this.updatedRows[fromRow][fromCol][index]
          this.updatedRows[fromRow][fromCol].splice(index, 1)

          // and find the "movedComponent"'s position in its new destination container and insert it at the right index
          // first find the container parent
          let container = Util.closest(card, '.cards-container')

          // then find all the app-demo-card children
          let childComponents = Array.from(container.querySelectorAll('app-demo-card')) //convert NodeList to Array for easier searching

          // then find our movedComponents position in the children array
          let componentIndex = childComponents.findIndex((el: any) => el === movedComponent)

          // then insert it in our row data at the same index
          this.updatedRows[toRow][toCol].splice(componentIndex, 0, item)
          
          // save changes to localStorage
          this._saveData('cards', this.updatedRows)
        }
      })
     })
    })
  }

  resetAll() {
    this._saveData('reset', true)
    document.location.reload()
  }


  _saveData(name: string, value: any) {
    localStorage.setItem(name+'.ace', JSON.stringify(value))
  }
   
  _getData(name: string) : any {
    let value = localStorage.getItem(name+'.ace') || null
    if (value) {
      try {
        value = JSON.parse(value)
      }
      catch(e) {
        value = null
      }
    }
    return value
  }
  
  _removeData (name: any) {
    localStorage.removeItem(name+'.ace')
  }

}
