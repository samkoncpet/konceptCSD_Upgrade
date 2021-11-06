import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';


import {NgbCollapse, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgAceAutofocus} from './ace-autofocus.directive';

@Component({
  template: `
  <div [ngbCollapse]="true">
    <input type="text" NgAceAutofocus />
  </div>
  `
})
class TestComponent {
}

function getCollapseDirective(fixture: ComponentFixture<any>): NgbCollapse {
  return fixture.debugElement.query(By.directive(NgbCollapse)).injector.get(NgbCollapse);
}



describe('NgAceAutofocus', () => {
  document.body.classList.add('is-document-loaded')

  let inputs: any;
  let collapse: NgbCollapse;

  beforeEach(() => {
    let fixture = TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ NgAceAutofocus, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges()

    inputs = fixture.debugElement.queryAll(By.directive(NgAceAutofocus));

    collapse = getCollapseDirective(fixture);
  })



  it('should focus on autofocus element when collapse is shown', (done) => {
    const input = inputs[0].nativeElement as HTMLInputElement

    collapse.toggle(true)
    collapse.shown
    .subscribe(() => {
      expect(document.activeElement == input).toBeTrue()
      done()
    })
  })

  
});


