import { Injectable } from '@angular/core';

// Open/close submenus on load and page navigation as well as keep/persist some sidebar properties such as scroll position
// And we initiate a separate state obj for each sidebar because we might have multiple sidebars

@Injectable({
  providedIn: 'root'
})
export class NgAceSidebarStateService {

  private _sidebarStates : any

  constructor() { 
    // list of SidebarState objects, used to save state of each sidebar (according to sidebar ID)
    this._sidebarStates = {}
  }

  private _getSidebarState(sidebarId: string): any {
    if (typeof this._sidebarStates[sidebarId] !== 'undefined') return this._sidebarStates[sidebarId]

    this._sidebarStates[sidebarId] = new SidebarState()
    return this._sidebarStates[sidebarId]
  }

  setOpenOnLoad(sidebarId: string, url: string, restore: boolean): void {
    this._getSidebarState(sidebarId).setOpenOnLoad(url, restore)
  }

  setOpen(sidebarId: string, itemId: string): void {
    this._getSidebarState(sidebarId).setOpen(itemId)
  }

  isOpen(sidebarId: string, itemId: string) : boolean {
    return this._getSidebarState(sidebarId).isOpen(itemId)
  }

  unOpen(sidebarId: string, itemId: string) {
    this._getSidebarState(sidebarId).unOpen(itemId)
  }
  
  clearOpens(sidebarId: string) : void {
    this._getSidebarState(sidebarId).clearOpens()
  }

  // save/load value/keys
  set(sidebarId: string, key: string, value: any) {
    this._getSidebarState(sidebarId).set(key, value)
  }

  get(sidebarId: string, key: string) {
    return this._getSidebarState(sidebarId).get(key)
  }
}



class SidebarState {
  private _saved: any
  
  private _opens: any
  private _openCount = 0


  constructor() { 
    this._saved = {}
    this._opens = {}
  }

  set(key: string, value: any) {
    this._saved[key] = value
  }

  get(key: string): any {
    if (typeof this._saved[key] !== 'undefined') return this._saved[key]
  }


  /**
  * Set `open` the parents of a url
  */
  setOpenOnLoad(url: string, restore: boolean): void {
    if (this._openCount > 0) {
      if (restore == true) {
        // why return if _openCount > 0 ?
        // because we might be back from another layout (such as login), and we want the last open submenu (login's parent) be opened again as we come back to previous layout (and not the active one)
        return
      }
      else {
        // clear (close) previously open ones
        this.clearOpens()
      }
    }

    url = url.replace(/^\/+|\/+$/g, '') /** trim '/' **/
  
    let index = url.lastIndexOf('/') // go check parent route
    url = index >= 0 ? url.substring(0, index) : ''
  
    while (url != '') {
      this.setOpen(url) // don't `open` the child (only the parents should be 'open')
  
      let index = url.lastIndexOf('/') // go check parent route
      url = index >= 0 ? url.substring(0, index) : ''
    }
  }


  setOpen(id: string): void {
    if (typeof this._opens[id] === 'undefined') this._openCount++
    this._opens[id] = true
  }

  isOpen(id: string) : boolean {
    return typeof this._opens[id] !== 'undefined'
  }

  unOpen(id: string) {
    if (typeof this._opens[id] === 'undefined') return

    this._openCount--
    delete this._opens[id]
  }
  
  clearOpens() : void {
    this._opens = {}
    this._openCount = 0
  }
}