import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import { ModalModule, ModalDirective } from 'ngx-bootstrap/modal';

import { NgAceModal } from './ace-modal.directive';

import EventHandler from '@ace/event-handler';


@Component({
  template: `
  <div class="modal modal-nb ace-aside aside-right" bsModal #modal="bs-modal" #aside="NgAceModal" [config]='{"backdrop": false}' [NgAceModal]='{"dismiss": true}'>
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
  `
})
class TestComponent {
  @ViewChild('modal', {static: true}) modal!: ModalDirective;
  @ViewChild('aside', {static: true}) aside!: NgAceModal;

}


describe('NgAceModal', () => {
  document.body.classList.add('is-document-loaded')

  let fixture: ComponentFixture <TestComponent>;

  beforeEach(() => {
    fixture?.destroy()
  
    fixture = TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      declarations: [ NgAceModal, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges()    
  })


  it('should hide after click outside of it', (done) => {
    let comp = fixture.componentInstance
    comp.modal.show()

    comp.modal.onShown.subscribe(() => {
      expect(comp.modal.isShown).toBeTrue()
      EventHandler.trigger(document.body, 'mouseup')
    })

    comp.modal.onHidden.subscribe(() => {
      expect(comp.modal.isShown).not.toBeTrue()
      done()
    })
  })


});
