import {Component, DebugElement, ViewChild} from '@angular/core';
import {  RouterModule } from '@angular/router';


import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NgAceSidebar } from './ace-sidebar.directive';

// @ts-ignore
import EventHandler from '@ace/event-handler';

declare const viewport: any;

@Component({
  template: `
  <a role="button" class="toggle" (click)="sidebar.toggle()">TOGGLE</a>
  <a role="button" class="toggleMobile" (click)="sidebar.toggleMobile()">TOGGLE Mobile</a>
  <div #sidebar="NgAceSidebar" NgAceSidebar class="sidebar " 
    [collapsed]="collapsed" (collapsedChange)="onCollapsedChange($event)" (onExpanded)="onExpanded()" (onCollapsed)="onCollapsed()"
    [hidden]="hidden" (hiddenChange)="onHiddenChange($event)" (onHidden)="onHidden()" (onShown)="onShown()"
  >
   <div class="sidebar-inner">
    <div class="ace-scroll">
      SIDEBAR CONTENT
    </div>
   </div>
</div>
  `
})
class TestComponent {
  @ViewChild('sidebar', {static: true}) sidebar!: NgAceSidebar;

  collapsed: any;
  hidden: any;

  onCollapsedChange = ($event: any) => {}
  onExpanded = () => {}
  onCollapsed = () => {}

  onHiddenChange = ($event: any) => {}
  onHidden = () => {}
  onShown = () => {}

}

function getToggleButton(fixture: ComponentFixture<any>): any {  
  return fixture.debugElement.query(By.css('a.toggle')).nativeElement
}
function getToggleMobileButton(fixture: ComponentFixture<any>): any {  
  return fixture.debugElement.query(By.css('a.toggleMobile')).nativeElement
}


describe('NgAceSidebar', () => {
  document.body.classList.add('is-document-loaded')


  let fixture: ComponentFixture <TestComponent>;

  beforeEach(() => {
    fixture?.destroy()
  
    fixture = TestBed.configureTestingModule({
      imports: [ NgbModule, RouterModule.forRoot([]) ],
      declarations: [ NgAceSidebar, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges()
  })


  it('should collapse/expand sidebar when relevant button is clicked', (done) => {
    let comp = fixture.componentInstance
    let button = getToggleButton(fixture);

    expect(comp.sidebar.collapsed).toBeFalse();

    const onCollapsedChangeSpy = spyOn(comp, 'onCollapsedChange');
    const onExpandedSpy = spyOn(comp, 'onExpanded');
    const onCollapsedSpy = spyOn(comp, 'onCollapsed');


    comp.sidebar.onCollapsed.
    subscribe(() => {
      expect(comp.sidebar.element).toHaveClass('collapsed')
      EventHandler.trigger(button, 'click')
    })

    comp.sidebar.onExpanded.
    subscribe(() => {
      expect(comp.sidebar.element).not.toHaveClass('collapsed')
      expect(onCollapsedChangeSpy).toHaveBeenCalledTimes(2);
      expect(onExpandedSpy).toHaveBeenCalled();
      expect(onCollapsedSpy).toHaveBeenCalled();

      done()
    })

    EventHandler.trigger(button, 'click')
  })


  it('should collapse/expand sidebar when `collapsed` value is updated', (done) => {

    let comp = fixture.componentInstance

    const onCollapsedChangeSpy = spyOn(comp, 'onCollapsedChange');
    const onExpandedSpy = spyOn(comp, 'onExpanded');
    const onCollapsedSpy = spyOn(comp, 'onCollapsed');


    comp.sidebar.onCollapsed.
    subscribe(() => {
      expect(comp.sidebar.element).toHaveClass('collapsed')
      comp.collapsed = false;
      fixture.detectChanges()
    })

    comp.sidebar.onExpanded.
    subscribe(() => {
      expect(comp.sidebar.element).not.toHaveClass('collapsed')
      expect(onCollapsedChangeSpy).toHaveBeenCalledTimes(2);
      expect(onExpandedSpy).toHaveBeenCalled();
      expect(onCollapsedSpy).toHaveBeenCalled();

      done()
    })

    
    comp.collapsed = true;
    fixture.detectChanges()
  })


  it('should hide/show sidebar when relevant button is clicked', (done) => {
    viewport.set(320, 240)

    let comp = fixture.componentInstance
    let button = getToggleMobileButton(fixture);

    const onHiddenChangeSpy = spyOn(comp, 'onHiddenChange');
    const onShownSpy = spyOn(comp, 'onShown');
    const onHiddenSpy = spyOn(comp, 'onHidden');


    comp.sidebar.onShown.
    subscribe(() => {
      expect(comp.sidebar.element).toHaveClass('sidebar-visible')
      EventHandler.trigger(button, 'click')
    })

    comp.sidebar.onHidden.
    subscribe(() => {
      expect(comp.sidebar.element).not.toHaveClass('sidebar-visible')
      expect(onHiddenChangeSpy).toHaveBeenCalledTimes(2);
      expect(onShownSpy).toHaveBeenCalled();
      expect(onHiddenSpy).toHaveBeenCalled();

      done()
      viewport.reset()
    })

    
    EventHandler.trigger(button, 'click')
  })

  it('should hide/show sidebar when `hidden` value is updated', (done) => {
    viewport.set(320, 240)

    let comp = fixture.componentInstance

    const onHiddenChangeSpy = spyOn(comp, 'onHiddenChange');
    const onShownSpy = spyOn(comp, 'onShown');
    const onHiddenSpy = spyOn(comp, 'onHidden');


    comp.sidebar.onShown.
    subscribe(() => {
      expect(comp.sidebar.element).toHaveClass('sidebar-visible')
      comp.hidden = true;
      fixture.detectChanges()
    })

    comp.sidebar.onHidden.
    subscribe(() => {
      expect(comp.sidebar.element).not.toHaveClass('sidebar-visible')
      expect(onHiddenChangeSpy).toHaveBeenCalledTimes(2);
      expect(onShownSpy).toHaveBeenCalled();
      expect(onHiddenSpy).toHaveBeenCalled();

      done()
      viewport.reset()
    })

    
    comp.hidden = false;
    fixture.detectChanges()
  })
})

