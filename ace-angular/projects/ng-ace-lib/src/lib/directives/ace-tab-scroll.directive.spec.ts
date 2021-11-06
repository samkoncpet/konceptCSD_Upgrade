import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbNavLink} from '@ng-bootstrap/ng-bootstrap';

import { NgAceTabScroll, NgAceButtonScroll } from './ace-tab-scroll.directive';



declare const viewport: any;

@Component({
  template: `
  <ul ngbNav #nav class="nav nav-tabs nav-tabs-scroll" [activeId]="tabId">
    <li [ngbNavItem]="1">
        <a ngbNavLink>
          Nav Item 1
        </a>
    </li>

    <li [ngbNavItem]="2">
        <a ngbNavLink>
          Nav Item 22
        </a>
    </li>

    <li [ngbNavItem]="3">
        <a ngbNavLink>
          Nav Item 333
        </a>
    </li>

    <li [ngbNavItem]="4">
        <a ngbNavLink>
          Nav Item 4444
        </a>
    </li>
  </ul>
  `
})
class TestComponent {
  @ViewChild('nav', {static: true}) nav: any;
  tabId: any;
}


function getNavLinks(fixture: ComponentFixture<any>): any {  
  return fixture.debugElement.queryAll(By.directive(NgbNavLink))
}


describe('AceTabScroller', () => {
  let fixture: ComponentFixture <TestComponent>;
  let navLinks: any;

  beforeEach(() => {
	  fixture?.destroy()
	  
    fixture = TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ NgAceTabScroll, NgAceButtonScroll, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges()

    navLinks = getNavLinks(fixture)
  })


  it('should scroll nav when clicked on last nav-link', (done) => {
    viewport.set(320, 480)

    const navLink = navLinks[navLinks.length-1].nativeElement as HTMLElement

    let comp = fixture.componentInstance

    setTimeout(function () {
      expect(comp.nav.nativeElement.scrollLeft).toBeGreaterThan(0)
      done()
      viewport.reset()
    }, 500)

    navLink.click()
  })

  it('should scroll nav when `activeId` is updated', (done) => {
    viewport.set(320, 480)

    let comp = fixture.componentInstance

    setTimeout(function () {
      expect(comp.nav.nativeElement.scrollLeft).toBeGreaterThan(0)
      done()
      viewport.reset()
    }, 500)

    comp.tabId = 4;
    fixture.detectChanges()
  })
})