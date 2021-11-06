import { Directive, OnInit, Input, Output, HostListener, OnDestroy, EventEmitter, SimpleChanges, ElementRef, OnChanges } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';



@Directive({
  selector: '[NgAceAccordion]',
  exportAs: 'NgAceAccordion',
  host: {
    'class': 'accordion'
  }
})
export class NgAceAccordion implements OnDestroy , OnChanges {
  @Input() closeOthers = true

  @Output() activeIdChange = new EventEmitter<any>()

  _activeId!: any
  @Input()
  set activeId(id: any) {
    this._activeId = id
    this.activeIdChange.emit(id)
  }
  get activeId() : any {
    return this._activeId
  }


  private panels: any = {}
  private toggles: any = {}

  private panelCount = 0
  private lastOpenPanel: NgbCollapse = <any> null

  protected destroy$ = new Subject<void>()

  constructor() {
  }

  ngOnDestroy() : void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  addCard(panel: NgbCollapse, panelId: any) {
    this.panels[panelId] = panel
    this.panelCount++

    if (panel.collapsed === false) this.lastOpenPanel = panel

    this.toggles[panelId]?.onCollapse(panel.collapsed)
  
    panel.ngbCollapseChange
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((collapsed: boolean) => {
      this.toggles[panelId]?.onCollapse(collapsed)
    })    
  }

  addToggle(toggle: any, panelId: any) {
    this.toggles[panelId] = toggle

   if (this.panels[panelId]) toggle.onCollapse(this.panels[panelId].collapsed)
  }

  cardCount(): number {
    return this.panelCount
  }

  toggle(panelId: any) {
    let $collapse = <NgbCollapse> this.panels[panelId] || null
    if (!$collapse) return

    let isCollapsed = $collapse.collapsed

    if (isCollapsed) {
      // it's closed and we are opening it
      if (this.closeOthers && this.lastOpenPanel) {
        this.lastOpenPanel.toggle()
      }

      this.lastOpenPanel = $collapse
    }
    else if (!isCollapsed) {
      // it was open and we are closing it
      this.lastOpenPanel = <any> null
    }

    $collapse.toggle()
    this.activeId = panelId
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes.activeId) {
      let panel = this.panels[changes.activeId.currentValue]
      if (panel && panel.collapsed) {
        this.toggle(changes.activeId.currentValue)
      }
    }
  }

}




@Directive({
  selector: '[NgAceAccordionCard]'
})
export class NgAceAccordionCard implements OnInit {
  @Input() NgAceAccordionCard! : any

  constructor(private accordion: NgAceAccordion, private collapse: NgbCollapse) {
  }

  ngOnInit (): void {
    if (!this.NgAceAccordionCard) this.NgAceAccordionCard = this.accordion.cardCount() + 1
    this.accordion.addCard(this.collapse, this.NgAceAccordionCard)
  }
}




@Directive({
  selector: '[NgAceAccordionToggle]',
  host: {
    'class': 'accordion-toggle',
    '[attr.role]': '"button"'
  }
})
export class NgAceAccordionToggle implements OnInit {
  element: any

  @Input() NgAceAccordionToggle! : any

  constructor(private accordion: NgAceAccordion, private el: ElementRef) {
    this.element = this.el.nativeElement
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.accordion.toggle(this.NgAceAccordionToggle)    
  }

  ngOnInit() : void {
    if (!this.NgAceAccordionToggle) this.NgAceAccordionToggle = this.accordion.cardCount() + 1
    
    this.accordion.addToggle(this, this.NgAceAccordionToggle)
  }

  onCollapse(collapsed: boolean) {        
    this.element.classList.toggle('collapsed', collapsed)
  }
}