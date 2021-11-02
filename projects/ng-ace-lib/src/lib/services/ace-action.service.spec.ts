import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';


import { ModalModule, ModalDirective } from 'ngx-bootstrap/modal';
import {  RouterModule } from '@angular/router';

import { NgAceActionService } from './ace-action.service';
import { NgAceSidebarActionService } from './ace-sidebar-action.service';
import { NgAceCardActionService } from './ace-card-action.service';

import { NgAceModal } from '../directives/ace-modal.directive';
import { NgAceSidebar } from '../directives/ace-sidebar.directive';
import { NgAceCard } from '../directives/ace-card.directive';


@Component({
  template: `
  <div id="mymodal" class="modal modal-nb ace-aside aside-right" bsModal #modal="bs-modal" NgAceModal #aside="NgAceModal" [config]='{"backdrop": false}'>
    <div class="modal-dialog">
      <div class="modal-content">
  
        <div class="modal-header">
          <h5>
            Title
          </h5>
  
          <a role="button" class="close m-0 border-l-1 brc-grey-m4" (click)="aside.hide()" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </a>
        </div>
  
        <div class="modal-body">
          Modal Content
        </div>  
      </div>
    </div>
  </div>

  <div id="mysidebar" #sidebar="NgAceSidebar" NgAceSidebar class="sidebar">
   <div class="sidebar-inner">
    <div class="ace-scroll">
      SIDEBAR CONTENT
    </div>
   </div>
  </div>

  <div id="mycard" #card="NgAceCard" NgAceCard class="card">
    <div class="card-header">
        <h5 class="card-title">
          Card Title
        </h5>
    </div><!-- /.card-header -->

    <div class="card-body">
      Content
    </div><!-- /.card-body -->
  </div>
  `
})
class TestComponent {
  @ViewChild('modal', {static: true}) modal!: ModalDirective;
  @ViewChild('aside', {static: true}) aside!: NgAceModal;

  @ViewChild('sidebar', {static: true}) sidebar!: NgAceSidebar;
  @ViewChild('card', {static: true}) card!: NgAceCard;
}




describe('Ace Action Service', () => {
  document.body.classList.add('is-document-loaded')

  let fixture: ComponentFixture <TestComponent>;
  let service: NgAceActionService;
  let sidebarService: NgAceSidebarActionService;
  let cardService: NgAceCardActionService;

  beforeEach(() => {
    fixture?.destroy()
  
    fixture = TestBed.configureTestingModule({
      imports: [ModalModule.forRoot(), RouterModule.forRoot([])],
      declarations: [  NgAceModal, NgAceSidebar, NgAceCard, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges()
    service = TestBed.inject(NgAceActionService);
    sidebarService = TestBed.inject(NgAceSidebarActionService);
    cardService = TestBed.inject(NgAceCardActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show modal by ID (selector)', (done) => {
    let comp = fixture.componentInstance
    service.action('#mymodal', 'show')

    comp.modal.onShown.subscribe(() => {
      expect(comp.modal.isShown).toBeTrue()
      service.action('#mymodal', 'hide')
    })

    comp.modal.onHidden.subscribe(() => {
      expect(comp.modal.isShown).not.toBeTrue()
      done()
    })
  });

  it('should prevent show modal by ID (selector)', (done) => {
    let comp = fixture.componentInstance
    service.prevent('#mymodal', 'show')
    service.action('#mymodal', 'show')

    setTimeout(() => {
      expect(comp.modal.isShown).not.toBeTrue()
      done()
    }, 500)
  });

  it('should collapse sidebar by ID (selector)', (done) => {
    let comp = fixture.componentInstance

    comp.sidebar.onCollapsed.subscribe(() => {
      expect(comp.sidebar.collapsed).toBeTrue()
      sidebarService.action('#mysidebar', 'expand')
    })

    comp.sidebar.onExpanded.subscribe(() => {
      expect(comp.sidebar.collapsed).not.toBeTrue()
      done()
    })

    sidebarService.action('#mysidebar', 'collapse')
  });

  it('should prevent collapse sidebar by ID (selector)', (done) => {
    let comp = fixture.componentInstance
    sidebarService.prevent('#mysidebar', 'collapse')
    sidebarService.action('#mysidebar', 'collapse')

    setTimeout(() => {
      expect(comp.sidebar.collapsed).not.toBeTrue()
      done()
    }, 500)
  });


  it('should show sidebar by ID (selector)', (done) => {
    let comp = fixture.componentInstance

    comp.sidebar.onShown.subscribe(() => {
      expect(comp.sidebar.hidden).not.toBeTrue()
      sidebarService.action('#mysidebar', 'hide')
    })

    comp.sidebar.onHidden.subscribe(() => {
      expect(comp.sidebar.hidden).toBeTrue()
      done()
    })

    sidebarService.action('#mysidebar', 'show')
  });


  it('should fullscreen card by ID (selector)', (done) => {
    let comp = fixture.componentInstance

    comp.card.onExpanded.subscribe(() => {
      expect(comp.card.fullscreen).toBeTrue()
      cardService.action('#mycard', 'restore')
    })

    comp.card.onRestored.subscribe(() => {
      expect(comp.card.fullscreen).not.toBeTrue()
      done()
    })

    cardService.action('#mycard', 'expand')
  });

  it('should close card by ID (selector)', (done) => {
    let comp = fixture.componentInstance

    comp.card.onClosed.subscribe(() => {
      expect(comp.card.element.parentNode).toBeNull()
      done()
    })

    cardService.action('#mycard', 'close')
  });


  it('should reload card by ID (selector)', (done) => {
    let comp = fixture.componentInstance

    comp.card.onLoad.subscribe((loading: boolean) => {
      if (loading === true) {
        setTimeout(() => {
          expect(comp.card.element.querySelector('.bs-card-loading-overlay')).not.toBeNull()
          cardService.action('#mycard', 'stopLoading')
        })
      }
      else if (loading === false) {
        expect(comp.card.element.querySelector('.bs-card-loading-overlay')).toBeNull()
        done()
      }
    })

    cardService.action('#mycard', 'reload')
  });
});
