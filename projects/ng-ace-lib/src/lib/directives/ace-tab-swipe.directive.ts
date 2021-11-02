import { Directive, ElementRef, Input, NgZone, HostListener, AfterViewInit } from '@angular/core';

import { NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

import AceTabSwipe from '@ace/tab-swipe';


@Directive({
  selector: '[ngbNavOutlet][NgAceTabSwipe]'
})
export class NgAceTabSwipe implements AfterViewInit {
  tabSwipe: any;
  element: any;

  @Input() NgAceTabSwipe!: any;

  constructor(private el: ElementRef, private _ngZone: NgZone, private navOutlet: NgbNavOutlet) {
    this.element = this.el.nativeElement
    this.element.classList.add('tab-sliding')
  }

  //////*********//////
  @HostListener('end.ace.tabswipe', ['$event'])
  onSwipeEnd(event: any) {
    this._swipePane(event['swipeDirection'])
  }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => {
      this.tabSwipe = AceTabSwipe.getInstance(this.element)
    })

    if (typeof this.NgAceTabSwipe !== 'undefined') {
      this._setCustomNextPrevSwipePanes()

      // set a specific allowedDir (data-swipe attribute will be taken care of in tab-swipe.js)
      if (typeof this.NgAceTabSwipe['swipe'] !== 'undefined') {
        this.element.setAttribute('data-swipe', this.NgAceTabSwipe['swipe'])
      }
    }
  }



  private _swipePane(direction = 1) {
    let newPaneId = null
  
    if (direction === 1) {
      newPaneId = this._getNextPaneId()
    }
    else if (direction === -1) {
      newPaneId = this._getPreviousPaneId()
    }

    if (!newPaneId) return

    this.navOutlet.nav.select(newPaneId)
  }


  private _getNextPaneId() : any {
    // first check to see if we have specified another pane (not the normal next one)
    let targetPaneId = this._getCustomNextId(this.navOutlet.nav.activeId)
    if (targetPaneId) {
      return targetPaneId
    }

    let panes = this.navOutlet['_panes']._results
  
    let _to = panes.length - 1 // don't go till the last item (so that our next pane (p+1) is within array bourndaries)
    for (let p = 0; p < _to; p++) {
      if (panes[p] === this.navOutlet['_activePane']) {
        return panes[p + 1].item.id
      }
    }

    return null
  }

  
  private _getPreviousPaneId() : any {
    // first check to see if we have specified another pane (not the normal previous one)
    let targetPaneId = this._getCustomPrevId(this.navOutlet.nav.activeId)
    if (targetPaneId) {
      return targetPaneId
    }

    let panes = this.navOutlet['_panes']._results
  
    let _from = 1 // don't start from the first item (so that our previous pane (p-1) is within array bourndaries)
    for (let p = _from; p < panes.length; p++) {
      if (panes[p] === this.navOutlet['_activePane']) {
        return panes[p - 1].item.id
      }
    }

    return null
  }



  /**
   * Here we specify if a pane swiped right or left should show an alternative pane (rather then the one that comes before/after it)
   */
  private _setCustomNextPrevSwipePanes() {
    let panes =  this.navOutlet['_panes']

    // check each pane, if it has custom next/prev panes
    panes.forEach((currentPane: any) => {
      if (typeof this.NgAceTabSwipe[currentPane.item.id] === 'undefined') return

      let nextPaneId = this.NgAceTabSwipe[currentPane.item.id]['next'] || null
      if (nextPaneId) {
        let nextPane = panes.find(($pane: any) => $pane.item.id === nextPaneId) || null
        if (nextPane) {
          currentPane.elRef.nativeElement['__ace_swipe_next_pane__'] = nextPane.elRef.nativeElement
        }
      }

      let prevPaneId = this.NgAceTabSwipe[currentPane.item.id]['prev'] || null
      if (prevPaneId) {
        let prevPane = panes.find(($pane: any) => $pane.item.id === prevPaneId) || null
        if (prevPane) {
          currentPane.elRef.nativeElement['__ace_swipe_prev_pane__'] = prevPane.elRef.nativeElement
        }
      }
    })
  }


  private _getCustomNextId(paneId: any) : any {
    if (typeof this.NgAceTabSwipe[paneId] === 'undefined' || typeof this.NgAceTabSwipe[paneId]['next'] === 'undefined') {
      return null  
    }

    return this.NgAceTabSwipe[paneId]['next']
  }

  private _getCustomPrevId(paneId: any) : any {
    if (typeof this.NgAceTabSwipe[paneId] === 'undefined' || typeof this.NgAceTabSwipe[paneId]['prev'] === 'undefined') {      
      return null
    }

    return this.NgAceTabSwipe[paneId]['prev']
  }
 
}
