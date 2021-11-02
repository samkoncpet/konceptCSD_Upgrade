import {  ChangeDetectorRef, Component, ElementRef, Injector, NgZone, ViewChild } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NgAceCard } from 'ng-ace-admin';


@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: []
})
export class BasicCardComponent {

  private ref: ChangeDetectorRef;
  private ngZone: NgZone;

  constructor(private el: ElementRef, private injector: Injector) {
    this.ref = this.injector.get(ChangeDetectorRef)
    this.ngZone = this.injector.get(NgZone)
  }

  @ViewChild('card') card!: NgAceCard;
  @ViewChild('collapse') collapse!: NgbCollapse;

  // simulate reloading of card
  reload() {
    if (!this.card) return
    this.card.reload()
    setTimeout(() => {
      this.card.stopLoading()
    }, Math.random() * 1000 + 500)
  }


  get id(): any {
    return this.el.nativeElement.id
  }

  //
  close() {
    if (!this.card) return
    this.card.close()

    let states = this._getData('states') || {}
    states[this.id] = states[this.id] || {}
    states[this.id].closed = true
    this._saveData('states', states)
  }

  toggle() {
    if (!this.collapse) return
    this.collapse.toggle()

    let states = this._getData('states') || {}
    states[this.id] = states[this.id] || {}
    states[this.id].collapsed = this.collapse.collapsed
    this._saveData('states', states)
  }
  
  
  ngAfterViewInit(): any {
    this.ref.detectChanges()
  }

  isClosed() : boolean {
    let states = this._getData('states') || {}
    states[this.id] = states[this.id] || {}

    return states[this.id].closed === true
  }

  // isCollapsed
  isCollapsed() : any {
    let states = this._getData('states') || {}
    states[this.id] = states[this.id] || {}
   
    return states[this.id].collapsed
  }

  defaultExpanded() : any {
    let collapsed = this.isCollapsed()
    return typeof collapsed !== 'undefined' && collapsed !== null ? collapsed : false
  }

  defaultCollapsed() : any {
    let collapsed = this.isCollapsed()
    return typeof collapsed !== 'undefined' && collapsed !== null ? collapsed : true
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
